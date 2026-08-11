const STORAGE_KEY = 'emoji-tcg-save-v1';
const BOOSTER_COOLDOWN_MS = 10 * 60 * 1000;
const MAX_BOOSTERS_IN_INVENTORY = 3;
const BONUS_BOOSTER_ENABLED = false;

const { EMOJI_LIBRARY, RARITY_CONFIG: SHARED_RARITY_CONFIG, getRarityByName } = window.EmojiTCGData || { EMOJI_LIBRARY: [], RARITY_CONFIG: [] };
const RARITY_CONFIG = SHARED_RARITY_CONFIG.length ? SHARED_RARITY_CONFIG : [
  { name: 'Commun', weight: 70, color: '#60a5fa' },
  { name: 'Peu commun', weight: 20, color: '#34d399' },
  { name: 'Rare', weight: 7, color: '#a78bfa' },
  { name: 'Épique', weight: 2.5, color: '#f59e0b' },
  { name: 'Légendaire', weight: 0.5, color: '#fb7185' }
];

const EMOJI_POOL = EMOJI_LIBRARY;
const EMOJI_LIBRARY_BY_SYMBOL = new Map(EMOJI_LIBRARY.map((emoji) => [emoji.symbol, emoji]));

function normalizeCollectionEntry(entry) {
  if (!entry) {
    return entry;
  }

  const matchingEmoji = EMOJI_LIBRARY_BY_SYMBOL.get(entry.symbol) || EMOJI_LIBRARY.find((emoji) => makeEmojiKey(emoji) === entry.key || emoji.name === entry.name);
  if (!matchingEmoji) {
    return entry;
  }

  return {
    ...entry,
    key: entry.key || makeEmojiKey(matchingEmoji),
    symbol: matchingEmoji.symbol,
    name: matchingEmoji.name,
    displayName: matchingEmoji.name,
    rarity: matchingEmoji.rarity?.name || entry.rarity,
    group: matchingEmoji.group || entry.group,
    family: matchingEmoji.family || entry.family
  };
}

function normalizeCollectionState(collection = {}) {
  return Object.fromEntries(Object.entries(collection).map(([key, entry]) => [key, normalizeCollectionEntry(entry)]));
}

let state = loadState();
let displayedBoosterSignature = null;
let boosterRevealModal = null;
let confettiLayer = null;
let audioContext = null;
let confettiSoundPlayed = false;
let audioReady = false;
let shopTimerInterval = null;

if (!window.EmojiTCGData) {
  console.warn('emoji-data.js is not loaded');
}

const openBoosterBtn = document.getElementById('openBoosterBtn');
const twitchFollowBtn = document.getElementById('twitchFollowBtn');
const instagramFollowBtn = document.getElementById('instagramFollowBtn');
const cooldownText = document.getElementById('cooldownText');
const boostersAvailableText = document.getElementById('boostersAvailableText');
const discoveredCount = document.getElementById('discoveredCount');
const headerDiscoveredCount = document.getElementById('headerDiscoveredCount');
const headerTotalCount = document.getElementById('headerTotalCount');
const boostersOpened = document.getElementById('boostersOpened');
const boosterResults = document.getElementById('boosterResults');
const collectionList = document.getElementById('collectionList');
const libraryList = document.getElementById('libraryList');
const lastResultBadge = document.getElementById('lastResultBadge');
const promoCodeInput = document.getElementById('promoCodeInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const promoResultEl = document.getElementById('promoResult');
const achievementsCard = document.getElementById('achievementsCard');

function syncFollowBonusState() {
  const twitchBonus = Boolean(state.followedTwitch);
  const instagramBonus = Boolean(state.followedInstagram);
  state.followBonusBoosters = (twitchBonus ? 1 : 0) + (instagramBonus ? 1 : 0);
  return state.followBonusBoosters;
}

function updateBonusButtons() {
  syncFollowBonusState();
  if (twitchFollowBtn) {
    twitchFollowBtn.classList.toggle('is-active', Boolean(state.followedTwitch));
    twitchFollowBtn.setAttribute('aria-label', Boolean(state.followedTwitch) ? 'Bonus Twitch actif' : 'Activer le bonus Twitch');
  }
  if (instagramFollowBtn) {
    instagramFollowBtn.classList.toggle('is-active', Boolean(state.followedInstagram));
    instagramFollowBtn.setAttribute('aria-label', Boolean(state.followedInstagram) ? 'Bonus Instagram actif' : 'Activer le bonus Instagram');
  }
}

function getHourBucket(now = Date.now()) {
  return Math.floor(now / 3600000);
}

function ensureShopPurchaseState(now = Date.now()) {
  const currentHour = getHourBucket(now);
  if (state.shopPurchaseHourKey !== currentHour) {
    state.shopPurchaseHourKey = currentHour;
    state.shopPurchaseCounts = {
      'booster-credit': 0,
      'booster-pack': 0
    };
    state.shopExhaustionAtByItem = {};
  }
  return state.shopPurchaseCounts || {};
}

function isTemporaryBoosterCapacityActive(now = Date.now()) {
  if (!state.tempBoosterCapacityUntil) {
    return false;
  }

  if (state.tempBoosterCapacityUntil <= now) {
    state.tempBoosterCapacityUntil = null;
    return false;
  }

  return true;
}

function getEffectiveBoosterLimit() {
  const bonusBoosters = syncFollowBonusState();
  const tempBoosters = isTemporaryBoosterCapacityActive() ? 1 : 0;
  return MAX_BOOSTERS_IN_INVENTORY + bonusBoosters + tempBoosters;
}

function applyFollowBonus(type) {
  if (type === 'twitch') {
    if (Boolean(state.followedTwitch)) {
      return false;
    }
    state.followedTwitch = true;
  } else if (type === 'instagram') {
    if (Boolean(state.followedInstagram)) {
      return false;
    }
    state.followedInstagram = true;
  }

  syncFollowBonusState();
  state.boostersAvailable = Math.min(getEffectiveBoosterLimit(), Math.max(state.boostersAvailable || 0, 1));
  if ((state.boostersAvailable || 0) < getEffectiveBoosterLimit() && !state.nextBoosterAt) {
    state.nextBoosterAt = Date.now() + BOOSTER_COOLDOWN_MS;
  }
  saveState();
  updateBonusButtons();
  awardAchievements();
  saveState();
  render();
  return true;
}

function awardAchievements() {
  if (typeof ACHIEVEMENT_DEFINITIONS === 'undefined' || !Array.isArray(ACHIEVEMENT_DEFINITIONS)) {
    return;
  }

  ACHIEVEMENT_DEFINITIONS.forEach((definition) => {
    const unlocked = state.achievementsUnlocked?.[definition.id];
    const progress = getAchievementProgress(definition, state);
    const target = getAchievementTarget(definition);

    if (!unlocked && progress >= target) {
      state.achievementsUnlocked = {
        ...(state.achievementsUnlocked || {}),
        [definition.id]: true
      };

      if (definition.id === 'follow-twitch') {
        if (!(state.ownedBackgrounds || []).includes(SPECIAL_BACKGROUND_IMAGE)) {
          state.totalCosmeticsObtained = (state.totalCosmeticsObtained || 0) + 1;
        }
        state.ownedBackgrounds = Array.from(new Set([...(state.ownedBackgrounds || []), SPECIAL_BACKGROUND_IMAGE]));
        state.currentBackground = SPECIAL_BACKGROUND_IMAGE;
        state.achievementsClaimed = {
          ...(state.achievementsClaimed || {}),
          [definition.id]: true
        };
        showToast(`Succès débloqué : ${definition.name} — nouveau fond débloqué !`);
      } else if (definition.reward === 0) {
        state.achievementsClaimed = {
          ...(state.achievementsClaimed || {}),
          [definition.id]: true
        };
        showToast(`Succès débloqué : ${definition.name}`);
      } else {
        showToast(`Succès débloqué : ${definition.name} — récompense à réclamer`);
      }
    }
  });
}

if (twitchFollowBtn) {
  twitchFollowBtn.addEventListener('click', (event) => {
    event.preventDefault();
    applyFollowBonus('twitch');
    window.open(twitchFollowBtn.href, '_blank', 'noopener,noreferrer');
  });
}

if (instagramFollowBtn) {
  instagramFollowBtn.addEventListener('click', (event) => {
    event.preventDefault();
    applyFollowBonus('instagram');
    window.open(instagramFollowBtn.href, '_blank', 'noopener,noreferrer');
  });
}

if (applyPromoBtn) {
  applyPromoBtn.addEventListener('click', applyPromoCode);
}

if (promoCodeInput) {
  promoCodeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applyPromoCode();
    }
  });
}

