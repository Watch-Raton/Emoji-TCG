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
    id: 'shop-buy-10',
    name: '🛍️ Petit acheteur',
    description: 'Achète 10 articles dans la boutique.',
    reward: 150,
    target: 10
  },
  {
    id: 'duplicates-10',
    name: '💰 Vendeur de doublons',
    description: 'Vends 10 doublons.',
    reward: 150,
    target: 10
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
    id: 'shop-buy-100',
    name: '🛍️🛍️🛍️🛍️ Super acheteur',
    description: 'Achète 100 articles dans la boutique.',
    reward: 2000,
    target: 100
  },
  {
    id: 'shop-buy-1000',
    name: '🛍️🛍️🛍️🛍️🛍️ Accro suprême',
    description: 'Achète 1000 articles dans la boutique.',
    reward: 5000,
    target: 1000
  },
  {
    id: 'duplicates-50',
    name: '💎 Empereur des échanges',
    description: 'Vends 50 doublons.',
    reward: 1500,
    target: 50
  },
  {
    id: 'duplicates-100',
    name: '💎 Marchand légendaire',
    description: 'Vends 100 doublons.',
    reward: 2000,
    target: 100
  },
  {
    id: 'duplicates-1000',
    name: '💎 Roi des doublons',
    description: 'Vends 1000 doublons.',
    reward: 5000,
    target: 1000
  },
  {
    id: 'legendary-50',
    name: '✨ Légende vivante',
    description: 'Obtiens 50 émojis légendaires.',
    reward: 2000,
    target: 50
  },
  {
    id: 'coins-earned-100000',
    name: '💰 Fortune accumulée',
    description: 'Obtiens 100000 pièces depuis le début.',
    reward: 3000,
    target: 100000
  },
  {
    id: 'coins-spent-100000',
    name: '🏦 Grande dépense',
    description: 'Dépense 100000 pièces depuis le début.',
    reward: 3000,
    target: 100000
  },
  {
    id: 'cosmetics-100',
    name: '🎨 Collectionneur stylé',
    description: 'Obtient 100 cosmétiques.',
    reward: 2500,
    target: 100
  },
  {
    id: 'cosmetics-1000',
    name: '🌟 Maestro des styles',
    description: 'Obtient 1000 cosmétiques.',
    reward: 5000,
    target: 1000
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
    case 'shop-buy-10':
    case 'shop-buy-50':
    case 'shop-buy-100':
    case 'shop-buy-1000':
      return Number(state.shopItemsPurchased || 0);
    case 'duplicates-10':
    case 'duplicates-50':
    case 'duplicates-100':
    case 'duplicates-1000':
      return Number(state.duplicatesSold || 0);
    case 'coins-earned-100000':
      return Number(state.totalCoinsEarned || 0);
    case 'coins-spent-100000':
      return Number(state.totalCoinsSpent || 0);
    case 'cosmetics-100':
    case 'cosmetics-1000':
      return Number(state.totalCosmeticsObtained || 0);
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
  if (definition.id === 'raccoon-hunter') {
    return `${Math.min(current, target)}/${target}`;
  }
  if (target === 1 && definition.id.startsWith('follow-')) {
    return current >= target ? 'Oui' : 'Non';
  }
  return `${Math.min(current, target)}/${target}`;
}
