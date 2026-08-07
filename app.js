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

if (!window.EmojiTCGData) {
  console.warn('emoji-data.js is not loaded');
}

const openBoosterBtn = document.getElementById('openBoosterBtn');
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

openBoosterBtn.addEventListener('click', async () => {
  const now = Date.now();
  const canOpen = getAvailableBoosters(now) > 0;

  if (!canOpen) {
    showToast('Tu n’as pas encore de booster disponible.');
    return;
  }

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

  state.boostersAvailable = Math.max(
    0,
    Math.min(MAX_BOOSTERS_IN_INVENTORY, (state.boostersAvailable || 0) - 1)
  );

  if (state.boostersAvailable < MAX_BOOSTERS_IN_INVENTORY && !state.nextBoosterAt) {
    state.nextBoosterAt = now + BOOSTER_COOLDOWN_MS;
  }

  saveState();
  await revealBooster(booster);
  render();
});

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
    exchangeBoosterCredits: 0,
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
        Math.min(MAX_BOOSTERS_IN_INVENTORY, Number(parsed.boostersAvailable ?? parsed.availableBoosters ?? MAX_BOOSTERS_IN_INVENTORY))
      ),
      nextBoosterAt: parsed.nextBoosterAt ? Number(parsed.nextBoosterAt) : null,
      exchangeBoosterCredits: Number(parsed.exchangeBoosterCredits || 0),
      boosterUsesThisHour: 0
    };

    return normalizedState;
  } catch {
    return createEmptyState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function makeEmojiKey(emoji) {
  return `${emoji.name}-${emoji.symbol}`;
}

function getBoosterSignature(booster) {
  return booster.map((card) => `${card.symbol}:${card.rarity}`).join('|');
}

function getAvailableBoosters(now) {
  const available = Math.min(
    MAX_BOOSTERS_IN_INVENTORY,
    Math.max(0, (state.boostersAvailable || 0))
  );

  if (available < MAX_BOOSTERS_IN_INVENTORY && !state.nextBoosterAt) {
    state.nextBoosterAt = now + BOOSTER_COOLDOWN_MS;
  }

  while (
    (state.boostersAvailable || 0) < MAX_BOOSTERS_IN_INVENTORY &&
    (state.nextBoosterAt || 0) <= now
  ) {
    state.boostersAvailable = Math.min(
      MAX_BOOSTERS_IN_INVENTORY,
      (state.boostersAvailable || 0) + 1
    );
    state.nextBoosterAt += BOOSTER_COOLDOWN_MS;
  }

  if ((state.boostersAvailable || 0) >= MAX_BOOSTERS_IN_INVENTORY) {
    state.nextBoosterAt = null;
  }

  return Math.min(MAX_BOOSTERS_IN_INVENTORY, Math.max(0, (state.boostersAvailable || 0)));
}

function getRarityStyle(name) {
  return getRarityByName(name) || RARITY_CONFIG.find((item) => item.name === 'Commun') || RARITY_CONFIG[0];
}

function getDisplayName(emoji) {
  if (!emoji) {
    return '';
  }

  const translatedName = (emoji.name || '').toString().trim();
  if (translatedName) {
    return translatedName;
  }

  return (emoji.key || emoji.symbol || '').toString();
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
  nameEl.textContent = card.name;
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
  const available = Math.max(0, getAvailableBoosters(now));
  const canOpen = available > 0;

  openBoosterBtn.disabled = !canOpen;
  openBoosterBtn.textContent = canOpen ? `Ouvrir un booster (${available} dispo)` : 'Plus de boosters';

  const remaining = Math.max(0, (state.nextBoosterAt || now + BOOSTER_COOLDOWN_MS) - now);
  const hours = String(Math.floor(remaining / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');

  if (available >= MAX_BOOSTERS_IN_INVENTORY) {
    cooldownText.textContent = 'Disponible maintenant';
  } else if (remaining > 0) {
    cooldownText.textContent = `Prochain booster ${hours}:${minutes}:${seconds}`;
  } else {
    cooldownText.textContent = 'Disponible maintenant';
  }

  boostersAvailableText.textContent = String(available);
  const discovered = Object.values(state.collection).filter((entry) => (entry.count || 0) > 0).length;
  discoveredCount.textContent = `${discovered}/${EMOJI_LIBRARY.length}`;
  if (headerDiscoveredCount && headerTotalCount) {
    headerDiscoveredCount.textContent = discovered;
    headerTotalCount.textContent = EMOJI_LIBRARY.length;
  }
  boostersOpened.textContent = state.boostersOpened;

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

  const sampleEntries = EMOJI_LIBRARY.slice(0, 15).map((emoji) => {
    const entry = state.collection[makeEmojiKey(emoji)] || { count: 0 };
    return {
      ...emoji,
      count: entry.count || 0
    };
  });

  if (sampleEntries.length) {
    libraryList.innerHTML = '';
    sampleEntries.forEach((emoji) => {
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
        <span class="name">${card.name}</span>
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
