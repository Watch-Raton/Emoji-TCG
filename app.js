const STORAGE_KEY = 'emoji-tcg-save-v1';
const BOOSTER_COOLDOWN_MS = 60 * 60 * 1000;
const BOOSTERS_PER_HOUR = 3;
const BONUS_BOOSTER_ENABLED = false;

const { EMOJI_LIBRARY, RARITY_CONFIG: SHARED_RARITY_CONFIG, getRarityByName } = window.EmojiTCGData || { EMOJI_LIBRARY: [], RARITY_CONFIG: [] };
const RARITY_CONFIG = SHARED_RARITY_CONFIG.length ? SHARED_RARITY_CONFIG : [
  { name: 'Commun', weight: 70, color: '#60a5fa' },
  { name: 'Peu commun', weight: 20, color: '#34d399' },
  { name: 'Rare', weight: 7, color: '#a78bfa' },
  { name: 'Épique', weight: 2.5, color: '#f59e0b' },
  { name: 'Légendaire', weight: 0.5, color: '#fb7185' }
];

const EMOJI_POOL = [
  { symbol: '😀', name: 'Sourire' },
  { symbol: '😎', name: 'Cool' },
  { symbol: '🤖', name: 'Robot' },
  { symbol: '🦊', name: 'Renard' },
  { symbol: '🐉', name: 'Dragon' },
  { symbol: '🌈', name: 'Arc-en-ciel' },
  { symbol: '🍀', name: 'Trèfle' },
  { symbol: '⚡', name: 'Éclair' },
  { symbol: '🎮', name: 'Manette' },
  { symbol: '🎵', name: 'Musique' },
  { symbol: '🌙', name: 'Lune' },
  { symbol: '☀️', name: 'Soleil' },
  { symbol: '🪐', name: 'Planète' },
  { symbol: '🧠', name: 'Intelligence' },
  { symbol: '🦄', name: 'Licorne' },
  { symbol: '🐠', name: 'Poisson' },
  { symbol: '🌸', name: 'Fleur' },
  { symbol: '🍕', name: 'Pizza' },
  { symbol: '🚀', name: 'Fusée' },
  { symbol: '🧁', name: 'Cupcake' },
  { symbol: '🎯', name: 'Cible' },
  { symbol: '💎', name: 'Diamant' },
  { symbol: '🛸', name: 'Soucoupe' },
  { symbol: '🧩', name: 'Puzzle' },
  { symbol: '🪄', name: 'Baguette' },
  { symbol: '🏰', name: 'Château' },
  { symbol: '🌊', name: 'Océan' },
  { symbol: '🦋', name: 'Papillon' },
  { symbol: '🎈', name: 'Ballon' }
];

let state = loadState();
let displayedBoosterSignature = null;

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
    showToast('Tu as déjà utilisé tous tes boosters pour cette heure.');
    return;
  }

  const booster = createBooster();
  state.lastOpenedAt = now;
  state.boostersOpened += 1;
  state.lastBooster = booster;
  state.boosterUsesThisHour = (state.boosterUsesThisHour || 0) + 1;
  state.lastBoosterType = 'normal';
  state.lastBoosterSignature = getBoosterSignature(booster);

  for (const card of booster) {
    const entry = state.collection[card.key] || {
      key: card.key,
      symbol: card.symbol,
      name: card.name,
      count: 0,
      rarity: card.rarity
    };
    entry.count += 1;
    entry.rarity = card.rarity;
    state.collection[card.key] = entry;
  }

  saveState();
  await revealBooster(booster);
  render();
});

function createBooster() {
  return Array.from({ length: 10 }, () => {
    const rarity = pickWeightedRarity();
    const emoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
    return {
      key: makeEmojiKey(emoji),
      symbol: emoji.symbol,
      name: emoji.name,
      rarity: rarity.name
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
    boosterUsesThisHour: 0,
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
    return parsed && parsed.collection ? parsed : createEmptyState();
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
  const hourKey = Math.floor(now / BOOSTER_COOLDOWN_MS);
  if (state.lastResetHour !== hourKey) {
    state.lastResetHour = hourKey;
    state.boosterUsesThisHour = 0;
  }

  return BOOSTERS_PER_HOUR - (state.boosterUsesThisHour || 0);
}

function getRarityStyle(name) {
  return getRarityByName(name) || RARITY_CONFIG.find((item) => item.name === 'Commun') || RARITY_CONFIG[0];
}

function render() {
  const now = Date.now();
  const available = Math.max(0, getAvailableBoosters(now));
  const canOpen = available > 0;

  openBoosterBtn.disabled = !canOpen;
  openBoosterBtn.textContent = canOpen ? `Ouvrir un booster (${available} dispo)` : 'Plus de boosters';

  const remaining = Math.max(0, BOOSTER_COOLDOWN_MS - (now % BOOSTER_COOLDOWN_MS));
  const hours = String(Math.floor(remaining / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
  cooldownText.textContent = `${hours}:${minutes}:${seconds}`;

  boostersAvailableText.textContent = String(available);
  const discovered = Object.values(state.collection).filter((entry) => (entry.count || 0) > 0).length;
  discoveredCount.textContent = `${discovered}/${EMOJI_LIBRARY.length}`;
  if (headerDiscoveredCount && headerTotalCount) {
    headerDiscoveredCount.textContent = discovered;
    headerTotalCount.textContent = EMOJI_LIBRARY.length;
  }
  boostersOpened.textContent = state.boostersOpened;

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
          <span class="name">${card.name}</span>
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

  const collectionEntries = Object.values(state.collection).sort((a, b) => b.count - a.count);
  if (collectionEntries.length) {
    collectionList.innerHTML = '';
    collectionEntries.forEach((entry) => {
      const item = document.createElement('article');
      const rarityStyle = getRarityStyle(entry.rarity);
      item.className = 'collection-item';
      item.style.borderColor = `${rarityStyle.color}55`;
      item.style.boxShadow = `inset 0 0 0 1px ${rarityStyle.color}22`;
      item.innerHTML = `
        <div class="emoji-big">${entry.symbol}</div>
        <div class="meta">
          <span class="name">${entry.name}</span>
          <div class="count">
            <span>x${entry.count}</span>
            <span class="rarity-badge" style="background:${rarityStyle.color}22; color:${rarityStyle.color}; border-color:${rarityStyle.color}55;">${entry.rarity}</span>
          </div>
        </div>
      `;
      collectionList.appendChild(item);
    });
  } else {
    collectionList.innerHTML = '<div class="empty-state">Ta collection est vide. Ouvre un booster pour commencer.</div>';
  }

  const sampleEntries = EMOJI_LIBRARY.slice(0, 36).map((emoji) => {
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
          <span class="name">${emoji.name}</span>
          <span class="count">${emoji.count} obtenu${emoji.count > 1 ? 's' : ''} · <span style="color:${rarityStyle.color}; font-weight:700;">${emoji.rarity.name} · ${emoji.rarity.rate}%</span></span>
        </div>
      `;
      libraryList.appendChild(item);
    });
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
  boosterResults.innerHTML = '';
  for (let index = 0; index < booster.length; index += 1) {
    const card = booster[index];
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
    `;
    boosterResults.appendChild(item);
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
}

setInterval(() => {
  render();
}, 1000);

render();