openBoosterBtn.addEventListener('click', async () => {
  const now = Date.now();
  const canOpen = getAvailableBoosters(now) > 0;

  if (!canOpen) {
    showToast('Tu n’as pas encore de booster disponible.');
    return;
  }

  confettiSoundPlayed = false;
  await ensureAudioReady();
  playBoosterOpenSound();

  const booster = createBooster().map((card) => ({
    ...card,
    wasOwned: Boolean(state.collection[card.key]?.count)
  }));
  state.lastOpenedAt = now;
  state.boostersOpened += 1;
  state.lastBooster = booster;
  if ((state.exchangeBoosterCredits || 0) > 0) {
    state.exchangeBoosterCredits -= 1;
  }
  state.lastBoosterType = 'normal';
  state.lastBoosterSignature = getBoosterSignature(booster);

  for (const card of booster) {
    const entry = state.collection[card.key] || {
      key: card.key,
      symbol: card.symbol,
      name: card.name,
      count: 0,
      rarity: card.rarity,
      group: card.group,
      family: card.family
    };
    entry.count += 1;
    entry.rarity = card.rarity;
    entry.group = card.group;
    entry.family = card.family;
    state.collection[card.key] = entry;
  }

  state.boostersAvailable = Math.max(0, (state.boostersAvailable || 0) - 1);

  if (state.boostersAvailable < getEffectiveBoosterLimit() && !state.nextBoosterAt) {
    state.nextBoosterAt = now + BOOSTER_COOLDOWN_MS;
  }

  awardAchievements();
  saveState();
  await revealBooster(booster);
  render();
});

const SHOP_ITEMS = [
  {
    id: 'booster-credit',
    name: 'Booster instantané',
    description: 'Reçois immédiatement un booster en stock.',
    price: 180,
    rewardBoosters: 1,
    hourlyLimit: 3,
    emoji: '🎁'
  },
  {
    id: 'booster-pack',
    name: 'Pack de 3 boosters',
    description: 'Reçois 3 boosters supplémentaires.',
    price: 520,
    rewardBoosters: 3,
    hourlyLimit: 3,
    emoji: '📦'
  },
  {
    id: 'booster-capacity',
    name: 'Power-up capacité',
    description: 'Augmente temporairement la capacité maximale de boosters de 1 pendant 12h.',
    price: 350,
    rewardBoosters: 1,
    effectType: 'temporary-capacity',
    effectDurationMs: 12 * 60 * 60 * 1000,
    emoji: '⚡'
  }
  ,{
    id: 'emoji-chest',
    name: 'Coffre cosmétique',
    description: "Débloque un fond d'écran emoji aléatoire pour le site.",
    price: 300,
    hourlyLimit: null,
    emoji: '🎁',
    effectType: 'cosmetic-chest'
  }
];

const SPECIAL_BACKGROUND_IMAGE = 'raton rbv.png';
const COSMETIC_BACKGROUNDS = [
  '🌸','🌊','⭐','🍀','🔥','🍩','🎈','🌈','🍁','❄️','🌙','☀️','🌺','🍓','🍒'
];

