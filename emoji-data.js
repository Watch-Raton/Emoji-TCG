(function (global) {
  const RARITY_CONFIG = [
    { id: 'common', name: 'Commun', rate: 70, color: '#60a5fa' },
    { id: 'uncommon', name: 'Peu commun', rate: 20, color: '#34d399' },
    { id: 'rare', name: 'Rare', rate: 7, color: '#a78bfa' },
    { id: 'epic', name: 'Épique', rate: 2.5, color: '#f59e0b' },
    { id: 'legendary', name: 'Légendaire', rate: 0.5, color: '#fb7185' }
  ];

  function getRarityForIndex(index, total) {
    const ratio = index / Math.max(1, total);
    if (ratio < 0.7) return RARITY_CONFIG[0];
    if (ratio < 0.9) return RARITY_CONFIG[1];
    if (ratio < 0.97) return RARITY_CONFIG[2];
    if (ratio < 0.995) return RARITY_CONFIG[3];
    return RARITY_CONFIG[4];
  }

  function getRarityByName(name) {
    const normalized = (name || '').toString().trim();
    return RARITY_CONFIG.find((item) => item.name.toLowerCase() === normalized.toLowerCase()) || RARITY_CONFIG[0];
  }

  function getRarityRank(name) {
    const ranks = {
      Légendaire: 0,
      Épique: 1,
      Rare: 2,
      'Peu commun': 3,
      Commun: 4
    };
    return ranks[name] ?? 5;
  }

  function buildEmojiLibrary() {
    const entries = [
      { symbol: '😀', name: 'Sourire', family: 'Émotions' },
      { symbol: '😎', name: 'Cool', family: 'Émotions' },
      { symbol: '�', name: 'Célébration', family: 'Émotions' },
      { symbol: '😇', name: 'Ange', family: 'Émotions' },
      { symbol: '🤓', name: 'Nerd', family: 'Émotions' },
      { symbol: '😴', name: 'Sommeil', family: 'Émotions' },
      { symbol: '🤖', name: 'Robot', family: 'Métier' },
      { symbol: '👩‍🔧', name: 'Technicienne', family: 'Métier' },
      { symbol: '👨‍🍳', name: 'Cuisinier', family: 'Métier' },
      { symbol: '🧑‍🏫', name: 'Enseignant', family: 'Métier' },
      { symbol: '🦊', name: 'Renard', family: 'Animaux' },
      { symbol: '🐉', name: 'Dragon', family: 'Animaux' },
      { symbol: '🐼', name: 'Panda', family: 'Animaux' },
      { symbol: '🦄', name: 'Licorne', family: 'Animaux' },
      { symbol: '🐠', name: 'Poisson', family: 'Animaux' },
      { symbol: '🦋', name: 'Papillon', family: 'Animaux' },
      { symbol: '🐢', name: 'Tortue', family: 'Animaux' },
      { symbol: '🦁', name: 'Lion', family: 'Animaux' },
      { symbol: '🌈', name: 'Arc-en-ciel', family: 'Nature' },
      { symbol: '🍀', name: 'Trèfle', family: 'Nature' },
      { symbol: '⚡', name: 'Éclair', family: 'Nature' },
      { symbol: '🌙', name: 'Lune', family: 'Nature' },
      { symbol: '☀️', name: 'Soleil', family: 'Nature' },
      { symbol: '🪐', name: 'Planète', family: 'Nature' },
      { symbol: '🌸', name: 'Fleur', family: 'Nature' },
      { symbol: '🌊', name: 'Océan', family: 'Nature' },
      { symbol: '🌲', name: 'Arbre', family: 'Nature' },
      { symbol: '🌧️', name: 'Pluie', family: 'Nature' },
      { symbol: '🍕', name: 'Pizza', family: 'Nourriture' },
      { symbol: '🧁', name: 'Cupcake', family: 'Nourriture' },
      { symbol: '🍣', name: 'Sushi', family: 'Nourriture' },
      { symbol: '🍰', name: 'Gâteau', family: 'Nourriture' },
      { symbol: '🍔', name: 'Burger', family: 'Nourriture' },
      { symbol: '🥐', name: 'Croissant', family: 'Nourriture' },
      { symbol: '☕', name: 'Café', family: 'Nourriture' },
      { symbol: '🚀', name: 'Fusée', family: 'Voyage' },
      { symbol: '✈️', name: 'Avion', family: 'Voyage' },
      { symbol: '🚗', name: 'Voiture', family: 'Voyage' },
      { symbol: '🚲', name: 'Vélo', family: 'Voyage' },
      { symbol: '🏖️', name: 'Plage', family: 'Voyage' },
      { symbol: '🎮', name: 'Manette', family: 'Loisirs' },
      { symbol: '🎵', name: 'Musique', family: 'Loisirs' },
      { symbol: '🎨', name: 'Art', family: 'Loisirs' },
      { symbol: '📚', name: 'Livre', family: 'Loisirs' },
      { symbol: '🎲', name: 'Jeu', family: 'Loisirs' },
      { symbol: '🎯', name: 'Cible', family: 'Objets' },
      { symbol: '💎', name: 'Diamant', family: 'Objets' },
      { symbol: '🛸', name: 'Soucoupe', family: 'Objets' },
      { symbol: '🧩', name: 'Puzzle', family: 'Objets' },
      { symbol: '🪄', name: 'Baguette', family: 'Objets' },
      { symbol: '🏰', name: 'Château', family: 'Objets' },
      { symbol: '🎈', name: 'Ballon', family: 'Objets' },
      { symbol: '💡', name: 'Ampoule', family: 'Objets' },
      { symbol: '🧸', name: 'Peluche', family: 'Objets' },
      { symbol: '🏀', name: 'Basket', family: 'Sport' },
      { symbol: '⚽', name: 'Football', family: 'Sport' },
      { symbol: '🎾', name: 'Tennis', family: 'Sport' },
      { symbol: '🏓', name: 'Ping-pong', family: 'Sport' },
      { symbol: '🎉', name: 'Confettis', family: 'Événements' },
      { symbol: '🎂', name: 'Gâteau d’anniversaire', family: 'Événements' },
      { symbol: '🎄', name: 'Noël', family: 'Événements' },
      { symbol: '🪅', name: 'Maraca', family: 'Événements' }
    ].map((emoji, index) => {
      const raritySequence = [
        'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun',
        'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun', 'Commun',
        'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun',
        'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun', 'Peu commun',
        'Rare', 'Rare', 'Rare', 'Rare', 'Rare', 'Rare', 'Rare', 'Rare',
        'Épique', 'Épique', 'Épique', 'Épique',
        'Légendaire'
      ];
      const rarityName = raritySequence[index] || 'Commun';
      const rarity = getRarityByName(rarityName);
      return {
        ...emoji,
        rarity,
        rate: rarity.rate
      };
    });

    return entries;
  }

  const EMOJI_LIBRARY = buildEmojiLibrary();

  global.EmojiTCGData = {
    RARITY_CONFIG,
    EMOJI_LIBRARY,
    getRarityByName,
    getRarityRank
  };
})(window);
