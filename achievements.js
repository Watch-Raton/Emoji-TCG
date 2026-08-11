const { EMOJI_LIBRARY: ACHIEVEMENT_EMOJI_LIBRARY = [] } = window.EmojiTCGData || {};

const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 'all-families',
    name: '🌿 Herbier des familles',
    description: 'Découvre au moins un émoji dans toutes les familles.',
    reward: 150,
    target: null
  },
  {
    id: 'booster-10',
    name: '🎁 Ouvre des boosters',
    description: 'Ouvre 10 boosters.',
    reward: 150,
    target: 10
  },
  {
    id: 'shop-buy-5',
    name: '🛍️ Petit acheteur',
    description: 'Achète 5 articles dans la boutique.',
    reward: 100,
    target: 5
  },
  {
    id: 'duplicates-5',
    name: '💰 Vendeur de doublons',
    description: 'Vends 5 doublons.',
    reward: 100,
    target: 5
  },
  {
    id: 'follow-twitch',
    name: '📺 Twitch addict',
    description: 'Follow la chaîne Twitch pour débloquer un fond d\'écran.',
    reward: 0,
    target: 1
  },
  {
    id: 'follow-instagram',
    name: '📸 Insta fan',
    description: 'Follow le compte Instagram.',
    reward: 250,
    target: 1
  },
  {
    id: 'shop-buy-20',
    name: '🛍️🛍️ Gros acheteur',
    description: 'Achète 20 articles dans la boutique.',
    reward: 350,
    target: 20
  },
  {
    id: 'duplicates-20',
    name: '💸 Marchand de doublons',
    description: 'Vends 20 doublons.',
    reward: 350,
    target: 20
  },
  {
    id: 'booster-50',
    name: '🎁🎁 Collectionneur assidu',
    description: 'Ouvre 50 boosters.',
    reward: 600,
    target: 50
  },
  {
    id: 'legendary-10',
    name: '⭐ Chasseur de légendes',
    description: 'Obtiens 10 émojis légendaires.',
    reward: 800,
    target: 10
  },
  {
    id: 'booster-100',
    name: '📦 Ouverture intensive',
    description: 'Ouvre 100 boosters.',
    reward: 1000,
    target: 100
  },
  {
    id: 'all-emojis',
    name: '🍯 Gourmand encyclopédique',
    description: 'Découvre tous les émojis du jeu.',
    reward: 1200,
    target: ACHIEVEMENT_EMOJI_LIBRARY.length
  },
  {
    id: 'shop-buy-50',
    name: '🛍️🛍️🛍️ Accro du shopping',
    description: 'Achète 50 articles dans la boutique.',
    reward: 1500,
    target: 50
  },
  {
    id: 'duplicates-50',
    name: '💎 Empereur des échanges',
    description: 'Vends 50 doublons.',
    reward: 1500,
    target: 50
  },
  {
    id: 'legendary-50',
    name: '✨ Légende vivante',
    description: 'Obtiens 50 émojis légendaires.',
    reward: 2000,
    target: 50
  },
  {
    id: 'booster-500',
    name: '🚀 Collection extrême',
    description: 'Ouvre 500 boosters.',
    reward: 2500,
    target: 500
  },
  {
    id: 'raccoon-hunter',
    name: '🦝 Raton laveur repéré',
    description: 'Trouve l\'émoji raton laveur dans ta collection.',
    reward: 3000,
    target: 1
  },
  {
    id: 'booster-10000',
    name: '🏆 Maître des boosters',
    description: 'Ouvre 10000 boosters.',
    reward: 10000,
    target: 10000
  }
];

function getFamilyKey(entry) {
  return (entry.family || entry.group || '').toString().trim().toLowerCase();
}

function getUniqueFamilyCount() {
  return new Set(ACHIEVEMENT_EMOJI_LIBRARY.map((emoji) => getFamilyKey(emoji))).size;
}

function getDiscoveredCount(state) {
  return Object.values(state.collection || {}).filter((entry) => (entry.count || 0) > 0).length;
}

function getDiscoveredFamilyCount(state) {
  return new Set(
    Object.values(state.collection || {})
      .filter((entry) => (entry.count || 0) > 0)
      .map((entry) => getFamilyKey(entry))
      .filter(Boolean)
  ).size;
}

function getLegendaryCount(state) {
  return Object.values(state.collection || {}).reduce((count, entry) => {
    const rarity = (entry.rarity || '').toString().toLowerCase();
    const obtained = Number(entry.count || 0);
    return count + ((rarity.includes('légendaire') || rarity === 'mythique') ? obtained : 0);
  }, 0);
}

function hasRaccoonEmoji(state) {
  return Object.values(state.collection || {}).some((entry) => {
    const symbol = (entry.symbol || '').toString();
    const name = (entry.name || '').toString().toLowerCase();
    return symbol === '🦝' || name.includes('raccoon') || name.includes('raton');
  });
}

function getAchievementProgress(definition, state) {
  switch (definition.id) {
    case 'booster-10':
    case 'booster-50':
    case 'booster-100':
    case 'booster-500':
    case 'booster-10000':
      return Number(state.boostersOpened || 0);
    case 'legendary-10':
    case 'legendary-50':
      return getLegendaryCount(state);
    case 'raccoon-hunter':
      return hasRaccoonEmoji(state) ? 1 : 0;
    case 'follow-twitch':
      return state.followedTwitch ? 1 : 0;
    case 'follow-instagram':
      return state.followedInstagram ? 1 : 0;
    case 'all-emojis':
      return getDiscoveredCount(state);
    case 'all-families':
      return getDiscoveredFamilyCount(state);
    case 'shop-buy-5':
    case 'shop-buy-20':
    case 'shop-buy-50':
      return Number(state.shopItemsPurchased || 0);
    case 'duplicates-5':
    case 'duplicates-20':
    case 'duplicates-50':
      return Number(state.duplicatesSold || 0);
    default:
      return 0;
  }
}

function getAchievementTarget(definition) {
  if (definition.id === 'all-families') {
    return getUniqueFamilyCount();
  }
  return definition.target;
}

function formatAchievementProgress(definition, state) {
  const current = getAchievementProgress(definition, state);
  const target = getAchievementTarget(definition);
  if (target === 1 && (definition.id.startsWith('follow-') || definition.id === 'raccoon-hunter')) {
    return current >= target ? 'Oui' : 'Non';
  }
  return `${Math.min(current, target)}/${target}`;
}