function makeEmojiWallpaperDataUrl(emoji) {
  const size = 200;
  const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>` +
    `<rect width='100%' height='100%' fill='transparent'/>` +
    `<text x='50%' y='50%' font-size='64' dominant-baseline='middle' text-anchor='middle'>${emoji}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function applyBackground(bg) {
  try {
    if (!bg) {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = '';
      return;
    }
    if (typeof bg === 'string' && bg.includes('.')) {
      const url = encodeURI(bg);
      document.body.style.backgroundImage = `url('${url}')`;
      document.body.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundSize = '200px 200px';
      document.body.style.backgroundPosition = 'center center';
      return;
    }
    const url = makeEmojiWallpaperDataUrl(bg);
    document.body.style.backgroundImage = `url("${url}")`;
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = '200px 200px';
    document.body.style.backgroundPosition = 'center center';
  } catch (e) {
    console.warn('applyBackground failed', e);
  }
}

function getOwnedBackgrounds() {
  return Array.isArray(state.ownedBackgrounds) ? state.ownedBackgrounds : [];
}

function addRandomBackground() {
  const owned = new Set(getOwnedBackgrounds());
  const candidates = COSMETIC_BACKGROUNDS.filter((b) => !owned.has(b));
  const pick = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : COSMETIC_BACKGROUNDS[Math.floor(Math.random() * COSMETIC_BACKGROUNDS.length)];
  state.ownedBackgrounds = Array.from(new Set([...(state.ownedBackgrounds || []), pick]));
  state.currentBackground = pick;
  saveState();
  showToast('Nouveau fond débloqué !');
  render();
}

function renderCosmetics() {
  const grid = document.getElementById('cosmeticsGrid');
  const coinsDisplay = document.getElementById('cosmeticsCoins');
  if (!grid) return;
  if (coinsDisplay) coinsDisplay.textContent = `${state.coins || 0} 🪙`;
  grid.innerHTML = '';
  const owned = getOwnedBackgrounds();
  // Owned backgrounds
  owned.forEach((bg) => {
    const isImage = typeof bg === 'string' && bg.includes('.');
    const card = document.createElement('article');
    card.className = 'cosmetic-card';
    card.innerHTML = `
      ${isImage ? `<img src="${bg}" alt="Fond" style="width:3rem; height:3rem; border-radius:12px; object-fit:cover;" />` : `<div class="emoji" style="font-size:2.5rem">${bg}</div>`}
      <div class="meta">${bg === state.currentBackground ? '<strong>Appliqué</strong>' : `<button class="apply-btn">Appliquer</button>`}</div>
    `;
    const applyBtn = card.querySelector('.apply-btn');
    applyBtn?.addEventListener('click', () => {
      state.currentBackground = bg;
      saveState();
      applyBackground(bg);
      renderCosmetics();
    });
    grid.appendChild(card);
  });

  // Locked / not owned backgrounds
  COSMETIC_BACKGROUNDS.filter((b) => !owned.includes(b)).forEach((bg) => {
    const card = document.createElement('article');
    card.className = 'cosmetic-card locked';
    card.innerHTML = `
      <div class="emoji" style="font-size:2.5rem">${bg}</div>
      <div class="meta"><button class="buy-chest-btn">Obtenir via coffre</button></div>
    `;
    card.querySelector('.buy-chest-btn')?.addEventListener('click', () => {
      buyShopItem('emoji-chest');
      setTimeout(renderCosmetics, 500);
    });
    grid.appendChild(card);
  });
}

function getPendingAchievementsCount() {
  if (typeof ACHIEVEMENT_DEFINITIONS === 'undefined' || !Array.isArray(ACHIEVEMENT_DEFINITIONS)) {
    return 0;
  }
  return ACHIEVEMENT_DEFINITIONS.reduce((count, definition) => {
    const unlocked = Boolean(state.achievementsUnlocked?.[definition.id]);
    const claimed = Boolean(state.achievementsClaimed?.[definition.id]);
    return count + ((unlocked && !claimed) ? 1 : 0);
  }, 0);
}

function updatePendingAchievementsText() {
  const pendingCount = getPendingAchievementsCount();
  if (pendingAchievementsText) {
    pendingAchievementsText.textContent = `${pendingCount} récompense${pendingCount === 1 ? '' : 's'} en attente`;
  }
  if (achievementsCard) {
    achievementsCard.classList.toggle('has-pending-rewards', pendingCount > 0);
  }
}

function getShopItemPurchaseCount(item, now = Date.now()) {
  ensureShopPurchaseState(now);
  return Number(state.shopPurchaseCounts?.[item.id] || 0);
}

function ensureShopPromotion(now = Date.now()) {
  const currentHour = getHourBucket(now);
  if (state.shopPromotionHourKey !== currentHour) {
    state.shopPromotionHourKey = currentHour;
    state.shopPromotionItemId = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)].id;
    const nextHourAt = Math.floor(now / 3600000) * 3600000 + 3600000;
    state.shopPromotionUntil = nextHourAt;
  }
  return state.shopPromotionItemId;
}

function getPromotionPrice(item, now = Date.now()) {
  ensureShopPromotion(now);
  if (state.shopPromotionItemId === item.id && (state.shopPromotionUntil || 0) > now) {
    return Math.round(item.price * 0.9);
  }
  return item.price;
}

function isItemOnPromotion(itemId, now = Date.now()) {
  ensureShopPromotion(now);
  return state.shopPromotionItemId === itemId && (state.shopPromotionUntil || 0) > now;
}

function getShopItemStockText(item, now = Date.now()) {
  if (!item.hourlyLimit || item.hourlyLimit <= 0) {
    return '';
  }

  const currentPurchases = getShopItemPurchaseCount(item, now);
  const remaining = Math.max(0, item.hourlyLimit - currentPurchases);

  if (remaining <= 0) {
    return 'Épuisé';
  }

  return `${remaining} restant${remaining > 1 ? 's' : ''}`;
}

