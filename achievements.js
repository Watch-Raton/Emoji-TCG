const { EMOJI_LIBRARY: ACHIEVEMENT_EMOJI_LIBRARY = [] } = window.EmojiTCGData || {};

const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 'booster-10',
    name: 'Ouvre des boosters',
    description: 'Ouvre 10 boosters.',
    reward: 150,
    target: 10
  },
  {
    id: 'booster-50',
    name: 'Collectionneur assidu',
    description: 'Ouvre 50 boosters.',
    reward: 600,
    target: 50
  },
  {
    id: 'legendary-10',
    name: 'Chasseur de légendes',
    description: 'Obtiens 10 émojis légendaires.',
    reward: 800,
    target: 10
  },
  {
    id: 'raccoon-hunter',
    name: 'Raton laveur repéré',
    description: 'Trouve l’émoji raton laveur dans ta collection.',
    reward: 300,
    target: 1
  },
  {
    id: 'follow-twitch',
    name: 'Twitch addict',
    description: 'Follow la chaîne Twitch.',
    reward: 250,
    target: 1
  },
  {
    id: 'follow-instagram',
    name: 'Insta fan',
    description: 'Follow le compte Instagram.',
    reward: 250,
    target: 1
  },
  {
    id: 'all-emojis',
    name: 'Gourmand encyclopédique',
    description: 'Découvre tous les émojis du jeu.',
    reward: 1200,
    target: ACHIEVEMENT_EMOJI_LIBRARY.length
  },
  {
    id: 'all-families',
    name: 'Herbier des familles',
    description: 'Découvre au moins un émoji dans toutes les familles.',
    reward: 1200,
    target: null
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
      return Number(state.boostersOpened || 0);
    case 'legendary-10':
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