function getShopItemTimerText(item, now = Date.now()) {
  if (item.id === 'booster-credit' || item.id === 'booster-pack') {
    const currentPurchases = getShopItemPurchaseCount(item, now);
    if (currentPurchases >= (item.hourlyLimit || 3)) {
      const exhaustionAt = Number(state.shopExhaustionAtByItem?.[item.id] || now);
      const nextHourAt = Math.floor(exhaustionAt / 3600000) * 3600000 + 3600000;
      const remainingMs = Math.max(0, nextHourAt - now);
      return `Réinitialise dans ${formatDuration(remainingMs)}`;
    }
    return 'Disponible maintenant';
  }

  if (item.effectType === 'temporary-capacity') {
    if (isTemporaryBoosterCapacityActive(now)) {
      const remainingMs = Math.max(0, state.tempBoosterCapacityUntil - now);
      return `Actif encore ${formatDuration(remainingMs)}`;
    }
    return 'Durée 12h';
  }

  return '';
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function buyShopItem(itemId) {
  const item = SHOP_ITEMS.find((entry) => entry.id === itemId);
  const now = Date.now();
  ensureShopPurchaseState(now);
  ensureShopPromotion(now);

  const price = getPromotionPrice(item, now);
  
  if (!item) {
    return;
  }
  
  if ((state.coins || 0) < price) {
    showToast('Pas assez de pièces.');
    return;
  }

  state.coins = (state.coins || 0) - price;
  state.totalCoinsSpent = (state.totalCoinsSpent || 0) + price;

  if ((item.hourlyLimit || Infinity) < Infinity && getShopItemPurchaseCount(item, now) >= item.hourlyLimit) {
    showToast('Cet article est épuisé pour cette heure.');
    return;
  }

  if (item.effectType === 'temporary-capacity') {
    state.tempBoosterCapacityUntil = now + item.effectDurationMs;
    state.boostersAvailable = (state.boostersAvailable || 0) + (item.rewardBoosters || 0);
    if (state.boostersAvailable < getEffectiveBoosterLimit() && !state.nextBoosterAt) {
      state.nextBoosterAt = now + BOOSTER_COOLDOWN_MS;
    }
  } else if (item.effectType === 'cosmetic-chest') {
    state.shopPurchaseCounts = state.shopPurchaseCounts || {};
    const nextCount = Number(state.shopPurchaseCounts[item.id] || 0) + 1;
    state.shopPurchaseCounts[item.id] = nextCount;
    if (item.hourlyLimit && nextCount >= item.hourlyLimit) {
      state.shopExhaustionAtByItem = state.shopExhaustionAtByItem || {};
      state.shopExhaustionAtByItem[item.id] = now;
    }
    state.totalCosmeticsObtained = (state.totalCosmeticsObtained || 0) + 1;
    addRandomBackground();
  } else {
    state.shopPurchaseCounts = state.shopPurchaseCounts || {};
    const nextCount = Number(state.shopPurchaseCounts[item.id] || 0) + 1;
    state.shopPurchaseCounts[item.id] = nextCount;
    if (item.hourlyLimit && nextCount >= item.hourlyLimit) {
      state.shopExhaustionAtByItem = state.shopExhaustionAtByItem || {};
      state.shopExhaustionAtByItem[item.id] = now;
    }
    state.boostersAvailable = (state.boostersAvailable || 0) + (item.rewardBoosters || 0);
    if (state.boostersAvailable < getEffectiveBoosterLimit() && !state.nextBoosterAt) {
      state.nextBoosterAt = now + BOOSTER_COOLDOWN_MS;
    }
  }

  state.shopItemsPurchased = (state.shopItemsPurchased || 0) + 1;
  awardAchievements();
  saveState();
  render();
}

function getPromotionTimerText(now = Date.now()) {
  ensureShopPromotion(now);
  const remaining = Math.max(0, (state.shopPromotionUntil || now) - now);
  return formatDuration(remaining);
}

function renderShop() {
  const shopList = document.getElementById('shopList');
  const coinsDisplay = document.getElementById('coinsDisplay');
  const descriptionEl = shopList?.parentElement?.querySelector('.subtitle');
  if (!shopList || !coinsDisplay) {
    return;
  }

  if (!shopTimerInterval) {
    shopTimerInterval = window.setInterval(() => {
      renderShop();
    }, 1000);
  }

  coinsDisplay.textContent = `${state.coins || 0} 🪙`;
  shopList.innerHTML = '';
  const now = Date.now();
  ensureShopPurchaseState(now);
  ensureShopPromotion(now);

  if (descriptionEl) {
    const promoTimer = getPromotionTimerText(now);
    descriptionEl.innerHTML = `Achète des boosters et des power-ups avec les pièces gagnées en vendant des doublons.<br><span style="font-size:0.85em; color:var(--accent-2);">✨ Promo aléatoire -10% pendant ${promoTimer}</span>`;
  }

  SHOP_ITEMS.forEach((item) => {
    const purchaseCount = getShopItemPurchaseCount(item, now);
    const isExhausted = Boolean(item.hourlyLimit && purchaseCount >= item.hourlyLimit);
    const onPromotion = isItemOnPromotion(item.id, now);
    const card = document.createElement('article');
    card.className = `shop-card${isExhausted ? ' is-sold-out' : ''}${onPromotion ? ' is-promoted' : ''}`;
    const extraButtonHtml = item.id === 'emoji-chest' ? `<button type="button" class="open-cosmetics-btn secondary-btn" style="margin-right:0.5rem;">Mes cosmétiques</button>` : '';
    const timerText = getShopItemTimerText(item, now);
    const stockText = getShopItemStockText(item, now);
    const promotedPrice = getPromotionPrice(item, now);
    const buttonDisabled = (state.coins || 0) < promotedPrice || isExhausted;

    card.innerHTML = `
      <div class="shop-content">
        <div>
          <div class="shop-item-title">
            <span class="shop-emoji">${item.emoji || '🛍️'}</span>
            <span class="name">${item.name}</span>
            ${onPromotion ? '<span class="promo-badge">-10%</span>' : ''}
          </div>
          <p class="shop-description">${item.description}</p>
          <div class="shop-statuses">
            <span class="shop-timer">${timerText}</span>
            ${stockText ? `<span class="shop-stock">${stockText}</span>` : ''}
          </div>
        </div>
        <div class="shop-meta">
          <span class="rarity-badge">
            ${onPromotion ? `<span class="promo-old-price">${item.price}</span> <strong>${promotedPrice} 🪙</strong>` : `${promotedPrice} 🪙`}
          </span>
          ${extraButtonHtml}
          <button type="button" class="buy-btn" ${buttonDisabled ? 'disabled' : ''}>Acheter</button>
        </div>
      </div>
    `;

    card.querySelector('.buy-btn').addEventListener('click', () => buyShopItem(item.id));
    const openBtn = card.querySelector('.open-cosmetics-btn');
    openBtn?.addEventListener('click', () => { window.location.href = 'cosmetics.html'; });
    shopList.appendChild(card);
  });
}

function applyPromoCode() {
  const code = (promoCodeInput?.value || '').trim().toUpperCase();
  const now = Date.now();

  if (!code) {
    if (promoResultEl) {
      promoResultEl.textContent = 'Entre un code promo.';
    }
    return;
  }

  const redeemedCodes = state.promoCodesRedeemed || {};
  if (redeemedCodes[code]) {
    if (promoResultEl) {
      promoResultEl.textContent = 'Ce code promo a déjà été utilisé.';
    }
    return;
  }

  if (code === 'MOULAGA') {
    state.coins = Number(state.coins || 0) + 500;
    state.totalCoinsEarned = (state.totalCoinsEarned || 0) + 500;
    redeemedCodes[code] = true;
    state.promoCodesRedeemed = redeemedCodes;
    saveState();
    render();
    if (promoResultEl) {
      promoResultEl.textContent = 'Code promo appliqué : +500 🪙';
    }
    if (promoCodeInput) {
      promoCodeInput.value = '';
    }
    return;
  }

  if (promoResultEl) {
    promoResultEl.textContent = 'Code promo invalide.';
  }
}

function createBooster() {
  const matchingPoolByRarity = new Map();

  EMOJI_LIBRARY.forEach((emoji) => {
    const rarityName = emoji.rarity?.name || 'Commun';
    if (!matchingPoolByRarity.has(rarityName)) {
      matchingPoolByRarity.set(rarityName, []);
    }
    matchingPoolByRarity.get(rarityName).push(emoji);
  });

  return Array.from({ length: 10 }, () => {
    const rarity = pickWeightedRarity();
    const pool = matchingPoolByRarity.get(rarity.name) || EMOJI_LIBRARY;
    const emoji = pool[Math.floor(Math.random() * pool.length)];
    return {
      key: makeEmojiKey(emoji),
      symbol: emoji.symbol,
      name: emoji.name,
      rarity: rarity.name,
      group: emoji.group,
      family: emoji.family
    };
  });
}

function pickWeightedRarity() {
  const total = RARITY_CONFIG.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;

  for (const rarity of RARITY_CONFIG) {
    roll -= rarity.weight;
    if (roll <= 0) {
      return rarity;
    }
  }

  return RARITY_CONFIG[0];
}

function createEmptyState() {
  return {
    collection: {},
    nextOpenAt: 0,
    boostersOpened: 0,
    lastOpenedAt: null,
    lastBooster: [],
    boostersAvailable: MAX_BOOSTERS_IN_INVENTORY,
    nextBoosterAt: null,
    boosterUsesThisHour: 0,
    shopPurchaseHourKey: null,
    shopPurchaseCounts: {
      'booster-credit': 0,
      'booster-pack': 0
    },
    shopExhaustionAtByItem: {},
    tempBoosterCapacityUntil: null,
    shopPromotionHourKey: null,
    shopPromotionItemId: null,
    shopPromotionUntil: null,
    promoCodesRedeemed: {},
    exchangeBoosterCredits: 0,
    duplicatesSold: 0,
    totalCoinsEarned: 0,
    totalCoinsSpent: 0,
    totalCosmeticsObtained: 0,
    ownedBackgrounds: [],
    currentBackground: null,
    followBonusBoosters: 0,
    followedTwitch: false,
    followedInstagram: false,
    coins: 0,
    maxCoinsHeld: 0,
    achievementsUnlocked: {},
    achievementsClaimed: {},
    shopItemsPurchased: 0,
    lastResetHour: null,
    lastBoosterSignature: null
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createEmptyState();
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.collection) {
      return createEmptyState();
    }

    const normalizedState = {
      ...parsed,
      collection: normalizeCollectionState(parsed.collection),
      lastBooster: Array.isArray(parsed.lastBooster) ? parsed.lastBooster.map(normalizeCollectionEntry) : [],
      boostersAvailable: Math.max(
        0,
        Math.min(
          MAX_BOOSTERS_IN_INVENTORY + Number(parsed.followBonusBoosters || 0),
          Number(parsed.boostersAvailable ?? parsed.availableBoosters ?? MAX_BOOSTERS_IN_INVENTORY)
        )
      ),
      nextBoosterAt: parsed.nextBoosterAt ? Number(parsed.nextBoosterAt) : null,
      shopPurchaseHourKey: parsed.shopPurchaseHourKey ?? null,
      shopPurchaseCounts: {
        'booster-credit': Number(parsed.shopPurchaseCounts?.['booster-credit'] || 0),
        'booster-pack': Number(parsed.shopPurchaseCounts?.['booster-pack'] || 0)
      },
      shopExhaustionAtByItem: parsed.shopExhaustionAtByItem || {},
      tempBoosterCapacityUntil: parsed.tempBoosterCapacityUntil ? Number(parsed.tempBoosterCapacityUntil) : null,
      shopPromotionHourKey: parsed.shopPromotionHourKey ?? null,
      shopPromotionItemId: parsed.shopPromotionItemId ?? null,
      shopPromotionUntil: parsed.shopPromotionUntil ? Number(parsed.shopPromotionUntil) : null,
      promoCodesRedeemed: parsed.promoCodesRedeemed || {},
      exchangeBoosterCredits: Number(parsed.exchangeBoosterCredits || 0),
      duplicatesSold: Number(parsed.duplicatesSold || 0),
      totalCoinsEarned: Number(parsed.totalCoinsEarned || 0),
      totalCoinsSpent: Number(parsed.totalCoinsSpent || 0),
      totalCosmeticsObtained: Number(parsed.totalCosmeticsObtained || 0),
      ownedBackgrounds: Array.isArray(parsed.ownedBackgrounds) ? parsed.ownedBackgrounds : [],
      currentBackground: parsed.currentBackground ?? null,
      followedTwitch: Boolean(parsed.followedTwitch || Number(parsed.followBonusBoosters || 0) >= 1),
      followedInstagram: Boolean(parsed.followedInstagram || Number(parsed.followBonusBoosters || 0) >= 2),
      followBonusBoosters: Number(parsed.followBonusBoosters || 0),
      coins: Number(parsed.coins || 0),
      shopItemsPurchased: Number(parsed.shopItemsPurchased || 0),
      boosterUsesThisHour: 0
    };

    return normalizedState;
  } catch {
    return createEmptyState();
  }
}

function saveState(s) {
  const toSave = s || state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    // Fallback: try to stringify a reduced state if storage overflows
    try {
      const minimal = {
        coins: Number(toSave.coins || 0),
        collection: toSave.collection || {},
        achievementsUnlocked: toSave.achievementsUnlocked || {},
        achievementsClaimed: toSave.achievementsClaimed || {},
        ownedBackgrounds: toSave.ownedBackgrounds || [],
        currentBackground: toSave.currentBackground ?? null,
        totalCoinsEarned: Number(toSave.totalCoinsEarned || 0),
        totalCoinsSpent: Number(toSave.totalCoinsSpent || 0),
        totalCosmeticsObtained: Number(toSave.totalCosmeticsObtained || 0)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
    } catch (err) {
      console.error('Failed to save state', err);
    }
  }
}

function makeEmojiKey(emoji) {
  return `${emoji.name}-${emoji.symbol}`;
}

function getBoosterSignature(booster) {
  return booster.map((card) => `${card.symbol}:${card.rarity}`).join('|');
}

function getAvailableBoosters(now) {
  const effectiveLimit = getEffectiveBoosterLimit();

  if ((state.boostersAvailable || 0) < effectiveLimit && !state.nextBoosterAt) {
    state.nextBoosterAt = now + BOOSTER_COOLDOWN_MS;
  }

  while (
    (state.boostersAvailable || 0) < effectiveLimit &&
    (state.nextBoosterAt || 0) <= now
  ) {
    state.boostersAvailable = (state.boostersAvailable || 0) + 1;
    state.nextBoosterAt += BOOSTER_COOLDOWN_MS;
  }

  if ((state.boostersAvailable || 0) > effectiveLimit) {
    state.nextBoosterAt = null;
  }

  return Math.max(0, (state.boostersAvailable || 0));
}

function getRarityStyle(name) {
  return getRarityByName(name) || RARITY_CONFIG.find((item) => item.name === 'Commun') || RARITY_CONFIG[0];
}

function getRarityRankValue(rarityName) {
  const normalized = (rarityName || '').toString().trim();
  const rankMap = {
    'Légendaire Ultime': 0,
    Mythique: 1,
    'Ultra rare': 2,
    Légendaire: 3,
    Épique: 4,
    Rare: 5,
    'Peu commun': 6,
    Commun: 7
  };
  return rankMap[normalized] ?? 999;
}

function getDisplayName(emoji) {
  if (!emoji) {
    return '';
  }

  const rawName = (emoji.displayName || emoji.frenchName || emoji.localizedName || emoji.name || '').toString().trim();
  if (rawName) {
    if (typeof window.EmojiTCGData?.translateEmojiName === 'function') {
      return window.EmojiTCGData.translateEmojiName(rawName);
    }
    return rawName;
  }

  return (emoji.key || emoji.symbol || '').toString();
}

async function ensureAudioReady() {
  if (audioReady) {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  audioReady = true;
}

function playBoosterOpenSound() {
  if (!audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
  gain.connect(audioContext.destination);

  const osc1 = audioContext.createOscillator();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(880, now);
  osc1.frequency.exponentialRampToValueAtTime(620, now + 0.18);
  osc1.connect(gain);

  const osc2 = audioContext.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(1320, now);
  osc2.frequency.exponentialRampToValueAtTime(780, now + 0.18);
  osc2.connect(gain);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.28);
  osc2.stop(now + 0.28);
}

function playConfettiSound() {
  if (confettiSoundPlayed || !audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.025, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
  gain.connect(audioContext.destination);

  const osc = audioContext.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1568, now);
  osc.frequency.exponentialRampToValueAtTime(1980, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(1180, now + 0.24);
  osc.connect(gain);

  osc.start(now);
  osc.stop(now + 0.26);
  confettiSoundPlayed = true;
}

function ensureConfettiLayer() {
  if (confettiLayer) {
    return confettiLayer;
  }

  confettiLayer = document.createElement('div');
  confettiLayer.className = 'confetti-layer';
  confettiLayer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(confettiLayer);
  return confettiLayer;
}

function launchConfetti(color) {
  const layer = ensureConfettiLayer();
  const pieces = 28;
  const colors = [color, '#f59e0b', '#f43f5e', '#8b5cf6', '#34d399', '#facc15'];

  for (let index = 0; index < pieces; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const size = 6 + Math.random() * 10;
    const hueColor = colors[index % colors.length];
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.65}px`;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `-${size}px`;
    piece.style.background = hueColor;
    piece.style.setProperty('--confetti-drift', `${(Math.random() - 0.5) * 220}px`);
    piece.style.setProperty('--confetti-duration', `${1.8 + Math.random() * 1.2}s`);
    piece.style.setProperty('--confetti-delay', `${Math.random() * 0.15}s`);
    layer.appendChild(piece);

    setTimeout(() => piece.remove(), 3400);
  }
}

function ensureBoosterRevealModal() {
  if (boosterRevealModal) {
    return boosterRevealModal;
  }

  boosterRevealModal = document.createElement('div');
  boosterRevealModal.className = 'booster-reveal-modal';
  boosterRevealModal.setAttribute('aria-hidden', 'true');
  boosterRevealModal.innerHTML = `
    <div class="booster-reveal-panel">
      <div class="booster-reveal-header">
        <div>
          <p class="reveal-kicker">Révélation du booster</p>
          <h3 class="reveal-title">Émoji 1/10</h3>
        </div>
        <button type="button" class="reveal-close" aria-label="Fermer">×</button>
      </div>
      <div class="reveal-emoji-stage">
        <div class="reveal-emoji">🎁</div>
      </div>
      <div class="reveal-info">
        <div class="reveal-badges">
          <span class="reveal-rarity-badge">Commun</span>
          <span class="reveal-new-pill">Nouveau !</span>
        </div>
        <div class="reveal-meta-row"><span class="reveal-label">Nom</span><strong class="reveal-name">—</strong></div>
        <div class="reveal-meta-row"><span class="reveal-label">Rareté</span><strong class="reveal-rarity">—</strong></div>
        <div class="reveal-meta-row"><span class="reveal-label">Taux d’obtention</span><strong class="reveal-rate">—</strong></div>
      </div>
      <div class="reveal-progress"><span class="reveal-progress-fill"></span></div>
      <div class="reveal-actions">
        <button type="button" class="reveal-next-btn">Suivant</button>
        <button type="button" class="reveal-close-btn">Fermer</button>
      </div>
      <p class="reveal-counter">1/10</p>
    </div>
  `;

  boosterRevealModal.addEventListener('click', (event) => {
    if (event.target === boosterRevealModal) {
      boosterRevealModal.classList.remove('is-open');
      boosterRevealModal.setAttribute('aria-hidden', 'true');
    }
  });

  boosterRevealModal.querySelector('.reveal-close').addEventListener('click', () => {
    boosterRevealModal.classList.remove('is-open');
    boosterRevealModal.setAttribute('aria-hidden', 'true');
  });

  boosterRevealModal.querySelector('.reveal-close-btn').addEventListener('click', () => {
    boosterRevealModal.classList.remove('is-open');
    boosterRevealModal.setAttribute('aria-hidden', 'true');
  });

  document.body.appendChild(boosterRevealModal);
  return boosterRevealModal;
}

function updateBoosterRevealModal(card, index, total, onNext, onClose) {
  const modal = ensureBoosterRevealModal();
  const rarityStyle = getRarityStyle(card.rarity);
  const panel = modal.querySelector('.booster-reveal-panel');
  const rarityBadge = modal.querySelector('.reveal-rarity-badge');
  const newPill = modal.querySelector('.reveal-new-pill');
  const progressFill = modal.querySelector('.reveal-progress-fill');
  const emojiStage = modal.querySelector('.reveal-emoji');
  const title = modal.querySelector('.reveal-title');
  const nameEl = modal.querySelector('.reveal-name');
  const rarityEl = modal.querySelector('.reveal-rarity');
  const rateEl = modal.querySelector('.reveal-rate');
  const counter = modal.querySelector('.reveal-counter');
  const nextBtn = modal.querySelector('.reveal-next-btn');
  const closeBtn = modal.querySelector('.reveal-close-btn');
  const stage = modal.querySelector('.reveal-emoji-stage');
  const info = modal.querySelector('.reveal-info');

  title.textContent = `Émoji ${index + 1}/${total}`;
  emojiStage.textContent = card.symbol;
  nameEl.textContent = getDisplayName(card);
  rarityEl.textContent = card.rarity;
  rateEl.textContent = `${rarityStyle?.rate ?? 0}%`;
  counter.textContent = `${index + 1}/${total}`;
  rarityBadge.textContent = card.rarity;
  rarityBadge.style.background = `${rarityStyle.color}22`;
  rarityBadge.style.color = rarityStyle.color;
  rarityBadge.style.borderColor = `${rarityStyle.color}55`;
  progressFill.style.width = `${((index + 1) / total) * 100}%`;
  panel.style.setProperty('--reveal-color', rarityStyle.color);
  panel.style.borderColor = `${rarityStyle.color}55`;
  panel.style.boxShadow = `0 0 0 1px ${rarityStyle.color}22, 0 30px 70px rgba(0, 0, 0, 0.38), 0 0 24px ${rarityStyle.color}44`;

  const shouldCelebrate = getRarityRankValue(card.rarity) <= getRarityRankValue('Épique');
  if (shouldCelebrate) {
    launchConfetti(rarityStyle.color);
    playConfettiSound();
  }

  if (card.wasOwned) {
    newPill.style.display = 'none';
  } else {
    newPill.style.display = 'inline-flex';
  }

  nextBtn.style.display = index < total - 1 ? 'inline-flex' : 'none';
  closeBtn.style.display = index < total - 1 ? 'inline-flex' : 'inline-flex';
  nextBtn.textContent = index < total - 1 ? 'Suivant' : 'Fermer';

  nextBtn.onclick = () => {
    if (typeof onNext === 'function') {
      onNext();
    }
  };
  closeBtn.onclick = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  };

  stage.classList.remove('is-visible');
  info.classList.remove('is-visible');
  panel.classList.remove('is-visible');
  void stage.offsetWidth;
  void info.offsetWidth;
  void panel.offsetWidth;
  stage.classList.add('is-visible');
  info.classList.add('is-visible');
  panel.classList.add('is-visible');

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function renderBoosterSummary() {
  if (state.lastBooster.length) {
    lastResultBadge.textContent = 'Nouveau booster';
    const signature = state.lastBoosterSignature || getBoosterSignature(state.lastBooster);
    if (displayedBoosterSignature !== signature) {
      boosterResults.innerHTML = '';
      state.lastBooster.forEach((card) => {
        const rarityStyle = getRarityStyle(card.rarity);
        const item = document.createElement('article');
        item.className = 'result-item reveal-card';
        const rarityKey = (card.rarity || '').toLowerCase();
        if (rarityKey.includes('rare')) {
          item.classList.add('rare');
        }
        if (rarityKey.includes('épique')) {
          item.classList.add('epic');
        }
        if (rarityKey.includes('légendaire')) {
          item.classList.add('legendary');
        }
        item.innerHTML = `
          <div class="emoji">${card.symbol}</div>
          <span class="name">${getDisplayName(card)}</span>
          <span class="rarity" style="background:${rarityStyle ? `${rarityStyle.color}22` : '#ffffff22'}; color:${rarityStyle?.color || '#ffffff'};">${card.rarity}</span>
        `;
        boosterResults.appendChild(item);
      });
      displayedBoosterSignature = signature;
    }
  } else {
    lastResultBadge.textContent = 'En attente';
    boosterResults.innerHTML = '<div class="empty-state">Aucun booster ouvert pour le moment.</div>';
  }
}

function render() {
  const now = Date.now();
  // apply currently selected background (cosmetics)
  applyBackground(state.currentBackground);
  const available = Math.max(0, getAvailableBoosters(now));
  const canOpen = available > 0;
  updateBonusButtons();

  openBoosterBtn.disabled = !canOpen;
  openBoosterBtn.textContent = canOpen ? `Ouvrir un booster (${available} dispo)` : 'Plus de boosters';

  const remaining = Math.max(0, (state.nextBoosterAt || now + BOOSTER_COOLDOWN_MS) - now);
  const hours = String(Math.floor(remaining / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');

  const effectiveLimit = getEffectiveBoosterLimit();
  if (available >= effectiveLimit) {
    cooldownText.textContent = 'Disponible maintenant';
  } else if (remaining > 0) {
    cooldownText.textContent = `Prochain booster ${hours}:${minutes}:${seconds}`;
  } else {
    cooldownText.textContent = 'Disponible maintenant';
  }

  boostersAvailableText.textContent = `${available}/${getEffectiveBoosterLimit()}`;
  const discovered = Object.values(state.collection).filter((entry) => (entry.count || 0) > 0).length;
  discoveredCount.textContent = `${discovered}/${EMOJI_LIBRARY.length}`;
  const coinsTotalEl = document.getElementById('coinsTotal');
  if (coinsTotalEl) {
    coinsTotalEl.textContent = `${state.coins || 0} 🪙`;
  }
  const heroCoinsBadge = document.getElementById('heroCoinsBadge');
  if (heroCoinsBadge) {
    heroCoinsBadge.textContent = `${state.coins || 0} 🪙`;
  }
  if (headerDiscoveredCount && headerTotalCount) {
    headerDiscoveredCount.textContent = discovered;
    headerTotalCount.textContent = EMOJI_LIBRARY.length;
  }
  boostersOpened.textContent = state.boostersOpened;
  updatePendingAchievementsText();

  renderBoosterSummary();

  const collectionEntries = Object.values(state.collection).sort((a, b) => b.count - a.count);
  if (collectionEntries.length) {
    collectionList.innerHTML = '';
    const visibleEntries = collectionEntries.slice(0, 15);
    visibleEntries.forEach((entry) => {
      const item = document.createElement('article');
      const rarityStyle = getRarityStyle(entry.rarity);
      item.className = 'collection-item';
      item.style.borderColor = `${rarityStyle.color}55`;
      item.style.boxShadow = `inset 0 0 0 1px ${rarityStyle.color}22`;
      item.innerHTML = `
        <div class="emoji-big">${entry.symbol}</div>
        <div class="meta">
          <span class="name">${getDisplayName(entry)}</span>
          <div class="count">
            <span>x${entry.count}</span>
            <span class="rarity-badge" style="background:${rarityStyle.color}22; color:${rarityStyle.color}; border-color:${rarityStyle.color}55;">${entry.rarity}</span>
          </div>
        </div>
      `;
      collectionList.appendChild(item);
    });

    if (collectionEntries.length > 15) {
      const moreItem = document.createElement('a');
      moreItem.href = 'collection.html';
      moreItem.className = 'collection-item';
      moreItem.style.textDecoration = 'none';
      moreItem.style.display = 'flex';
      moreItem.style.alignItems = 'center';
      moreItem.style.justifyContent = 'center';
      moreItem.style.cursor = 'pointer';
      moreItem.innerHTML = '<span class="name">Voir toute la collection</span>';
      collectionList.appendChild(moreItem);
    }
  } else {
    collectionList.innerHTML = '<div class="empty-state">Ta collection est vide. Ouvre un booster pour commencer.</div>';
  }

  const rankedEntries = [...EMOJI_LIBRARY]
    .map((emoji) => {
      const entry = state.collection[makeEmojiKey(emoji)] || { count: 0 };
      return {
        ...emoji,
        count: entry.count || 0
      };
    })
    .sort((a, b) => {
      const rankDiff = getRarityRankValue(a.rarity?.name) - getRarityRankValue(b.rarity?.name);
      if (rankDiff !== 0) {
        return rankDiff;
      }
      return (a.count || 0) - (b.count || 0);
    })
    .slice(0, 15);

  if (rankedEntries.length) {
    libraryList.innerHTML = '';
    rankedEntries.forEach((emoji) => {
      const item = document.createElement('article');
      const rarityStyle = emoji.rarity || RARITY_CONFIG[0];
      item.className = 'collection-item';
      item.style.borderColor = `${rarityStyle.color}55`;
      item.innerHTML = `
        <div class="emoji-big">${emoji.symbol}</div>
        <div class="meta">
          <span class="name">${getDisplayName(emoji)}</span>
          <span class="count">${emoji.count} obtenu${emoji.count > 1 ? 's' : ''} · <span style="color:${rarityStyle.color}; font-weight:700;">${emoji.rarity.name} · ${emoji.rarity.rate}%</span></span>
        </div>
      `;
      libraryList.appendChild(item);
    });

    const libraryLink = document.createElement('a');
    libraryLink.href = 'library.html';
    libraryLink.className = 'collection-item';
    libraryLink.style.textDecoration = 'none';
    libraryLink.style.display = 'flex';
    libraryLink.style.alignItems = 'center';
    libraryLink.style.justifyContent = 'center';
    libraryLink.style.cursor = 'pointer';
    libraryLink.innerHTML = '<span class="name">Voir la bibliothèque complète</span>';
    libraryList.appendChild(libraryLink);
  } else {
    libraryList.innerHTML = '<div class="empty-state">La bibliothèque est vide pour le moment.</div>';
  }
  renderShop();
}

function showToast(message) {
  lastResultBadge.textContent = message;
  setTimeout(() => {
    lastResultBadge.textContent = state.lastBooster.length ? 'Nouveau booster' : 'En attente';
  }, 1800);
}

async function revealBooster(booster) {
  return new Promise((resolve) => {
    let currentIndex = 0;

    const renderCurrentCard = () => {
      const card = booster[currentIndex];
      const rarityStyle = getRarityStyle(card.rarity);
      const item = document.createElement('article');
      item.className = 'result-item reveal-card';
      const rarityKey = (card.rarity || '').toLowerCase();
      if (rarityKey.includes('rare')) {
        item.classList.add('rare');
      }
      if (rarityKey.includes('épique')) {
        item.classList.add('epic');
      }
      if (rarityKey.includes('légendaire')) {
        item.classList.add('legendary');
      }
      item.innerHTML = `
        <div class="emoji">${card.symbol}</div>
        <span class="name">${getDisplayName(card)}</span>
        <span class="rarity" style="background:${rarityStyle ? `${rarityStyle.color}22` : '#ffffff22'}; color:${rarityStyle?.color || '#ffffff'};">${card.rarity}</span>
        ${card.wasOwned ? '' : '<span class="new-pill">Nouveau !</span>'}
      `;
      boosterResults.innerHTML = '';
      boosterResults.appendChild(item);
    };

    const closeReveal = () => {
      boosterRevealModal?.classList.remove('is-open');
      boosterRevealModal?.setAttribute('aria-hidden', 'true');
      renderBoosterSummary();
      resolve();
    };

    const showNext = () => {
      if (currentIndex >= booster.length - 1) {
        closeReveal();
        return;
      }

      currentIndex += 1;
      renderCurrentCard();
      updateBoosterRevealModal(booster[currentIndex], currentIndex, booster.length, showNext, closeReveal);
    };

    boosterResults.innerHTML = '';
    boosterResults.style.cursor = 'default';
    renderCurrentCard();
    updateBoosterRevealModal(booster[0], 0, booster.length, showNext, closeReveal);
  });
}

setInterval(() => {
  render();
}, 1000);

render();
