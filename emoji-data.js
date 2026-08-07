(function (global) {
  const RARITY_CONFIG = [
    { id: 'common', name: 'Commun', rate: 70, weight: 70, color: '#60a5fa' },
    { id: 'uncommon', name: 'Peu commun', rate: 20, weight: 20, color: '#34d399' },
    { id: 'rare', name: 'Rare', rate: 7, weight: 7, color: '#a78bfa' },
    { id: 'epic', name: 'Épique', rate: 2.5, weight: 2.5, color: '#f59e0b' },
    { id: 'legendary', name: 'Légendaire', rate: 0.5, weight: 0.5, color: '#fb7185' },
    { id: 'ultra-rare', name: 'Ultra rare', rate: 0.01, weight: 0.01, color: '#f43f5e' },
    { id: 'mythic', name: 'Mythique', rate: 0.1, weight: 0.1, color: '#8b5cf6' },
    { id: 'special', name: 'Légendaire Ultime', rate: 0.001, weight: 0.001, color: '#fbbf24' }
  ];

  function getRarityByName(name) {
    const normalized = (name || '').toString().trim();
    return RARITY_CONFIG.find((item) => item.name.toLowerCase() === normalized.toLowerCase()) || RARITY_CONFIG[0];
  }

  function getRarityRank(name) {
    const ranks = {
      'Légendaire Ultime': 0,
      Mythique: 1,
      'Ultra rare': 2,
      Légendaire: 3,
      Épique: 4,
      Rare: 5,
      'Peu commun': 6,
      Commun: 7
    };
    return ranks[name] ?? 6;
  }

  const SKIN_TONE_VARIANT_REGEX = /\bskin tone\b|light skin|medium-light|medium skin|medium-dark|dark skin/i;

  const RAW_EMOJI_ENTRIES = [
    {
        "symbol":  "😀",
        "name":  "grinning face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😃",
        "name":  "grinning face with big eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😄",
        "name":  "grinning face with smiling eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😁",
        "name":  "beaming face with smiling eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😆",
        "name":  "grinning squinting face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😅",
        "name":  "grinning face with sweat",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤣",
        "name":  "rolling on the floor laughing",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😂",
        "name":  "face with tears of joy",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙂",
        "name":  "slightly smiling face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙃",
        "name":  "upside-down face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🫠",
        "name":  "melting face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😉",
        "name":  "winking face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😊",
        "name":  "smiling face with smiling eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😇",
        "name":  "smiling face with halo",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-smiling",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥰",
        "name":  "smiling face with hearts",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😍",
        "name":  "smiling face with heart-eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤩",
        "name":  "star-struck",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😘",
        "name":  "face blowing a kiss",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😗",
        "name":  "kissing face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "☺️",
        "name":  "smiling face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😚",
        "name":  "kissing face with closed eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😙",
        "name":  "kissing face with smiling eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥲",
        "name":  "smiling face with tear",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-affection",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😋",
        "name":  "face savoring food",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-tongue",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😛",
        "name":  "face with tongue",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-tongue",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😜",
        "name":  "winking face with tongue",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-tongue",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤪",
        "name":  "zany face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-tongue",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😝",
        "name":  "squinting face with tongue",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-tongue",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤑",
        "name":  "money-mouth face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-tongue",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤗",
        "name":  "smiling face with open hands",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hand",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤭",
        "name":  "face with hand over mouth",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hand",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🫢",
        "name":  "face with open eyes and hand over mouth",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hand",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🫣",
        "name":  "face with peeking eye",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hand",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤫",
        "name":  "shushing face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hand",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤔",
        "name":  "thinking face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hand",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🫡",
        "name":  "saluting face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hand",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤐",
        "name":  "zipper-mouth face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤨",
        "name":  "face with raised eyebrow",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😐",
        "name":  "neutral face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😑",
        "name":  "expressionless face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😶",
        "name":  "face without mouth",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🫥",
        "name":  "dotted line face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😶‍🌫️",
        "name":  "face in clouds",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😏",
        "name":  "smirking face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😒",
        "name":  "unamused face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙄",
        "name":  "face with rolling eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😬",
        "name":  "grimacing face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😮‍💨",
        "name":  "face exhaling",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤥",
        "name":  "lying face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🫨",
        "name":  "shaking face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙂‍↔️",
        "name":  "head shaking horizontally",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙂‍↕️",
        "name":  "head shaking vertically",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-neutral-skeptical",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😌",
        "name":  "relieved face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-sleepy",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😔",
        "name":  "pensive face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-sleepy",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😪",
        "name":  "sleepy face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-sleepy",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤤",
        "name":  "drooling face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-sleepy",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😴",
        "name":  "sleeping face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-sleepy",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😷",
        "name":  "face with medical mask",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤒",
        "name":  "face with thermometer",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤕",
        "name":  "face with head-bandage",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤢",
        "name":  "nauseated face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤮",
        "name":  "face vomiting",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤧",
        "name":  "sneezing face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥵",
        "name":  "hot face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥶",
        "name":  "cold face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥴",
        "name":  "woozy face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😵",
        "name":  "face with crossed-out eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😵‍💫",
        "name":  "face with spiral eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤯",
        "name":  "exploding head",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-unwell",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤠",
        "name":  "cowboy hat face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hat",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥳",
        "name":  "partying face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hat",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥸",
        "name":  "disguised face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-hat",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😎",
        "name":  "smiling face with sunglasses",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-glasses",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤓",
        "name":  "nerd face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-glasses",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🧐",
        "name":  "face with monocle",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-glasses",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😕",
        "name":  "confused face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🫤",
        "name":  "face with diagonal mouth",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😟",
        "name":  "worried face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙁",
        "name":  "slightly frowning face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "☹️",
        "name":  "frowning face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😮",
        "name":  "face with open mouth",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😯",
        "name":  "hushed face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😲",
        "name":  "astonished face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😳",
        "name":  "flushed face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥺",
        "name":  "pleading face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥹",
        "name":  "face holding back tears",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😦",
        "name":  "frowning face with open mouth",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😧",
        "name":  "anguished face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😨",
        "name":  "fearful face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😰",
        "name":  "anxious face with sweat",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😥",
        "name":  "sad but relieved face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😢",
        "name":  "crying face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😭",
        "name":  "loudly crying face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😱",
        "name":  "face screaming in fear",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😖",
        "name":  "confounded face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😣",
        "name":  "persevering face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😞",
        "name":  "disappointed face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😓",
        "name":  "downcast face with sweat",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😩",
        "name":  "weary face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😫",
        "name":  "tired face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🥱",
        "name":  "yawning face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-concerned",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😤",
        "name":  "face with steam from nose",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-negative",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😡",
        "name":  "enraged face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-negative",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😠",
        "name":  "angry face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-negative",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤬",
        "name":  "face with symbols on mouth",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-negative",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😈",
        "name":  "smiling face with horns",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-negative",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "👿",
        "name":  "angry face with horns",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-negative",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💀",
        "name":  "skull",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-negative",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "☠️",
        "name":  "skull and crossbones",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-negative",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💩",
        "name":  "pile of poo",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-costume",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤡",
        "name":  "clown face",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-costume",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "👹",
        "name":  "ogre",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-costume",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "👺",
        "name":  "goblin",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-costume",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "👻",
        "name":  "ghost",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-costume",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "👽",
        "name":  "alien",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-costume",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "👾",
        "name":  "alien monster",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-costume",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤖",
        "name":  "robot",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "face-costume",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😺",
        "name":  "grinning cat",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😸",
        "name":  "grinning cat with smiling eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😹",
        "name":  "cat with tears of joy",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😻",
        "name":  "smiling cat with heart-eyes",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😼",
        "name":  "cat with wry smile",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😽",
        "name":  "kissing cat",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙀",
        "name":  "weary cat",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😿",
        "name":  "crying cat",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "😾",
        "name":  "pouting cat",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "cat-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙈",
        "name":  "see-no-evil monkey",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "monkey-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙉",
        "name":  "hear-no-evil monkey",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "monkey-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🙊",
        "name":  "speak-no-evil monkey",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "monkey-face",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💌",
        "name":  "love letter",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💘",
        "name":  "heart with arrow",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💝",
        "name":  "heart with ribbon",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💖",
        "name":  "sparkling heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💗",
        "name":  "growing heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💓",
        "name":  "beating heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💞",
        "name":  "revolving hearts",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💕",
        "name":  "two hearts",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💟",
        "name":  "heart decoration",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "❣️",
        "name":  "heart exclamation",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💔",
        "name":  "broken heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "❤️‍🔥",
        "name":  "heart on fire",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "❤️‍🩹",
        "name":  "mending heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "❤️",
        "name":  "red heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🩷",
        "name":  "pink heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🧡",
        "name":  "orange heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💛",
        "name":  "yellow heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💚",
        "name":  "green heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💙",
        "name":  "blue heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🩵",
        "name":  "light blue heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💜",
        "name":  "purple heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤎",
        "name":  "brown heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🖤",
        "name":  "black heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🩶",
        "name":  "grey heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🤍",
        "name":  "white heart",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "heart",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💋",
        "name":  "kiss mark",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💯",
        "name":  "hundred points",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💢",
        "name":  "anger symbol",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💥",
        "name":  "collision",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💫",
        "name":  "dizzy",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💦",
        "name":  "sweat droplets",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💨",
        "name":  "dashing away",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🕳️",
        "name":  "hole",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💬",
        "name":  "speech balloon",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "👁️‍🗨️",
        "name":  "eye in speech bubble",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🗨️",
        "name":  "left speech bubble",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "🗯️",
        "name":  "right anger bubble",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💭",
        "name":  "thought balloon",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "💤",
        "name":  "ZZZ",
        "group":  "Smileys \u0026 Emotion",
        "subgroup":  "emotion",
        "family":  "Smileys \u0026 Emotion"
    },
    {
        "symbol":  "👋",
        "name":  "waving hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👋🏻",
        "name":  "waving hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👋🏼",
        "name":  "waving hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👋🏽",
        "name":  "waving hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👋🏾",
        "name":  "waving hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👋🏿",
        "name":  "waving hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤚",
        "name":  "raised back of hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤚🏻",
        "name":  "raised back of hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤚🏼",
        "name":  "raised back of hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤚🏽",
        "name":  "raised back of hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤚🏾",
        "name":  "raised back of hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤚🏿",
        "name":  "raised back of hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖐️",
        "name":  "hand with fingers splayed",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖐🏻",
        "name":  "hand with fingers splayed: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖐🏼",
        "name":  "hand with fingers splayed: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖐🏽",
        "name":  "hand with fingers splayed: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖐🏾",
        "name":  "hand with fingers splayed: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖐🏿",
        "name":  "hand with fingers splayed: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✋",
        "name":  "raised hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✋🏻",
        "name":  "raised hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✋🏼",
        "name":  "raised hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✋🏽",
        "name":  "raised hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✋🏾",
        "name":  "raised hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✋🏿",
        "name":  "raised hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖖",
        "name":  "vulcan salute",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖖🏻",
        "name":  "vulcan salute: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖖🏼",
        "name":  "vulcan salute: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖖🏽",
        "name":  "vulcan salute: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖖🏾",
        "name":  "vulcan salute: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖖🏿",
        "name":  "vulcan salute: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱",
        "name":  "rightwards hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏻",
        "name":  "rightwards hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏼",
        "name":  "rightwards hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏽",
        "name":  "rightwards hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏾",
        "name":  "rightwards hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏿",
        "name":  "rightwards hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫲",
        "name":  "leftwards hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫲🏻",
        "name":  "leftwards hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫲🏼",
        "name":  "leftwards hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫲🏽",
        "name":  "leftwards hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫲🏾",
        "name":  "leftwards hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫲🏿",
        "name":  "leftwards hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫳",
        "name":  "palm down hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫳🏻",
        "name":  "palm down hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫳🏼",
        "name":  "palm down hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫳🏽",
        "name":  "palm down hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫳🏾",
        "name":  "palm down hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫳🏿",
        "name":  "palm down hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫴",
        "name":  "palm up hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫴🏻",
        "name":  "palm up hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫴🏼",
        "name":  "palm up hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫴🏽",
        "name":  "palm up hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫴🏾",
        "name":  "palm up hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫴🏿",
        "name":  "palm up hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫷",
        "name":  "leftwards pushing hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫷🏻",
        "name":  "leftwards pushing hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫷🏼",
        "name":  "leftwards pushing hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫷🏽",
        "name":  "leftwards pushing hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫷🏾",
        "name":  "leftwards pushing hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫷🏿",
        "name":  "leftwards pushing hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫸",
        "name":  "rightwards pushing hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫸🏻",
        "name":  "rightwards pushing hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫸🏼",
        "name":  "rightwards pushing hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫸🏽",
        "name":  "rightwards pushing hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫸🏾",
        "name":  "rightwards pushing hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫸🏿",
        "name":  "rightwards pushing hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-open",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👌",
        "name":  "OK hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👌🏻",
        "name":  "OK hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👌🏼",
        "name":  "OK hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👌🏽",
        "name":  "OK hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👌🏾",
        "name":  "OK hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👌🏿",
        "name":  "OK hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤌",
        "name":  "pinched fingers",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤌🏻",
        "name":  "pinched fingers: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤌🏼",
        "name":  "pinched fingers: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤌🏽",
        "name":  "pinched fingers: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤌🏾",
        "name":  "pinched fingers: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤌🏿",
        "name":  "pinched fingers: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤏",
        "name":  "pinching hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤏🏻",
        "name":  "pinching hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤏🏼",
        "name":  "pinching hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤏🏽",
        "name":  "pinching hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤏🏾",
        "name":  "pinching hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤏🏿",
        "name":  "pinching hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✌️",
        "name":  "victory hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✌🏻",
        "name":  "victory hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✌🏼",
        "name":  "victory hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✌🏽",
        "name":  "victory hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✌🏾",
        "name":  "victory hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✌🏿",
        "name":  "victory hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤞",
        "name":  "crossed fingers",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤞🏻",
        "name":  "crossed fingers: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤞🏼",
        "name":  "crossed fingers: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤞🏽",
        "name":  "crossed fingers: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤞🏾",
        "name":  "crossed fingers: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤞🏿",
        "name":  "crossed fingers: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫰",
        "name":  "hand with index finger and thumb crossed",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫰🏻",
        "name":  "hand with index finger and thumb crossed: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫰🏼",
        "name":  "hand with index finger and thumb crossed: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫰🏽",
        "name":  "hand with index finger and thumb crossed: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫰🏾",
        "name":  "hand with index finger and thumb crossed: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫰🏿",
        "name":  "hand with index finger and thumb crossed: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤟",
        "name":  "love-you gesture",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤟🏻",
        "name":  "love-you gesture: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤟🏼",
        "name":  "love-you gesture: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤟🏽",
        "name":  "love-you gesture: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤟🏾",
        "name":  "love-you gesture: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤟🏿",
        "name":  "love-you gesture: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤘",
        "name":  "sign of the horns",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤘🏻",
        "name":  "sign of the horns: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤘🏼",
        "name":  "sign of the horns: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤘🏽",
        "name":  "sign of the horns: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤘🏾",
        "name":  "sign of the horns: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤘🏿",
        "name":  "sign of the horns: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤙",
        "name":  "call me hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤙🏻",
        "name":  "call me hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤙🏼",
        "name":  "call me hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤙🏽",
        "name":  "call me hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤙🏾",
        "name":  "call me hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤙🏿",
        "name":  "call me hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-partial",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👈",
        "name":  "backhand index pointing left",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👈🏻",
        "name":  "backhand index pointing left: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👈🏼",
        "name":  "backhand index pointing left: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👈🏽",
        "name":  "backhand index pointing left: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👈🏾",
        "name":  "backhand index pointing left: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👈🏿",
        "name":  "backhand index pointing left: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👉",
        "name":  "backhand index pointing right",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👉🏻",
        "name":  "backhand index pointing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👉🏼",
        "name":  "backhand index pointing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👉🏽",
        "name":  "backhand index pointing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👉🏾",
        "name":  "backhand index pointing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👉🏿",
        "name":  "backhand index pointing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👆",
        "name":  "backhand index pointing up",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👆🏻",
        "name":  "backhand index pointing up: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👆🏼",
        "name":  "backhand index pointing up: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👆🏽",
        "name":  "backhand index pointing up: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👆🏾",
        "name":  "backhand index pointing up: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👆🏿",
        "name":  "backhand index pointing up: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖕",
        "name":  "middle finger",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖕🏻",
        "name":  "middle finger: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖕🏼",
        "name":  "middle finger: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖕🏽",
        "name":  "middle finger: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖕🏾",
        "name":  "middle finger: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🖕🏿",
        "name":  "middle finger: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👇",
        "name":  "backhand index pointing down",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👇🏻",
        "name":  "backhand index pointing down: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👇🏼",
        "name":  "backhand index pointing down: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👇🏽",
        "name":  "backhand index pointing down: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👇🏾",
        "name":  "backhand index pointing down: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👇🏿",
        "name":  "backhand index pointing down: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "☝️",
        "name":  "index pointing up",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "☝🏻",
        "name":  "index pointing up: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "☝🏼",
        "name":  "index pointing up: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "☝🏽",
        "name":  "index pointing up: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "☝🏾",
        "name":  "index pointing up: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "☝🏿",
        "name":  "index pointing up: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫵",
        "name":  "index pointing at the viewer",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫵🏻",
        "name":  "index pointing at the viewer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫵🏼",
        "name":  "index pointing at the viewer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫵🏽",
        "name":  "index pointing at the viewer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫵🏾",
        "name":  "index pointing at the viewer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫵🏿",
        "name":  "index pointing at the viewer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-single-finger",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👍",
        "name":  "thumbs up",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👍🏻",
        "name":  "thumbs up: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👍🏼",
        "name":  "thumbs up: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👍🏽",
        "name":  "thumbs up: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👍🏾",
        "name":  "thumbs up: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👍🏿",
        "name":  "thumbs up: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👎",
        "name":  "thumbs down",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👎🏻",
        "name":  "thumbs down: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👎🏼",
        "name":  "thumbs down: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👎🏽",
        "name":  "thumbs down: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👎🏾",
        "name":  "thumbs down: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👎🏿",
        "name":  "thumbs down: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✊",
        "name":  "raised fist",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✊🏻",
        "name":  "raised fist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✊🏼",
        "name":  "raised fist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✊🏽",
        "name":  "raised fist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✊🏾",
        "name":  "raised fist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✊🏿",
        "name":  "raised fist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👊",
        "name":  "oncoming fist",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👊🏻",
        "name":  "oncoming fist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👊🏼",
        "name":  "oncoming fist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👊🏽",
        "name":  "oncoming fist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👊🏾",
        "name":  "oncoming fist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👊🏿",
        "name":  "oncoming fist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤛",
        "name":  "left-facing fist",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤛🏻",
        "name":  "left-facing fist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤛🏼",
        "name":  "left-facing fist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤛🏽",
        "name":  "left-facing fist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤛🏾",
        "name":  "left-facing fist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤛🏿",
        "name":  "left-facing fist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤜",
        "name":  "right-facing fist",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤜🏻",
        "name":  "right-facing fist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤜🏼",
        "name":  "right-facing fist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤜🏽",
        "name":  "right-facing fist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤜🏾",
        "name":  "right-facing fist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤜🏿",
        "name":  "right-facing fist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-fingers-closed",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👏",
        "name":  "clapping hands",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👏🏻",
        "name":  "clapping hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👏🏼",
        "name":  "clapping hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👏🏽",
        "name":  "clapping hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👏🏾",
        "name":  "clapping hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👏🏿",
        "name":  "clapping hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙌",
        "name":  "raising hands",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙌🏻",
        "name":  "raising hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙌🏼",
        "name":  "raising hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙌🏽",
        "name":  "raising hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙌🏾",
        "name":  "raising hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙌🏿",
        "name":  "raising hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫶",
        "name":  "heart hands",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫶🏻",
        "name":  "heart hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫶🏼",
        "name":  "heart hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫶🏽",
        "name":  "heart hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫶🏾",
        "name":  "heart hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫶🏿",
        "name":  "heart hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👐",
        "name":  "open hands",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👐🏻",
        "name":  "open hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👐🏼",
        "name":  "open hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👐🏽",
        "name":  "open hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👐🏾",
        "name":  "open hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👐🏿",
        "name":  "open hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤲",
        "name":  "palms up together",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤲🏻",
        "name":  "palms up together: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤲🏼",
        "name":  "palms up together: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤲🏽",
        "name":  "palms up together: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤲🏾",
        "name":  "palms up together: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤲🏿",
        "name":  "palms up together: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤝",
        "name":  "handshake",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤝🏻",
        "name":  "handshake: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤝🏼",
        "name":  "handshake: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤝🏽",
        "name":  "handshake: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤝🏾",
        "name":  "handshake: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤝🏿",
        "name":  "handshake: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏻‍🫲🏼",
        "name":  "handshake: light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏻‍🫲🏽",
        "name":  "handshake: light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏻‍🫲🏾",
        "name":  "handshake: light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏻‍🫲🏿",
        "name":  "handshake: light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏼‍🫲🏻",
        "name":  "handshake: medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏼‍🫲🏽",
        "name":  "handshake: medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏼‍🫲🏾",
        "name":  "handshake: medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏼‍🫲🏿",
        "name":  "handshake: medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏽‍🫲🏻",
        "name":  "handshake: medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏽‍🫲🏼",
        "name":  "handshake: medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏽‍🫲🏾",
        "name":  "handshake: medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏽‍🫲🏿",
        "name":  "handshake: medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏾‍🫲🏻",
        "name":  "handshake: medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏾‍🫲🏼",
        "name":  "handshake: medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏾‍🫲🏽",
        "name":  "handshake: medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏾‍🫲🏿",
        "name":  "handshake: medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏿‍🫲🏻",
        "name":  "handshake: dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏿‍🫲🏼",
        "name":  "handshake: dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏿‍🫲🏽",
        "name":  "handshake: dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫱🏿‍🫲🏾",
        "name":  "handshake: dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙏",
        "name":  "folded hands",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙏🏻",
        "name":  "folded hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙏🏼",
        "name":  "folded hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙏🏽",
        "name":  "folded hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙏🏾",
        "name":  "folded hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙏🏿",
        "name":  "folded hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hands",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✍️",
        "name":  "writing hand",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✍🏻",
        "name":  "writing hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✍🏼",
        "name":  "writing hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✍🏽",
        "name":  "writing hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✍🏾",
        "name":  "writing hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "✍🏿",
        "name":  "writing hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💅",
        "name":  "nail polish",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💅🏻",
        "name":  "nail polish: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💅🏼",
        "name":  "nail polish: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💅🏽",
        "name":  "nail polish: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💅🏾",
        "name":  "nail polish: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💅🏿",
        "name":  "nail polish: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤳",
        "name":  "selfie",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤳🏻",
        "name":  "selfie: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤳🏼",
        "name":  "selfie: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤳🏽",
        "name":  "selfie: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤳🏾",
        "name":  "selfie: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤳🏿",
        "name":  "selfie: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "hand-prop",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💪",
        "name":  "flexed biceps",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💪🏻",
        "name":  "flexed biceps: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💪🏼",
        "name":  "flexed biceps: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💪🏽",
        "name":  "flexed biceps: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💪🏾",
        "name":  "flexed biceps: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💪🏿",
        "name":  "flexed biceps: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦾",
        "name":  "mechanical arm",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦿",
        "name":  "mechanical leg",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦵",
        "name":  "leg",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦵🏻",
        "name":  "leg: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦵🏼",
        "name":  "leg: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦵🏽",
        "name":  "leg: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦵🏾",
        "name":  "leg: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦵🏿",
        "name":  "leg: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦶",
        "name":  "foot",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦶🏻",
        "name":  "foot: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦶🏼",
        "name":  "foot: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦶🏽",
        "name":  "foot: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦶🏾",
        "name":  "foot: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦶🏿",
        "name":  "foot: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👂",
        "name":  "ear",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👂🏻",
        "name":  "ear: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👂🏼",
        "name":  "ear: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👂🏽",
        "name":  "ear: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👂🏾",
        "name":  "ear: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👂🏿",
        "name":  "ear: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦻",
        "name":  "ear with hearing aid",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦻🏻",
        "name":  "ear with hearing aid: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦻🏼",
        "name":  "ear with hearing aid: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦻🏽",
        "name":  "ear with hearing aid: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦻🏾",
        "name":  "ear with hearing aid: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦻🏿",
        "name":  "ear with hearing aid: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👃",
        "name":  "nose",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👃🏻",
        "name":  "nose: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👃🏼",
        "name":  "nose: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👃🏽",
        "name":  "nose: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👃🏾",
        "name":  "nose: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👃🏿",
        "name":  "nose: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧠",
        "name":  "brain",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫀",
        "name":  "anatomical heart",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫁",
        "name":  "lungs",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦷",
        "name":  "tooth",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦴",
        "name":  "bone",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👀",
        "name":  "eyes",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👁️",
        "name":  "eye",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👅",
        "name":  "tongue",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👄",
        "name":  "mouth",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫦",
        "name":  "biting lip",
        "group":  "People \u0026 Body",
        "subgroup":  "body-parts",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👶",
        "name":  "baby",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👶🏻",
        "name":  "baby: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👶🏼",
        "name":  "baby: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👶🏽",
        "name":  "baby: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👶🏾",
        "name":  "baby: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👶🏿",
        "name":  "baby: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧒",
        "name":  "child",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧒🏻",
        "name":  "child: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧒🏼",
        "name":  "child: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧒🏽",
        "name":  "child: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧒🏾",
        "name":  "child: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧒🏿",
        "name":  "child: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👦",
        "name":  "boy",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👦🏻",
        "name":  "boy: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👦🏼",
        "name":  "boy: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👦🏽",
        "name":  "boy: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👦🏾",
        "name":  "boy: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👦🏿",
        "name":  "boy: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👧",
        "name":  "girl",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👧🏻",
        "name":  "girl: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👧🏼",
        "name":  "girl: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👧🏽",
        "name":  "girl: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👧🏾",
        "name":  "girl: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👧🏿",
        "name":  "girl: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑",
        "name":  "person",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻",
        "name":  "person: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼",
        "name":  "person: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽",
        "name":  "person: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾",
        "name":  "person: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿",
        "name":  "person: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱",
        "name":  "person: blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏻",
        "name":  "person: light skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏼",
        "name":  "person: medium-light skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏽",
        "name":  "person: medium skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏾",
        "name":  "person: medium-dark skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏿",
        "name":  "person: dark skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨",
        "name":  "man",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻",
        "name":  "man: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼",
        "name":  "man: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽",
        "name":  "man: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾",
        "name":  "man: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿",
        "name":  "man: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔",
        "name":  "person: beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏻",
        "name":  "person: light skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏼",
        "name":  "person: medium-light skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏽",
        "name":  "person: medium skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏾",
        "name":  "person: medium-dark skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏿",
        "name":  "person: dark skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔‍♂️",
        "name":  "man: beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏻‍♂️",
        "name":  "man: light skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏼‍♂️",
        "name":  "man: medium-light skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏽‍♂️",
        "name":  "man: medium skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏾‍♂️",
        "name":  "man: medium-dark skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏿‍♂️",
        "name":  "man: dark skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔‍♀️",
        "name":  "woman: beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏻‍♀️",
        "name":  "woman: light skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏼‍♀️",
        "name":  "woman: medium-light skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏽‍♀️",
        "name":  "woman: medium skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏾‍♀️",
        "name":  "woman: medium-dark skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧔🏿‍♀️",
        "name":  "woman: dark skin tone, beard",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦰",
        "name":  "man: red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦰",
        "name":  "man: light skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦰",
        "name":  "man: medium-light skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦰",
        "name":  "man: medium skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦰",
        "name":  "man: medium-dark skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦰",
        "name":  "man: dark skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦱",
        "name":  "man: curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦱",
        "name":  "man: light skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦱",
        "name":  "man: medium-light skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦱",
        "name":  "man: medium skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦱",
        "name":  "man: medium-dark skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦱",
        "name":  "man: dark skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦳",
        "name":  "man: white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦳",
        "name":  "man: light skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦳",
        "name":  "man: medium-light skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦳",
        "name":  "man: medium skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦳",
        "name":  "man: medium-dark skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦳",
        "name":  "man: dark skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦲",
        "name":  "man: bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦲",
        "name":  "man: light skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦲",
        "name":  "man: medium-light skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦲",
        "name":  "man: medium skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦲",
        "name":  "man: medium-dark skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦲",
        "name":  "man: dark skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩",
        "name":  "woman",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻",
        "name":  "woman: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼",
        "name":  "woman: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽",
        "name":  "woman: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾",
        "name":  "woman: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿",
        "name":  "woman: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦰",
        "name":  "woman: red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦰",
        "name":  "woman: light skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦰",
        "name":  "woman: medium-light skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦰",
        "name":  "woman: medium skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦰",
        "name":  "woman: medium-dark skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦰",
        "name":  "woman: dark skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦰",
        "name":  "person: red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦰",
        "name":  "person: light skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦰",
        "name":  "person: medium-light skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦰",
        "name":  "person: medium skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦰",
        "name":  "person: medium-dark skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦰",
        "name":  "person: dark skin tone, red hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦱",
        "name":  "woman: curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦱",
        "name":  "woman: light skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦱",
        "name":  "woman: medium-light skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦱",
        "name":  "woman: medium skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦱",
        "name":  "woman: medium-dark skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦱",
        "name":  "woman: dark skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦱",
        "name":  "person: curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦱",
        "name":  "person: light skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦱",
        "name":  "person: medium-light skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦱",
        "name":  "person: medium skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦱",
        "name":  "person: medium-dark skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦱",
        "name":  "person: dark skin tone, curly hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦳",
        "name":  "woman: white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦳",
        "name":  "woman: light skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦳",
        "name":  "woman: medium-light skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦳",
        "name":  "woman: medium skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦳",
        "name":  "woman: medium-dark skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦳",
        "name":  "woman: dark skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦳",
        "name":  "person: white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦳",
        "name":  "person: light skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦳",
        "name":  "person: medium-light skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦳",
        "name":  "person: medium skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦳",
        "name":  "person: medium-dark skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦳",
        "name":  "person: dark skin tone, white hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦲",
        "name":  "woman: bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦲",
        "name":  "woman: light skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦲",
        "name":  "woman: medium-light skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦲",
        "name":  "woman: medium skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦲",
        "name":  "woman: medium-dark skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦲",
        "name":  "woman: dark skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦲",
        "name":  "person: bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦲",
        "name":  "person: light skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦲",
        "name":  "person: medium-light skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦲",
        "name":  "person: medium skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦲",
        "name":  "person: medium-dark skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦲",
        "name":  "person: dark skin tone, bald",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱‍♀️",
        "name":  "woman: blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏻‍♀️",
        "name":  "woman: light skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏼‍♀️",
        "name":  "woman: medium-light skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏽‍♀️",
        "name":  "woman: medium skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏾‍♀️",
        "name":  "woman: medium-dark skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏿‍♀️",
        "name":  "woman: dark skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱‍♂️",
        "name":  "man: blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏻‍♂️",
        "name":  "man: light skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏼‍♂️",
        "name":  "man: medium-light skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏽‍♂️",
        "name":  "man: medium skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏾‍♂️",
        "name":  "man: medium-dark skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👱🏿‍♂️",
        "name":  "man: dark skin tone, blond hair",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧓",
        "name":  "older person",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧓🏻",
        "name":  "older person: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧓🏼",
        "name":  "older person: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧓🏽",
        "name":  "older person: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧓🏾",
        "name":  "older person: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧓🏿",
        "name":  "older person: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👴",
        "name":  "old man",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👴🏻",
        "name":  "old man: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👴🏼",
        "name":  "old man: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👴🏽",
        "name":  "old man: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👴🏾",
        "name":  "old man: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👴🏿",
        "name":  "old man: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👵",
        "name":  "old woman",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👵🏻",
        "name":  "old woman: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👵🏼",
        "name":  "old woman: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👵🏽",
        "name":  "old woman: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👵🏾",
        "name":  "old woman: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👵🏿",
        "name":  "old woman: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍",
        "name":  "person frowning",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏻",
        "name":  "person frowning: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏼",
        "name":  "person frowning: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏽",
        "name":  "person frowning: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏾",
        "name":  "person frowning: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏿",
        "name":  "person frowning: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍‍♂️",
        "name":  "man frowning",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏻‍♂️",
        "name":  "man frowning: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏼‍♂️",
        "name":  "man frowning: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏽‍♂️",
        "name":  "man frowning: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏾‍♂️",
        "name":  "man frowning: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏿‍♂️",
        "name":  "man frowning: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍‍♀️",
        "name":  "woman frowning",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏻‍♀️",
        "name":  "woman frowning: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏼‍♀️",
        "name":  "woman frowning: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏽‍♀️",
        "name":  "woman frowning: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏾‍♀️",
        "name":  "woman frowning: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙍🏿‍♀️",
        "name":  "woman frowning: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎",
        "name":  "person pouting",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏻",
        "name":  "person pouting: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏼",
        "name":  "person pouting: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏽",
        "name":  "person pouting: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏾",
        "name":  "person pouting: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏿",
        "name":  "person pouting: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎‍♂️",
        "name":  "man pouting",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏻‍♂️",
        "name":  "man pouting: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏼‍♂️",
        "name":  "man pouting: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏽‍♂️",
        "name":  "man pouting: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏾‍♂️",
        "name":  "man pouting: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏿‍♂️",
        "name":  "man pouting: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎‍♀️",
        "name":  "woman pouting",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏻‍♀️",
        "name":  "woman pouting: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏼‍♀️",
        "name":  "woman pouting: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏽‍♀️",
        "name":  "woman pouting: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏾‍♀️",
        "name":  "woman pouting: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙎🏿‍♀️",
        "name":  "woman pouting: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅",
        "name":  "person gesturing NO",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏻",
        "name":  "person gesturing NO: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏼",
        "name":  "person gesturing NO: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏽",
        "name":  "person gesturing NO: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏾",
        "name":  "person gesturing NO: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏿",
        "name":  "person gesturing NO: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅‍♂️",
        "name":  "man gesturing NO",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏻‍♂️",
        "name":  "man gesturing NO: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏼‍♂️",
        "name":  "man gesturing NO: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏽‍♂️",
        "name":  "man gesturing NO: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏾‍♂️",
        "name":  "man gesturing NO: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏿‍♂️",
        "name":  "man gesturing NO: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅‍♀️",
        "name":  "woman gesturing NO",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏻‍♀️",
        "name":  "woman gesturing NO: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏼‍♀️",
        "name":  "woman gesturing NO: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏽‍♀️",
        "name":  "woman gesturing NO: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏾‍♀️",
        "name":  "woman gesturing NO: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙅🏿‍♀️",
        "name":  "woman gesturing NO: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆",
        "name":  "person gesturing OK",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏻",
        "name":  "person gesturing OK: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏼",
        "name":  "person gesturing OK: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏽",
        "name":  "person gesturing OK: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏾",
        "name":  "person gesturing OK: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏿",
        "name":  "person gesturing OK: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆‍♂️",
        "name":  "man gesturing OK",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏻‍♂️",
        "name":  "man gesturing OK: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏼‍♂️",
        "name":  "man gesturing OK: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏽‍♂️",
        "name":  "man gesturing OK: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏾‍♂️",
        "name":  "man gesturing OK: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏿‍♂️",
        "name":  "man gesturing OK: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆‍♀️",
        "name":  "woman gesturing OK",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏻‍♀️",
        "name":  "woman gesturing OK: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏼‍♀️",
        "name":  "woman gesturing OK: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏽‍♀️",
        "name":  "woman gesturing OK: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏾‍♀️",
        "name":  "woman gesturing OK: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙆🏿‍♀️",
        "name":  "woman gesturing OK: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁",
        "name":  "person tipping hand",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏻",
        "name":  "person tipping hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏼",
        "name":  "person tipping hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏽",
        "name":  "person tipping hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏾",
        "name":  "person tipping hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏿",
        "name":  "person tipping hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁‍♂️",
        "name":  "man tipping hand",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏻‍♂️",
        "name":  "man tipping hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏼‍♂️",
        "name":  "man tipping hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏽‍♂️",
        "name":  "man tipping hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏾‍♂️",
        "name":  "man tipping hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏿‍♂️",
        "name":  "man tipping hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁‍♀️",
        "name":  "woman tipping hand",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏻‍♀️",
        "name":  "woman tipping hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏼‍♀️",
        "name":  "woman tipping hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏽‍♀️",
        "name":  "woman tipping hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏾‍♀️",
        "name":  "woman tipping hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💁🏿‍♀️",
        "name":  "woman tipping hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋",
        "name":  "person raising hand",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏻",
        "name":  "person raising hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏼",
        "name":  "person raising hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏽",
        "name":  "person raising hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏾",
        "name":  "person raising hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏿",
        "name":  "person raising hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋‍♂️",
        "name":  "man raising hand",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏻‍♂️",
        "name":  "man raising hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏼‍♂️",
        "name":  "man raising hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏽‍♂️",
        "name":  "man raising hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏾‍♂️",
        "name":  "man raising hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏿‍♂️",
        "name":  "man raising hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋‍♀️",
        "name":  "woman raising hand",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏻‍♀️",
        "name":  "woman raising hand: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏼‍♀️",
        "name":  "woman raising hand: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏽‍♀️",
        "name":  "woman raising hand: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏾‍♀️",
        "name":  "woman raising hand: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙋🏿‍♀️",
        "name":  "woman raising hand: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏",
        "name":  "deaf person",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏻",
        "name":  "deaf person: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏼",
        "name":  "deaf person: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏽",
        "name":  "deaf person: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏾",
        "name":  "deaf person: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏿",
        "name":  "deaf person: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏‍♂️",
        "name":  "deaf man",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏻‍♂️",
        "name":  "deaf man: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏼‍♂️",
        "name":  "deaf man: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏽‍♂️",
        "name":  "deaf man: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏾‍♂️",
        "name":  "deaf man: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏿‍♂️",
        "name":  "deaf man: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏‍♀️",
        "name":  "deaf woman",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏻‍♀️",
        "name":  "deaf woman: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏼‍♀️",
        "name":  "deaf woman: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏽‍♀️",
        "name":  "deaf woman: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏾‍♀️",
        "name":  "deaf woman: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧏🏿‍♀️",
        "name":  "deaf woman: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇",
        "name":  "person bowing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏻",
        "name":  "person bowing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏼",
        "name":  "person bowing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏽",
        "name":  "person bowing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏾",
        "name":  "person bowing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏿",
        "name":  "person bowing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇‍♂️",
        "name":  "man bowing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏻‍♂️",
        "name":  "man bowing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏼‍♂️",
        "name":  "man bowing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏽‍♂️",
        "name":  "man bowing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏾‍♂️",
        "name":  "man bowing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏿‍♂️",
        "name":  "man bowing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇‍♀️",
        "name":  "woman bowing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏻‍♀️",
        "name":  "woman bowing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏼‍♀️",
        "name":  "woman bowing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏽‍♀️",
        "name":  "woman bowing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏾‍♀️",
        "name":  "woman bowing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🙇🏿‍♀️",
        "name":  "woman bowing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦",
        "name":  "person facepalming",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏻",
        "name":  "person facepalming: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏼",
        "name":  "person facepalming: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏽",
        "name":  "person facepalming: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏾",
        "name":  "person facepalming: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏿",
        "name":  "person facepalming: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦‍♂️",
        "name":  "man facepalming",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏻‍♂️",
        "name":  "man facepalming: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏼‍♂️",
        "name":  "man facepalming: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏽‍♂️",
        "name":  "man facepalming: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏾‍♂️",
        "name":  "man facepalming: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏿‍♂️",
        "name":  "man facepalming: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦‍♀️",
        "name":  "woman facepalming",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏻‍♀️",
        "name":  "woman facepalming: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏼‍♀️",
        "name":  "woman facepalming: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏽‍♀️",
        "name":  "woman facepalming: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏾‍♀️",
        "name":  "woman facepalming: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤦🏿‍♀️",
        "name":  "woman facepalming: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷",
        "name":  "person shrugging",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏻",
        "name":  "person shrugging: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏼",
        "name":  "person shrugging: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏽",
        "name":  "person shrugging: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏾",
        "name":  "person shrugging: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏿",
        "name":  "person shrugging: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷‍♂️",
        "name":  "man shrugging",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏻‍♂️",
        "name":  "man shrugging: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏼‍♂️",
        "name":  "man shrugging: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏽‍♂️",
        "name":  "man shrugging: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏾‍♂️",
        "name":  "man shrugging: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏿‍♂️",
        "name":  "man shrugging: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷‍♀️",
        "name":  "woman shrugging",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏻‍♀️",
        "name":  "woman shrugging: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏼‍♀️",
        "name":  "woman shrugging: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏽‍♀️",
        "name":  "woman shrugging: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏾‍♀️",
        "name":  "woman shrugging: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤷🏿‍♀️",
        "name":  "woman shrugging: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-gesture",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍⚕️",
        "name":  "health worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍⚕️",
        "name":  "health worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍⚕️",
        "name":  "health worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍⚕️",
        "name":  "health worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍⚕️",
        "name":  "health worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍⚕️",
        "name":  "health worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍⚕️",
        "name":  "man health worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍⚕️",
        "name":  "man health worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍⚕️",
        "name":  "man health worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍⚕️",
        "name":  "man health worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍⚕️",
        "name":  "man health worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍⚕️",
        "name":  "man health worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍⚕️",
        "name":  "woman health worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍⚕️",
        "name":  "woman health worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍⚕️",
        "name":  "woman health worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍⚕️",
        "name":  "woman health worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍⚕️",
        "name":  "woman health worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍⚕️",
        "name":  "woman health worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🎓",
        "name":  "student",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🎓",
        "name":  "student: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🎓",
        "name":  "student: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🎓",
        "name":  "student: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🎓",
        "name":  "student: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🎓",
        "name":  "student: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🎓",
        "name":  "man student",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🎓",
        "name":  "man student: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🎓",
        "name":  "man student: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🎓",
        "name":  "man student: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🎓",
        "name":  "man student: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🎓",
        "name":  "man student: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🎓",
        "name":  "woman student",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🎓",
        "name":  "woman student: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🎓",
        "name":  "woman student: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🎓",
        "name":  "woman student: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🎓",
        "name":  "woman student: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🎓",
        "name":  "woman student: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🏫",
        "name":  "teacher",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🏫",
        "name":  "teacher: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🏫",
        "name":  "teacher: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🏫",
        "name":  "teacher: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🏫",
        "name":  "teacher: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🏫",
        "name":  "teacher: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🏫",
        "name":  "man teacher",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🏫",
        "name":  "man teacher: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🏫",
        "name":  "man teacher: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🏫",
        "name":  "man teacher: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🏫",
        "name":  "man teacher: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🏫",
        "name":  "man teacher: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🏫",
        "name":  "woman teacher",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🏫",
        "name":  "woman teacher: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🏫",
        "name":  "woman teacher: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🏫",
        "name":  "woman teacher: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🏫",
        "name":  "woman teacher: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🏫",
        "name":  "woman teacher: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍⚖️",
        "name":  "judge",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍⚖️",
        "name":  "judge: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍⚖️",
        "name":  "judge: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍⚖️",
        "name":  "judge: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍⚖️",
        "name":  "judge: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍⚖️",
        "name":  "judge: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍⚖️",
        "name":  "man judge",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍⚖️",
        "name":  "man judge: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍⚖️",
        "name":  "man judge: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍⚖️",
        "name":  "man judge: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍⚖️",
        "name":  "man judge: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍⚖️",
        "name":  "man judge: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍⚖️",
        "name":  "woman judge",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍⚖️",
        "name":  "woman judge: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍⚖️",
        "name":  "woman judge: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍⚖️",
        "name":  "woman judge: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍⚖️",
        "name":  "woman judge: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍⚖️",
        "name":  "woman judge: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🌾",
        "name":  "farmer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🌾",
        "name":  "farmer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🌾",
        "name":  "farmer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🌾",
        "name":  "farmer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🌾",
        "name":  "farmer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🌾",
        "name":  "farmer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🌾",
        "name":  "man farmer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🌾",
        "name":  "man farmer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🌾",
        "name":  "man farmer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🌾",
        "name":  "man farmer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🌾",
        "name":  "man farmer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🌾",
        "name":  "man farmer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🌾",
        "name":  "woman farmer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🌾",
        "name":  "woman farmer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🌾",
        "name":  "woman farmer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🌾",
        "name":  "woman farmer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🌾",
        "name":  "woman farmer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🌾",
        "name":  "woman farmer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🍳",
        "name":  "cook",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🍳",
        "name":  "cook: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🍳",
        "name":  "cook: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🍳",
        "name":  "cook: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🍳",
        "name":  "cook: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🍳",
        "name":  "cook: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🍳",
        "name":  "man cook",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🍳",
        "name":  "man cook: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🍳",
        "name":  "man cook: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🍳",
        "name":  "man cook: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🍳",
        "name":  "man cook: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🍳",
        "name":  "man cook: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🍳",
        "name":  "woman cook",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🍳",
        "name":  "woman cook: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🍳",
        "name":  "woman cook: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🍳",
        "name":  "woman cook: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🍳",
        "name":  "woman cook: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🍳",
        "name":  "woman cook: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🔧",
        "name":  "mechanic",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🔧",
        "name":  "mechanic: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🔧",
        "name":  "mechanic: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🔧",
        "name":  "mechanic: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🔧",
        "name":  "mechanic: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🔧",
        "name":  "mechanic: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🔧",
        "name":  "man mechanic",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🔧",
        "name":  "man mechanic: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🔧",
        "name":  "man mechanic: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🔧",
        "name":  "man mechanic: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🔧",
        "name":  "man mechanic: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🔧",
        "name":  "man mechanic: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🔧",
        "name":  "woman mechanic",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🔧",
        "name":  "woman mechanic: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🔧",
        "name":  "woman mechanic: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🔧",
        "name":  "woman mechanic: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🔧",
        "name":  "woman mechanic: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🔧",
        "name":  "woman mechanic: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🏭",
        "name":  "factory worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🏭",
        "name":  "factory worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🏭",
        "name":  "factory worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🏭",
        "name":  "factory worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🏭",
        "name":  "factory worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🏭",
        "name":  "factory worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🏭",
        "name":  "man factory worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🏭",
        "name":  "man factory worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🏭",
        "name":  "man factory worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🏭",
        "name":  "man factory worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🏭",
        "name":  "man factory worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🏭",
        "name":  "man factory worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🏭",
        "name":  "woman factory worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🏭",
        "name":  "woman factory worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🏭",
        "name":  "woman factory worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🏭",
        "name":  "woman factory worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🏭",
        "name":  "woman factory worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🏭",
        "name":  "woman factory worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍💼",
        "name":  "office worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍💼",
        "name":  "office worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍💼",
        "name":  "office worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍💼",
        "name":  "office worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍💼",
        "name":  "office worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍💼",
        "name":  "office worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍💼",
        "name":  "man office worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍💼",
        "name":  "man office worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍💼",
        "name":  "man office worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍💼",
        "name":  "man office worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍💼",
        "name":  "man office worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍💼",
        "name":  "man office worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍💼",
        "name":  "woman office worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍💼",
        "name":  "woman office worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍💼",
        "name":  "woman office worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍💼",
        "name":  "woman office worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍💼",
        "name":  "woman office worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍💼",
        "name":  "woman office worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🔬",
        "name":  "scientist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🔬",
        "name":  "scientist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🔬",
        "name":  "scientist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🔬",
        "name":  "scientist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🔬",
        "name":  "scientist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🔬",
        "name":  "scientist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🔬",
        "name":  "man scientist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🔬",
        "name":  "man scientist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🔬",
        "name":  "man scientist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🔬",
        "name":  "man scientist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🔬",
        "name":  "man scientist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🔬",
        "name":  "man scientist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🔬",
        "name":  "woman scientist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🔬",
        "name":  "woman scientist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🔬",
        "name":  "woman scientist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🔬",
        "name":  "woman scientist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🔬",
        "name":  "woman scientist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🔬",
        "name":  "woman scientist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍💻",
        "name":  "technologist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍💻",
        "name":  "technologist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍💻",
        "name":  "technologist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍💻",
        "name":  "technologist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍💻",
        "name":  "technologist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍💻",
        "name":  "technologist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍💻",
        "name":  "man technologist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍💻",
        "name":  "man technologist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍💻",
        "name":  "man technologist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍💻",
        "name":  "man technologist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍💻",
        "name":  "man technologist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍💻",
        "name":  "man technologist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍💻",
        "name":  "woman technologist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍💻",
        "name":  "woman technologist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍💻",
        "name":  "woman technologist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍💻",
        "name":  "woman technologist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍💻",
        "name":  "woman technologist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍💻",
        "name":  "woman technologist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🎤",
        "name":  "singer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🎤",
        "name":  "singer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🎤",
        "name":  "singer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🎤",
        "name":  "singer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🎤",
        "name":  "singer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🎤",
        "name":  "singer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🎤",
        "name":  "man singer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🎤",
        "name":  "man singer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🎤",
        "name":  "man singer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🎤",
        "name":  "man singer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🎤",
        "name":  "man singer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🎤",
        "name":  "man singer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🎤",
        "name":  "woman singer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🎤",
        "name":  "woman singer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🎤",
        "name":  "woman singer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🎤",
        "name":  "woman singer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🎤",
        "name":  "woman singer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🎤",
        "name":  "woman singer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🎨",
        "name":  "artist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🎨",
        "name":  "artist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🎨",
        "name":  "artist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🎨",
        "name":  "artist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🎨",
        "name":  "artist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🎨",
        "name":  "artist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🎨",
        "name":  "man artist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🎨",
        "name":  "man artist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🎨",
        "name":  "man artist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🎨",
        "name":  "man artist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🎨",
        "name":  "man artist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🎨",
        "name":  "man artist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🎨",
        "name":  "woman artist",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🎨",
        "name":  "woman artist: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🎨",
        "name":  "woman artist: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🎨",
        "name":  "woman artist: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🎨",
        "name":  "woman artist: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🎨",
        "name":  "woman artist: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍✈️",
        "name":  "pilot",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍✈️",
        "name":  "pilot: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍✈️",
        "name":  "pilot: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍✈️",
        "name":  "pilot: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍✈️",
        "name":  "pilot: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍✈️",
        "name":  "pilot: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍✈️",
        "name":  "man pilot",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍✈️",
        "name":  "man pilot: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍✈️",
        "name":  "man pilot: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍✈️",
        "name":  "man pilot: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍✈️",
        "name":  "man pilot: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍✈️",
        "name":  "man pilot: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍✈️",
        "name":  "woman pilot",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍✈️",
        "name":  "woman pilot: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍✈️",
        "name":  "woman pilot: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍✈️",
        "name":  "woman pilot: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍✈️",
        "name":  "woman pilot: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍✈️",
        "name":  "woman pilot: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🚀",
        "name":  "astronaut",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🚀",
        "name":  "astronaut: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🚀",
        "name":  "astronaut: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🚀",
        "name":  "astronaut: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🚀",
        "name":  "astronaut: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🚀",
        "name":  "astronaut: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🚀",
        "name":  "man astronaut",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🚀",
        "name":  "man astronaut: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🚀",
        "name":  "man astronaut: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🚀",
        "name":  "man astronaut: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🚀",
        "name":  "man astronaut: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🚀",
        "name":  "man astronaut: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🚀",
        "name":  "woman astronaut",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🚀",
        "name":  "woman astronaut: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🚀",
        "name":  "woman astronaut: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🚀",
        "name":  "woman astronaut: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🚀",
        "name":  "woman astronaut: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🚀",
        "name":  "woman astronaut: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🚒",
        "name":  "firefighter",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🚒",
        "name":  "firefighter: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🚒",
        "name":  "firefighter: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🚒",
        "name":  "firefighter: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🚒",
        "name":  "firefighter: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🚒",
        "name":  "firefighter: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🚒",
        "name":  "man firefighter",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🚒",
        "name":  "man firefighter: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🚒",
        "name":  "man firefighter: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🚒",
        "name":  "man firefighter: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🚒",
        "name":  "man firefighter: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🚒",
        "name":  "man firefighter: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🚒",
        "name":  "woman firefighter",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🚒",
        "name":  "woman firefighter: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🚒",
        "name":  "woman firefighter: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🚒",
        "name":  "woman firefighter: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🚒",
        "name":  "woman firefighter: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🚒",
        "name":  "woman firefighter: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮",
        "name":  "police officer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏻",
        "name":  "police officer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏼",
        "name":  "police officer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏽",
        "name":  "police officer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏾",
        "name":  "police officer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏿",
        "name":  "police officer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮‍♂️",
        "name":  "man police officer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏻‍♂️",
        "name":  "man police officer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏼‍♂️",
        "name":  "man police officer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏽‍♂️",
        "name":  "man police officer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏾‍♂️",
        "name":  "man police officer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏿‍♂️",
        "name":  "man police officer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮‍♀️",
        "name":  "woman police officer",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏻‍♀️",
        "name":  "woman police officer: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏼‍♀️",
        "name":  "woman police officer: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏽‍♀️",
        "name":  "woman police officer: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏾‍♀️",
        "name":  "woman police officer: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👮🏿‍♀️",
        "name":  "woman police officer: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵️",
        "name":  "detective",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏻",
        "name":  "detective: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏼",
        "name":  "detective: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏽",
        "name":  "detective: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏾",
        "name":  "detective: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏿",
        "name":  "detective: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵️‍♂️",
        "name":  "man detective",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏻‍♂️",
        "name":  "man detective: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏼‍♂️",
        "name":  "man detective: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏽‍♂️",
        "name":  "man detective: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏾‍♂️",
        "name":  "man detective: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏿‍♂️",
        "name":  "man detective: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵️‍♀️",
        "name":  "woman detective",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏻‍♀️",
        "name":  "woman detective: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏼‍♀️",
        "name":  "woman detective: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏽‍♀️",
        "name":  "woman detective: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏾‍♀️",
        "name":  "woman detective: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕵🏿‍♀️",
        "name":  "woman detective: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂",
        "name":  "guard",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏻",
        "name":  "guard: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏼",
        "name":  "guard: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏽",
        "name":  "guard: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏾",
        "name":  "guard: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏿",
        "name":  "guard: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂‍♂️",
        "name":  "man guard",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏻‍♂️",
        "name":  "man guard: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏼‍♂️",
        "name":  "man guard: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏽‍♂️",
        "name":  "man guard: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏾‍♂️",
        "name":  "man guard: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏿‍♂️",
        "name":  "man guard: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂‍♀️",
        "name":  "woman guard",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏻‍♀️",
        "name":  "woman guard: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏼‍♀️",
        "name":  "woman guard: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏽‍♀️",
        "name":  "woman guard: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏾‍♀️",
        "name":  "woman guard: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💂🏿‍♀️",
        "name":  "woman guard: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🥷",
        "name":  "ninja",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🥷🏻",
        "name":  "ninja: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🥷🏼",
        "name":  "ninja: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🥷🏽",
        "name":  "ninja: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🥷🏾",
        "name":  "ninja: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🥷🏿",
        "name":  "ninja: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷",
        "name":  "construction worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏻",
        "name":  "construction worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏼",
        "name":  "construction worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏽",
        "name":  "construction worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏾",
        "name":  "construction worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏿",
        "name":  "construction worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷‍♂️",
        "name":  "man construction worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏻‍♂️",
        "name":  "man construction worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏼‍♂️",
        "name":  "man construction worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏽‍♂️",
        "name":  "man construction worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏾‍♂️",
        "name":  "man construction worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏿‍♂️",
        "name":  "man construction worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷‍♀️",
        "name":  "woman construction worker",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏻‍♀️",
        "name":  "woman construction worker: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏼‍♀️",
        "name":  "woman construction worker: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏽‍♀️",
        "name":  "woman construction worker: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏾‍♀️",
        "name":  "woman construction worker: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👷🏿‍♀️",
        "name":  "woman construction worker: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫅",
        "name":  "person with crown",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫅🏻",
        "name":  "person with crown: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫅🏼",
        "name":  "person with crown: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫅🏽",
        "name":  "person with crown: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫅🏾",
        "name":  "person with crown: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫅🏿",
        "name":  "person with crown: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤴",
        "name":  "prince",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤴🏻",
        "name":  "prince: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤴🏼",
        "name":  "prince: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤴🏽",
        "name":  "prince: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤴🏾",
        "name":  "prince: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤴🏿",
        "name":  "prince: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👸",
        "name":  "princess",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👸🏻",
        "name":  "princess: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👸🏼",
        "name":  "princess: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👸🏽",
        "name":  "princess: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👸🏾",
        "name":  "princess: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👸🏿",
        "name":  "princess: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳",
        "name":  "person wearing turban",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏻",
        "name":  "person wearing turban: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏼",
        "name":  "person wearing turban: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏽",
        "name":  "person wearing turban: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏾",
        "name":  "person wearing turban: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏿",
        "name":  "person wearing turban: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳‍♂️",
        "name":  "man wearing turban",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏻‍♂️",
        "name":  "man wearing turban: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏼‍♂️",
        "name":  "man wearing turban: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏽‍♂️",
        "name":  "man wearing turban: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏾‍♂️",
        "name":  "man wearing turban: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏿‍♂️",
        "name":  "man wearing turban: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳‍♀️",
        "name":  "woman wearing turban",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏻‍♀️",
        "name":  "woman wearing turban: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏼‍♀️",
        "name":  "woman wearing turban: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏽‍♀️",
        "name":  "woman wearing turban: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏾‍♀️",
        "name":  "woman wearing turban: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👳🏿‍♀️",
        "name":  "woman wearing turban: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👲",
        "name":  "person with skullcap",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👲🏻",
        "name":  "person with skullcap: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👲🏼",
        "name":  "person with skullcap: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👲🏽",
        "name":  "person with skullcap: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👲🏾",
        "name":  "person with skullcap: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👲🏿",
        "name":  "person with skullcap: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧕",
        "name":  "woman with headscarf",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧕🏻",
        "name":  "woman with headscarf: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧕🏼",
        "name":  "woman with headscarf: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧕🏽",
        "name":  "woman with headscarf: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧕🏾",
        "name":  "woman with headscarf: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧕🏿",
        "name":  "woman with headscarf: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵",
        "name":  "person in tuxedo",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏻",
        "name":  "person in tuxedo: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏼",
        "name":  "person in tuxedo: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏽",
        "name":  "person in tuxedo: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏾",
        "name":  "person in tuxedo: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏿",
        "name":  "person in tuxedo: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵‍♂️",
        "name":  "man in tuxedo",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏻‍♂️",
        "name":  "man in tuxedo: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏼‍♂️",
        "name":  "man in tuxedo: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏽‍♂️",
        "name":  "man in tuxedo: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏾‍♂️",
        "name":  "man in tuxedo: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏿‍♂️",
        "name":  "man in tuxedo: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵‍♀️",
        "name":  "woman in tuxedo",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏻‍♀️",
        "name":  "woman in tuxedo: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏼‍♀️",
        "name":  "woman in tuxedo: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏽‍♀️",
        "name":  "woman in tuxedo: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏾‍♀️",
        "name":  "woman in tuxedo: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤵🏿‍♀️",
        "name":  "woman in tuxedo: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰",
        "name":  "person with veil",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏻",
        "name":  "person with veil: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏼",
        "name":  "person with veil: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏽",
        "name":  "person with veil: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏾",
        "name":  "person with veil: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏿",
        "name":  "person with veil: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰‍♂️",
        "name":  "man with veil",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏻‍♂️",
        "name":  "man with veil: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏼‍♂️",
        "name":  "man with veil: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏽‍♂️",
        "name":  "man with veil: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏾‍♂️",
        "name":  "man with veil: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏿‍♂️",
        "name":  "man with veil: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰‍♀️",
        "name":  "woman with veil",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏻‍♀️",
        "name":  "woman with veil: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏼‍♀️",
        "name":  "woman with veil: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏽‍♀️",
        "name":  "woman with veil: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏾‍♀️",
        "name":  "woman with veil: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👰🏿‍♀️",
        "name":  "woman with veil: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤰",
        "name":  "pregnant woman",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤰🏻",
        "name":  "pregnant woman: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤰🏼",
        "name":  "pregnant woman: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤰🏽",
        "name":  "pregnant woman: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤰🏾",
        "name":  "pregnant woman: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤰🏿",
        "name":  "pregnant woman: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫃",
        "name":  "pregnant man",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫃🏻",
        "name":  "pregnant man: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫃🏼",
        "name":  "pregnant man: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫃🏽",
        "name":  "pregnant man: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫃🏾",
        "name":  "pregnant man: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫃🏿",
        "name":  "pregnant man: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫄",
        "name":  "pregnant person",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫄🏻",
        "name":  "pregnant person: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫄🏼",
        "name":  "pregnant person: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫄🏽",
        "name":  "pregnant person: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫄🏾",
        "name":  "pregnant person: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫄🏿",
        "name":  "pregnant person: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤱",
        "name":  "breast-feeding",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤱🏻",
        "name":  "breast-feeding: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤱🏼",
        "name":  "breast-feeding: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤱🏽",
        "name":  "breast-feeding: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤱🏾",
        "name":  "breast-feeding: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤱🏿",
        "name":  "breast-feeding: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🍼",
        "name":  "woman feeding baby",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🍼",
        "name":  "woman feeding baby: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🍼",
        "name":  "woman feeding baby: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🍼",
        "name":  "woman feeding baby: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🍼",
        "name":  "woman feeding baby: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🍼",
        "name":  "woman feeding baby: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🍼",
        "name":  "man feeding baby",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🍼",
        "name":  "man feeding baby: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🍼",
        "name":  "man feeding baby: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🍼",
        "name":  "man feeding baby: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🍼",
        "name":  "man feeding baby: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🍼",
        "name":  "man feeding baby: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🍼",
        "name":  "person feeding baby",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🍼",
        "name":  "person feeding baby: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🍼",
        "name":  "person feeding baby: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🍼",
        "name":  "person feeding baby: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🍼",
        "name":  "person feeding baby: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🍼",
        "name":  "person feeding baby: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-role",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👼",
        "name":  "baby angel",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👼🏻",
        "name":  "baby angel: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👼🏼",
        "name":  "baby angel: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👼🏽",
        "name":  "baby angel: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👼🏾",
        "name":  "baby angel: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👼🏿",
        "name":  "baby angel: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🎅",
        "name":  "Santa Claus",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🎅🏻",
        "name":  "Santa Claus: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🎅🏼",
        "name":  "Santa Claus: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🎅🏽",
        "name":  "Santa Claus: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🎅🏾",
        "name":  "Santa Claus: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🎅🏿",
        "name":  "Santa Claus: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤶",
        "name":  "Mrs. Claus",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤶🏻",
        "name":  "Mrs. Claus: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤶🏼",
        "name":  "Mrs. Claus: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤶🏽",
        "name":  "Mrs. Claus: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤶🏾",
        "name":  "Mrs. Claus: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤶🏿",
        "name":  "Mrs. Claus: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🎄",
        "name":  "mx claus",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🎄",
        "name":  "mx claus: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🎄",
        "name":  "mx claus: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🎄",
        "name":  "mx claus: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🎄",
        "name":  "mx claus: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🎄",
        "name":  "mx claus: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸",
        "name":  "superhero",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏻",
        "name":  "superhero: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏼",
        "name":  "superhero: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏽",
        "name":  "superhero: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏾",
        "name":  "superhero: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏿",
        "name":  "superhero: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸‍♂️",
        "name":  "man superhero",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏻‍♂️",
        "name":  "man superhero: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏼‍♂️",
        "name":  "man superhero: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏽‍♂️",
        "name":  "man superhero: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏾‍♂️",
        "name":  "man superhero: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏿‍♂️",
        "name":  "man superhero: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸‍♀️",
        "name":  "woman superhero",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏻‍♀️",
        "name":  "woman superhero: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏼‍♀️",
        "name":  "woman superhero: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏽‍♀️",
        "name":  "woman superhero: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏾‍♀️",
        "name":  "woman superhero: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦸🏿‍♀️",
        "name":  "woman superhero: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹",
        "name":  "supervillain",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏻",
        "name":  "supervillain: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏼",
        "name":  "supervillain: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏽",
        "name":  "supervillain: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏾",
        "name":  "supervillain: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏿",
        "name":  "supervillain: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹‍♂️",
        "name":  "man supervillain",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏻‍♂️",
        "name":  "man supervillain: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏼‍♂️",
        "name":  "man supervillain: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏽‍♂️",
        "name":  "man supervillain: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏾‍♂️",
        "name":  "man supervillain: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏿‍♂️",
        "name":  "man supervillain: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹‍♀️",
        "name":  "woman supervillain",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏻‍♀️",
        "name":  "woman supervillain: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏼‍♀️",
        "name":  "woman supervillain: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏽‍♀️",
        "name":  "woman supervillain: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏾‍♀️",
        "name":  "woman supervillain: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🦹🏿‍♀️",
        "name":  "woman supervillain: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙",
        "name":  "mage",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏻",
        "name":  "mage: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏼",
        "name":  "mage: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏽",
        "name":  "mage: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏾",
        "name":  "mage: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏿",
        "name":  "mage: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙‍♂️",
        "name":  "man mage",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏻‍♂️",
        "name":  "man mage: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏼‍♂️",
        "name":  "man mage: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏽‍♂️",
        "name":  "man mage: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏾‍♂️",
        "name":  "man mage: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏿‍♂️",
        "name":  "man mage: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙‍♀️",
        "name":  "woman mage",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏻‍♀️",
        "name":  "woman mage: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏼‍♀️",
        "name":  "woman mage: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏽‍♀️",
        "name":  "woman mage: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏾‍♀️",
        "name":  "woman mage: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧙🏿‍♀️",
        "name":  "woman mage: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚",
        "name":  "fairy",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏻",
        "name":  "fairy: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏼",
        "name":  "fairy: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏽",
        "name":  "fairy: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏾",
        "name":  "fairy: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏿",
        "name":  "fairy: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚‍♂️",
        "name":  "man fairy",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏻‍♂️",
        "name":  "man fairy: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏼‍♂️",
        "name":  "man fairy: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏽‍♂️",
        "name":  "man fairy: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏾‍♂️",
        "name":  "man fairy: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏿‍♂️",
        "name":  "man fairy: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚‍♀️",
        "name":  "woman fairy",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏻‍♀️",
        "name":  "woman fairy: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏼‍♀️",
        "name":  "woman fairy: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏽‍♀️",
        "name":  "woman fairy: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏾‍♀️",
        "name":  "woman fairy: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧚🏿‍♀️",
        "name":  "woman fairy: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛",
        "name":  "vampire",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏻",
        "name":  "vampire: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏼",
        "name":  "vampire: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏽",
        "name":  "vampire: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏾",
        "name":  "vampire: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏿",
        "name":  "vampire: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛‍♂️",
        "name":  "man vampire",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏻‍♂️",
        "name":  "man vampire: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏼‍♂️",
        "name":  "man vampire: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏽‍♂️",
        "name":  "man vampire: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏾‍♂️",
        "name":  "man vampire: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏿‍♂️",
        "name":  "man vampire: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛‍♀️",
        "name":  "woman vampire",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏻‍♀️",
        "name":  "woman vampire: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏼‍♀️",
        "name":  "woman vampire: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏽‍♀️",
        "name":  "woman vampire: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏾‍♀️",
        "name":  "woman vampire: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧛🏿‍♀️",
        "name":  "woman vampire: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜",
        "name":  "merperson",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏻",
        "name":  "merperson: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏼",
        "name":  "merperson: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏽",
        "name":  "merperson: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏾",
        "name":  "merperson: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏿",
        "name":  "merperson: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜‍♂️",
        "name":  "merman",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏻‍♂️",
        "name":  "merman: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏼‍♂️",
        "name":  "merman: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏽‍♂️",
        "name":  "merman: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏾‍♂️",
        "name":  "merman: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏿‍♂️",
        "name":  "merman: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜‍♀️",
        "name":  "mermaid",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏻‍♀️",
        "name":  "mermaid: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏼‍♀️",
        "name":  "mermaid: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏽‍♀️",
        "name":  "mermaid: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏾‍♀️",
        "name":  "mermaid: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧜🏿‍♀️",
        "name":  "mermaid: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝",
        "name":  "elf",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏻",
        "name":  "elf: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏼",
        "name":  "elf: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏽",
        "name":  "elf: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏾",
        "name":  "elf: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏿",
        "name":  "elf: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝‍♂️",
        "name":  "man elf",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏻‍♂️",
        "name":  "man elf: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏼‍♂️",
        "name":  "man elf: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏽‍♂️",
        "name":  "man elf: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏾‍♂️",
        "name":  "man elf: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏿‍♂️",
        "name":  "man elf: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝‍♀️",
        "name":  "woman elf",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏻‍♀️",
        "name":  "woman elf: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏼‍♀️",
        "name":  "woman elf: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏽‍♀️",
        "name":  "woman elf: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏾‍♀️",
        "name":  "woman elf: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧝🏿‍♀️",
        "name":  "woman elf: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧞",
        "name":  "genie",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧞‍♂️",
        "name":  "man genie",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧞‍♀️",
        "name":  "woman genie",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧟",
        "name":  "zombie",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧟‍♂️",
        "name":  "man zombie",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧟‍♀️",
        "name":  "woman zombie",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧌",
        "name":  "troll",
        "group":  "People \u0026 Body",
        "subgroup":  "person-fantasy",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆",
        "name":  "person getting massage",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏻",
        "name":  "person getting massage: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏼",
        "name":  "person getting massage: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏽",
        "name":  "person getting massage: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏾",
        "name":  "person getting massage: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏿",
        "name":  "person getting massage: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆‍♂️",
        "name":  "man getting massage",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏻‍♂️",
        "name":  "man getting massage: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏼‍♂️",
        "name":  "man getting massage: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏽‍♂️",
        "name":  "man getting massage: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏾‍♂️",
        "name":  "man getting massage: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏿‍♂️",
        "name":  "man getting massage: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆‍♀️",
        "name":  "woman getting massage",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏻‍♀️",
        "name":  "woman getting massage: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏼‍♀️",
        "name":  "woman getting massage: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏽‍♀️",
        "name":  "woman getting massage: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏾‍♀️",
        "name":  "woman getting massage: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💆🏿‍♀️",
        "name":  "woman getting massage: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇",
        "name":  "person getting haircut",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏻",
        "name":  "person getting haircut: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏼",
        "name":  "person getting haircut: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏽",
        "name":  "person getting haircut: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏾",
        "name":  "person getting haircut: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏿",
        "name":  "person getting haircut: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇‍♂️",
        "name":  "man getting haircut",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏻‍♂️",
        "name":  "man getting haircut: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏼‍♂️",
        "name":  "man getting haircut: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏽‍♂️",
        "name":  "man getting haircut: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏾‍♂️",
        "name":  "man getting haircut: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏿‍♂️",
        "name":  "man getting haircut: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇‍♀️",
        "name":  "woman getting haircut",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏻‍♀️",
        "name":  "woman getting haircut: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏼‍♀️",
        "name":  "woman getting haircut: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏽‍♀️",
        "name":  "woman getting haircut: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏾‍♀️",
        "name":  "woman getting haircut: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💇🏿‍♀️",
        "name":  "woman getting haircut: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶",
        "name":  "person walking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏻",
        "name":  "person walking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏼",
        "name":  "person walking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏽",
        "name":  "person walking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏾",
        "name":  "person walking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏿",
        "name":  "person walking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶‍♂️",
        "name":  "man walking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏻‍♂️",
        "name":  "man walking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏼‍♂️",
        "name":  "man walking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏽‍♂️",
        "name":  "man walking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏾‍♂️",
        "name":  "man walking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏿‍♂️",
        "name":  "man walking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶‍♀️",
        "name":  "woman walking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏻‍♀️",
        "name":  "woman walking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏼‍♀️",
        "name":  "woman walking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏽‍♀️",
        "name":  "woman walking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏾‍♀️",
        "name":  "woman walking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏿‍♀️",
        "name":  "woman walking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶‍➡️",
        "name":  "person walking facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏻‍➡️",
        "name":  "person walking facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏼‍➡️",
        "name":  "person walking facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏽‍➡️",
        "name":  "person walking facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏾‍➡️",
        "name":  "person walking facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏿‍➡️",
        "name":  "person walking facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶‍♀️‍➡️",
        "name":  "woman walking facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏻‍♀️‍➡️",
        "name":  "woman walking facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏼‍♀️‍➡️",
        "name":  "woman walking facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏽‍♀️‍➡️",
        "name":  "woman walking facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏾‍♀️‍➡️",
        "name":  "woman walking facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏿‍♀️‍➡️",
        "name":  "woman walking facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶‍♂️‍➡️",
        "name":  "man walking facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏻‍♂️‍➡️",
        "name":  "man walking facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏼‍♂️‍➡️",
        "name":  "man walking facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏽‍♂️‍➡️",
        "name":  "man walking facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏾‍♂️‍➡️",
        "name":  "man walking facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚶🏿‍♂️‍➡️",
        "name":  "man walking facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍",
        "name":  "person standing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏻",
        "name":  "person standing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏼",
        "name":  "person standing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏽",
        "name":  "person standing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏾",
        "name":  "person standing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏿",
        "name":  "person standing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍‍♂️",
        "name":  "man standing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏻‍♂️",
        "name":  "man standing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏼‍♂️",
        "name":  "man standing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏽‍♂️",
        "name":  "man standing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏾‍♂️",
        "name":  "man standing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏿‍♂️",
        "name":  "man standing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍‍♀️",
        "name":  "woman standing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏻‍♀️",
        "name":  "woman standing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏼‍♀️",
        "name":  "woman standing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏽‍♀️",
        "name":  "woman standing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏾‍♀️",
        "name":  "woman standing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧍🏿‍♀️",
        "name":  "woman standing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎",
        "name":  "person kneeling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏻",
        "name":  "person kneeling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏼",
        "name":  "person kneeling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏽",
        "name":  "person kneeling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏾",
        "name":  "person kneeling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏿",
        "name":  "person kneeling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎‍♂️",
        "name":  "man kneeling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏻‍♂️",
        "name":  "man kneeling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏼‍♂️",
        "name":  "man kneeling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏽‍♂️",
        "name":  "man kneeling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏾‍♂️",
        "name":  "man kneeling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏿‍♂️",
        "name":  "man kneeling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎‍♀️",
        "name":  "woman kneeling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏻‍♀️",
        "name":  "woman kneeling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏼‍♀️",
        "name":  "woman kneeling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏽‍♀️",
        "name":  "woman kneeling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏾‍♀️",
        "name":  "woman kneeling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏿‍♀️",
        "name":  "woman kneeling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎‍➡️",
        "name":  "person kneeling facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏻‍➡️",
        "name":  "person kneeling facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏼‍➡️",
        "name":  "person kneeling facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏽‍➡️",
        "name":  "person kneeling facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏾‍➡️",
        "name":  "person kneeling facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏿‍➡️",
        "name":  "person kneeling facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎‍♀️‍➡️",
        "name":  "woman kneeling facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏻‍♀️‍➡️",
        "name":  "woman kneeling facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏼‍♀️‍➡️",
        "name":  "woman kneeling facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏽‍♀️‍➡️",
        "name":  "woman kneeling facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏾‍♀️‍➡️",
        "name":  "woman kneeling facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏿‍♀️‍➡️",
        "name":  "woman kneeling facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎‍♂️‍➡️",
        "name":  "man kneeling facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏻‍♂️‍➡️",
        "name":  "man kneeling facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏼‍♂️‍➡️",
        "name":  "man kneeling facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏽‍♂️‍➡️",
        "name":  "man kneeling facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏾‍♂️‍➡️",
        "name":  "man kneeling facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧎🏿‍♂️‍➡️",
        "name":  "man kneeling facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦯",
        "name":  "person with white cane",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦯",
        "name":  "person with white cane: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦯",
        "name":  "person with white cane: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦯",
        "name":  "person with white cane: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦯",
        "name":  "person with white cane: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦯",
        "name":  "person with white cane: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦯‍➡️",
        "name":  "person with white cane facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦯‍➡️",
        "name":  "person with white cane facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦯‍➡️",
        "name":  "person with white cane facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦯‍➡️",
        "name":  "person with white cane facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦯‍➡️",
        "name":  "person with white cane facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦯‍➡️",
        "name":  "person with white cane facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦯",
        "name":  "man with white cane",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦯",
        "name":  "man with white cane: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦯",
        "name":  "man with white cane: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦯",
        "name":  "man with white cane: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦯",
        "name":  "man with white cane: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦯",
        "name":  "man with white cane: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦯‍➡️",
        "name":  "man with white cane facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦯‍➡️",
        "name":  "man with white cane facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦯‍➡️",
        "name":  "man with white cane facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦯‍➡️",
        "name":  "man with white cane facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦯‍➡️",
        "name":  "man with white cane facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦯‍➡️",
        "name":  "man with white cane facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦯",
        "name":  "woman with white cane",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦯",
        "name":  "woman with white cane: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦯",
        "name":  "woman with white cane: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦯",
        "name":  "woman with white cane: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦯",
        "name":  "woman with white cane: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦯",
        "name":  "woman with white cane: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦯‍➡️",
        "name":  "woman with white cane facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦯‍➡️",
        "name":  "woman with white cane facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦯‍➡️",
        "name":  "woman with white cane facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦯‍➡️",
        "name":  "woman with white cane facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦯‍➡️",
        "name":  "woman with white cane facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦯‍➡️",
        "name":  "woman with white cane facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦼",
        "name":  "person in motorized wheelchair",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦼",
        "name":  "person in motorized wheelchair: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦼",
        "name":  "person in motorized wheelchair: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦼",
        "name":  "person in motorized wheelchair: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦼",
        "name":  "person in motorized wheelchair: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦼",
        "name":  "person in motorized wheelchair: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦼‍➡️",
        "name":  "person in motorized wheelchair facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦼‍➡️",
        "name":  "person in motorized wheelchair facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦼‍➡️",
        "name":  "person in motorized wheelchair facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦼‍➡️",
        "name":  "person in motorized wheelchair facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦼‍➡️",
        "name":  "person in motorized wheelchair facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦼‍➡️",
        "name":  "person in motorized wheelchair facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦼",
        "name":  "man in motorized wheelchair",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦼",
        "name":  "man in motorized wheelchair: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦼",
        "name":  "man in motorized wheelchair: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦼",
        "name":  "man in motorized wheelchair: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦼",
        "name":  "man in motorized wheelchair: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦼",
        "name":  "man in motorized wheelchair: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦼‍➡️",
        "name":  "man in motorized wheelchair facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦼‍➡️",
        "name":  "man in motorized wheelchair facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦼‍➡️",
        "name":  "man in motorized wheelchair facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦼‍➡️",
        "name":  "man in motorized wheelchair facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦼‍➡️",
        "name":  "man in motorized wheelchair facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦼‍➡️",
        "name":  "man in motorized wheelchair facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦼",
        "name":  "woman in motorized wheelchair",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦼",
        "name":  "woman in motorized wheelchair: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦼",
        "name":  "woman in motorized wheelchair: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦼",
        "name":  "woman in motorized wheelchair: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦼",
        "name":  "woman in motorized wheelchair: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦼",
        "name":  "woman in motorized wheelchair: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦼‍➡️",
        "name":  "woman in motorized wheelchair facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦼‍➡️",
        "name":  "woman in motorized wheelchair facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦼‍➡️",
        "name":  "woman in motorized wheelchair facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦼‍➡️",
        "name":  "woman in motorized wheelchair facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦼‍➡️",
        "name":  "woman in motorized wheelchair facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦼‍➡️",
        "name":  "woman in motorized wheelchair facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦽",
        "name":  "person in manual wheelchair",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦽",
        "name":  "person in manual wheelchair: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦽",
        "name":  "person in manual wheelchair: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦽",
        "name":  "person in manual wheelchair: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦽",
        "name":  "person in manual wheelchair: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦽",
        "name":  "person in manual wheelchair: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🦽‍➡️",
        "name":  "person in manual wheelchair facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🦽‍➡️",
        "name":  "person in manual wheelchair facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🦽‍➡️",
        "name":  "person in manual wheelchair facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🦽‍➡️",
        "name":  "person in manual wheelchair facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🦽‍➡️",
        "name":  "person in manual wheelchair facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🦽‍➡️",
        "name":  "person in manual wheelchair facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦽",
        "name":  "man in manual wheelchair",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦽",
        "name":  "man in manual wheelchair: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦽",
        "name":  "man in manual wheelchair: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦽",
        "name":  "man in manual wheelchair: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦽",
        "name":  "man in manual wheelchair: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦽",
        "name":  "man in manual wheelchair: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍🦽‍➡️",
        "name":  "man in manual wheelchair facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🦽‍➡️",
        "name":  "man in manual wheelchair facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🦽‍➡️",
        "name":  "man in manual wheelchair facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🦽‍➡️",
        "name":  "man in manual wheelchair facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🦽‍➡️",
        "name":  "man in manual wheelchair facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🦽‍➡️",
        "name":  "man in manual wheelchair facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦽",
        "name":  "woman in manual wheelchair",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦽",
        "name":  "woman in manual wheelchair: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦽",
        "name":  "woman in manual wheelchair: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦽",
        "name":  "woman in manual wheelchair: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦽",
        "name":  "woman in manual wheelchair: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦽",
        "name":  "woman in manual wheelchair: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍🦽‍➡️",
        "name":  "woman in manual wheelchair facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🦽‍➡️",
        "name":  "woman in manual wheelchair facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🦽‍➡️",
        "name":  "woman in manual wheelchair facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🦽‍➡️",
        "name":  "woman in manual wheelchair facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🦽‍➡️",
        "name":  "woman in manual wheelchair facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🦽‍➡️",
        "name":  "woman in manual wheelchair facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃",
        "name":  "person running",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏻",
        "name":  "person running: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏼",
        "name":  "person running: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏽",
        "name":  "person running: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏾",
        "name":  "person running: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏿",
        "name":  "person running: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃‍♂️",
        "name":  "man running",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏻‍♂️",
        "name":  "man running: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏼‍♂️",
        "name":  "man running: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏽‍♂️",
        "name":  "man running: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏾‍♂️",
        "name":  "man running: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏿‍♂️",
        "name":  "man running: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃‍♀️",
        "name":  "woman running",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏻‍♀️",
        "name":  "woman running: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏼‍♀️",
        "name":  "woman running: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏽‍♀️",
        "name":  "woman running: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏾‍♀️",
        "name":  "woman running: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏿‍♀️",
        "name":  "woman running: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃‍➡️",
        "name":  "person running facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏻‍➡️",
        "name":  "person running facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏼‍➡️",
        "name":  "person running facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏽‍➡️",
        "name":  "person running facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏾‍➡️",
        "name":  "person running facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏿‍➡️",
        "name":  "person running facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃‍♀️‍➡️",
        "name":  "woman running facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏻‍♀️‍➡️",
        "name":  "woman running facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏼‍♀️‍➡️",
        "name":  "woman running facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏽‍♀️‍➡️",
        "name":  "woman running facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏾‍♀️‍➡️",
        "name":  "woman running facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏿‍♀️‍➡️",
        "name":  "woman running facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃‍♂️‍➡️",
        "name":  "man running facing right",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏻‍♂️‍➡️",
        "name":  "man running facing right: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏼‍♂️‍➡️",
        "name":  "man running facing right: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏽‍♂️‍➡️",
        "name":  "man running facing right: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏾‍♂️‍➡️",
        "name":  "man running facing right: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏃🏿‍♂️‍➡️",
        "name":  "man running facing right: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💃",
        "name":  "woman dancing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💃🏻",
        "name":  "woman dancing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💃🏼",
        "name":  "woman dancing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💃🏽",
        "name":  "woman dancing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💃🏾",
        "name":  "woman dancing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💃🏿",
        "name":  "woman dancing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕺",
        "name":  "man dancing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕺🏻",
        "name":  "man dancing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕺🏼",
        "name":  "man dancing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕺🏽",
        "name":  "man dancing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕺🏾",
        "name":  "man dancing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕺🏿",
        "name":  "man dancing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕴️",
        "name":  "person in suit levitating",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕴🏻",
        "name":  "person in suit levitating: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕴🏼",
        "name":  "person in suit levitating: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕴🏽",
        "name":  "person in suit levitating: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕴🏾",
        "name":  "person in suit levitating: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🕴🏿",
        "name":  "person in suit levitating: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👯",
        "name":  "people with bunny ears",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👯‍♂️",
        "name":  "men with bunny ears",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👯‍♀️",
        "name":  "women with bunny ears",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖",
        "name":  "person in steamy room",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏻",
        "name":  "person in steamy room: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏼",
        "name":  "person in steamy room: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏽",
        "name":  "person in steamy room: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏾",
        "name":  "person in steamy room: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏿",
        "name":  "person in steamy room: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖‍♂️",
        "name":  "man in steamy room",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏻‍♂️",
        "name":  "man in steamy room: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏼‍♂️",
        "name":  "man in steamy room: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏽‍♂️",
        "name":  "man in steamy room: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏾‍♂️",
        "name":  "man in steamy room: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏿‍♂️",
        "name":  "man in steamy room: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖‍♀️",
        "name":  "woman in steamy room",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏻‍♀️",
        "name":  "woman in steamy room: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏼‍♀️",
        "name":  "woman in steamy room: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏽‍♀️",
        "name":  "woman in steamy room: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏾‍♀️",
        "name":  "woman in steamy room: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧖🏿‍♀️",
        "name":  "woman in steamy room: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗",
        "name":  "person climbing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏻",
        "name":  "person climbing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏼",
        "name":  "person climbing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏽",
        "name":  "person climbing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏾",
        "name":  "person climbing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏿",
        "name":  "person climbing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗‍♂️",
        "name":  "man climbing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏻‍♂️",
        "name":  "man climbing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏼‍♂️",
        "name":  "man climbing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏽‍♂️",
        "name":  "man climbing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏾‍♂️",
        "name":  "man climbing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏿‍♂️",
        "name":  "man climbing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗‍♀️",
        "name":  "woman climbing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏻‍♀️",
        "name":  "woman climbing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏼‍♀️",
        "name":  "woman climbing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏽‍♀️",
        "name":  "woman climbing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏾‍♀️",
        "name":  "woman climbing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧗🏿‍♀️",
        "name":  "woman climbing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-activity",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤺",
        "name":  "person fencing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏇",
        "name":  "horse racing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏇🏻",
        "name":  "horse racing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏇🏼",
        "name":  "horse racing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏇🏽",
        "name":  "horse racing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏇🏾",
        "name":  "horse racing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏇🏿",
        "name":  "horse racing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛷️",
        "name":  "skier",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏂",
        "name":  "snowboarder",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏂🏻",
        "name":  "snowboarder: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏂🏼",
        "name":  "snowboarder: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏂🏽",
        "name":  "snowboarder: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏂🏾",
        "name":  "snowboarder: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏂🏿",
        "name":  "snowboarder: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌️",
        "name":  "person golfing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏻",
        "name":  "person golfing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏼",
        "name":  "person golfing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏽",
        "name":  "person golfing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏾",
        "name":  "person golfing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏿",
        "name":  "person golfing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌️‍♂️",
        "name":  "man golfing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏻‍♂️",
        "name":  "man golfing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏼‍♂️",
        "name":  "man golfing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏽‍♂️",
        "name":  "man golfing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏾‍♂️",
        "name":  "man golfing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏿‍♂️",
        "name":  "man golfing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌️‍♀️",
        "name":  "woman golfing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏻‍♀️",
        "name":  "woman golfing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏼‍♀️",
        "name":  "woman golfing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏽‍♀️",
        "name":  "woman golfing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏾‍♀️",
        "name":  "woman golfing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏌🏿‍♀️",
        "name":  "woman golfing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄",
        "name":  "person surfing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏻",
        "name":  "person surfing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏼",
        "name":  "person surfing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏽",
        "name":  "person surfing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏾",
        "name":  "person surfing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏿",
        "name":  "person surfing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄‍♂️",
        "name":  "man surfing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏻‍♂️",
        "name":  "man surfing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏼‍♂️",
        "name":  "man surfing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏽‍♂️",
        "name":  "man surfing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏾‍♂️",
        "name":  "man surfing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏿‍♂️",
        "name":  "man surfing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄‍♀️",
        "name":  "woman surfing",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏻‍♀️",
        "name":  "woman surfing: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏼‍♀️",
        "name":  "woman surfing: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏽‍♀️",
        "name":  "woman surfing: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏾‍♀️",
        "name":  "woman surfing: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏄🏿‍♀️",
        "name":  "woman surfing: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣",
        "name":  "person rowing boat",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏻",
        "name":  "person rowing boat: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏼",
        "name":  "person rowing boat: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏽",
        "name":  "person rowing boat: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏾",
        "name":  "person rowing boat: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏿",
        "name":  "person rowing boat: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣‍♂️",
        "name":  "man rowing boat",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏻‍♂️",
        "name":  "man rowing boat: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏼‍♂️",
        "name":  "man rowing boat: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏽‍♂️",
        "name":  "man rowing boat: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏾‍♂️",
        "name":  "man rowing boat: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏿‍♂️",
        "name":  "man rowing boat: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣‍♀️",
        "name":  "woman rowing boat",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏻‍♀️",
        "name":  "woman rowing boat: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏼‍♀️",
        "name":  "woman rowing boat: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏽‍♀️",
        "name":  "woman rowing boat: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏾‍♀️",
        "name":  "woman rowing boat: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚣🏿‍♀️",
        "name":  "woman rowing boat: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊",
        "name":  "person swimming",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏻",
        "name":  "person swimming: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏼",
        "name":  "person swimming: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏽",
        "name":  "person swimming: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏾",
        "name":  "person swimming: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏿",
        "name":  "person swimming: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊‍♂️",
        "name":  "man swimming",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏻‍♂️",
        "name":  "man swimming: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏼‍♂️",
        "name":  "man swimming: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏽‍♂️",
        "name":  "man swimming: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏾‍♂️",
        "name":  "man swimming: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏿‍♂️",
        "name":  "man swimming: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊‍♀️",
        "name":  "woman swimming",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏻‍♀️",
        "name":  "woman swimming: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏼‍♀️",
        "name":  "woman swimming: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏽‍♀️",
        "name":  "woman swimming: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏾‍♀️",
        "name":  "woman swimming: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏊🏿‍♀️",
        "name":  "woman swimming: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹️",
        "name":  "person bouncing ball",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏻",
        "name":  "person bouncing ball: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏼",
        "name":  "person bouncing ball: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏽",
        "name":  "person bouncing ball: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏾",
        "name":  "person bouncing ball: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏿",
        "name":  "person bouncing ball: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹️‍♂️",
        "name":  "man bouncing ball",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏻‍♂️",
        "name":  "man bouncing ball: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏼‍♂️",
        "name":  "man bouncing ball: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏽‍♂️",
        "name":  "man bouncing ball: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏾‍♂️",
        "name":  "man bouncing ball: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏿‍♂️",
        "name":  "man bouncing ball: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹️‍♀️",
        "name":  "woman bouncing ball",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏻‍♀️",
        "name":  "woman bouncing ball: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏼‍♀️",
        "name":  "woman bouncing ball: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏽‍♀️",
        "name":  "woman bouncing ball: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏾‍♀️",
        "name":  "woman bouncing ball: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "⛹🏿‍♀️",
        "name":  "woman bouncing ball: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋️",
        "name":  "person lifting weights",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏻",
        "name":  "person lifting weights: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏼",
        "name":  "person lifting weights: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏽",
        "name":  "person lifting weights: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏾",
        "name":  "person lifting weights: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏿",
        "name":  "person lifting weights: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋️‍♂️",
        "name":  "man lifting weights",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏻‍♂️",
        "name":  "man lifting weights: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏼‍♂️",
        "name":  "man lifting weights: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏽‍♂️",
        "name":  "man lifting weights: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏾‍♂️",
        "name":  "man lifting weights: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏿‍♂️",
        "name":  "man lifting weights: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋️‍♀️",
        "name":  "woman lifting weights",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏻‍♀️",
        "name":  "woman lifting weights: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏼‍♀️",
        "name":  "woman lifting weights: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏽‍♀️",
        "name":  "woman lifting weights: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏾‍♀️",
        "name":  "woman lifting weights: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🏋🏿‍♀️",
        "name":  "woman lifting weights: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴",
        "name":  "person biking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏻",
        "name":  "person biking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏼",
        "name":  "person biking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏽",
        "name":  "person biking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏾",
        "name":  "person biking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏿",
        "name":  "person biking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴‍♂️",
        "name":  "man biking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏻‍♂️",
        "name":  "man biking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏼‍♂️",
        "name":  "man biking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏽‍♂️",
        "name":  "man biking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏾‍♂️",
        "name":  "man biking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏿‍♂️",
        "name":  "man biking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴‍♀️",
        "name":  "woman biking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏻‍♀️",
        "name":  "woman biking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏼‍♀️",
        "name":  "woman biking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏽‍♀️",
        "name":  "woman biking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏾‍♀️",
        "name":  "woman biking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚴🏿‍♀️",
        "name":  "woman biking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵",
        "name":  "person mountain biking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏻",
        "name":  "person mountain biking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏼",
        "name":  "person mountain biking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏽",
        "name":  "person mountain biking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏾",
        "name":  "person mountain biking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏿",
        "name":  "person mountain biking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵‍♂️",
        "name":  "man mountain biking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏻‍♂️",
        "name":  "man mountain biking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏼‍♂️",
        "name":  "man mountain biking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏽‍♂️",
        "name":  "man mountain biking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏾‍♂️",
        "name":  "man mountain biking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏿‍♂️",
        "name":  "man mountain biking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵‍♀️",
        "name":  "woman mountain biking",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏻‍♀️",
        "name":  "woman mountain biking: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏼‍♀️",
        "name":  "woman mountain biking: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏽‍♀️",
        "name":  "woman mountain biking: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏾‍♀️",
        "name":  "woman mountain biking: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🚵🏿‍♀️",
        "name":  "woman mountain biking: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸",
        "name":  "person cartwheeling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏻",
        "name":  "person cartwheeling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏼",
        "name":  "person cartwheeling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏽",
        "name":  "person cartwheeling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏾",
        "name":  "person cartwheeling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏿",
        "name":  "person cartwheeling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸‍♂️",
        "name":  "man cartwheeling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏻‍♂️",
        "name":  "man cartwheeling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏼‍♂️",
        "name":  "man cartwheeling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏽‍♂️",
        "name":  "man cartwheeling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏾‍♂️",
        "name":  "man cartwheeling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏿‍♂️",
        "name":  "man cartwheeling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸‍♀️",
        "name":  "woman cartwheeling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏻‍♀️",
        "name":  "woman cartwheeling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏼‍♀️",
        "name":  "woman cartwheeling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏽‍♀️",
        "name":  "woman cartwheeling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏾‍♀️",
        "name":  "woman cartwheeling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤸🏿‍♀️",
        "name":  "woman cartwheeling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤼",
        "name":  "people wrestling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤼‍♂️",
        "name":  "men wrestling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤼‍♀️",
        "name":  "women wrestling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽",
        "name":  "person playing water polo",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏻",
        "name":  "person playing water polo: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏼",
        "name":  "person playing water polo: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏽",
        "name":  "person playing water polo: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏾",
        "name":  "person playing water polo: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏿",
        "name":  "person playing water polo: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽‍♂️",
        "name":  "man playing water polo",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏻‍♂️",
        "name":  "man playing water polo: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏼‍♂️",
        "name":  "man playing water polo: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏽‍♂️",
        "name":  "man playing water polo: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏾‍♂️",
        "name":  "man playing water polo: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏿‍♂️",
        "name":  "man playing water polo: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽‍♀️",
        "name":  "woman playing water polo",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏻‍♀️",
        "name":  "woman playing water polo: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏼‍♀️",
        "name":  "woman playing water polo: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏽‍♀️",
        "name":  "woman playing water polo: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏾‍♀️",
        "name":  "woman playing water polo: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤽🏿‍♀️",
        "name":  "woman playing water polo: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾",
        "name":  "person playing handball",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏻",
        "name":  "person playing handball: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏼",
        "name":  "person playing handball: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏽",
        "name":  "person playing handball: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏾",
        "name":  "person playing handball: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏿",
        "name":  "person playing handball: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾‍♂️",
        "name":  "man playing handball",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏻‍♂️",
        "name":  "man playing handball: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏼‍♂️",
        "name":  "man playing handball: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏽‍♂️",
        "name":  "man playing handball: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏾‍♂️",
        "name":  "man playing handball: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏿‍♂️",
        "name":  "man playing handball: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾‍♀️",
        "name":  "woman playing handball",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏻‍♀️",
        "name":  "woman playing handball: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏼‍♀️",
        "name":  "woman playing handball: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏽‍♀️",
        "name":  "woman playing handball: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏾‍♀️",
        "name":  "woman playing handball: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤾🏿‍♀️",
        "name":  "woman playing handball: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹",
        "name":  "person juggling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏻",
        "name":  "person juggling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏼",
        "name":  "person juggling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏽",
        "name":  "person juggling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏾",
        "name":  "person juggling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏿",
        "name":  "person juggling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹‍♂️",
        "name":  "man juggling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏻‍♂️",
        "name":  "man juggling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏼‍♂️",
        "name":  "man juggling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏽‍♂️",
        "name":  "man juggling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏾‍♂️",
        "name":  "man juggling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏿‍♂️",
        "name":  "man juggling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹‍♀️",
        "name":  "woman juggling",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏻‍♀️",
        "name":  "woman juggling: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏼‍♀️",
        "name":  "woman juggling: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏽‍♀️",
        "name":  "woman juggling: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏾‍♀️",
        "name":  "woman juggling: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🤹🏿‍♀️",
        "name":  "woman juggling: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-sport",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘",
        "name":  "person in lotus position",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏻",
        "name":  "person in lotus position: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏼",
        "name":  "person in lotus position: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏽",
        "name":  "person in lotus position: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏾",
        "name":  "person in lotus position: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏿",
        "name":  "person in lotus position: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘‍♂️",
        "name":  "man in lotus position",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏻‍♂️",
        "name":  "man in lotus position: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏼‍♂️",
        "name":  "man in lotus position: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏽‍♂️",
        "name":  "man in lotus position: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏾‍♂️",
        "name":  "man in lotus position: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏿‍♂️",
        "name":  "man in lotus position: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘‍♀️",
        "name":  "woman in lotus position",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏻‍♀️",
        "name":  "woman in lotus position: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏼‍♀️",
        "name":  "woman in lotus position: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏽‍♀️",
        "name":  "woman in lotus position: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏾‍♀️",
        "name":  "woman in lotus position: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧘🏿‍♀️",
        "name":  "woman in lotus position: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛀",
        "name":  "person taking bath",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛀🏻",
        "name":  "person taking bath: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛀🏼",
        "name":  "person taking bath: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛀🏽",
        "name":  "person taking bath: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛀🏾",
        "name":  "person taking bath: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛀🏿",
        "name":  "person taking bath: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛌",
        "name":  "person in bed",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛌🏻",
        "name":  "person in bed: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛌🏼",
        "name":  "person in bed: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛌🏽",
        "name":  "person in bed: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛌🏾",
        "name":  "person in bed: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🛌🏿",
        "name":  "person in bed: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "person-resting",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🤝‍🧑",
        "name":  "people holding hands",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🤝‍🧑🏻",
        "name":  "people holding hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🤝‍🧑🏼",
        "name":  "people holding hands: light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🤝‍🧑🏽",
        "name":  "people holding hands: light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🤝‍🧑🏾",
        "name":  "people holding hands: light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍🤝‍🧑🏿",
        "name":  "people holding hands: light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🤝‍🧑🏻",
        "name":  "people holding hands: medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🤝‍🧑🏼",
        "name":  "people holding hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🤝‍🧑🏽",
        "name":  "people holding hands: medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🤝‍🧑🏾",
        "name":  "people holding hands: medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍🤝‍🧑🏿",
        "name":  "people holding hands: medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🤝‍🧑🏻",
        "name":  "people holding hands: medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🤝‍🧑🏼",
        "name":  "people holding hands: medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🤝‍🧑🏽",
        "name":  "people holding hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🤝‍🧑🏾",
        "name":  "people holding hands: medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍🤝‍🧑🏿",
        "name":  "people holding hands: medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🤝‍🧑🏻",
        "name":  "people holding hands: medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🤝‍🧑🏼",
        "name":  "people holding hands: medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🤝‍🧑🏽",
        "name":  "people holding hands: medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🤝‍🧑🏾",
        "name":  "people holding hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍🤝‍🧑🏿",
        "name":  "people holding hands: medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🤝‍🧑🏻",
        "name":  "people holding hands: dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🤝‍🧑🏼",
        "name":  "people holding hands: dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🤝‍🧑🏽",
        "name":  "people holding hands: dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🤝‍🧑🏾",
        "name":  "people holding hands: dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍🤝‍🧑🏿",
        "name":  "people holding hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👭",
        "name":  "women holding hands",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👭🏻",
        "name":  "women holding hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🤝‍👩🏼",
        "name":  "women holding hands: light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🤝‍👩🏽",
        "name":  "women holding hands: light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🤝‍👩🏾",
        "name":  "women holding hands: light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🤝‍👩🏿",
        "name":  "women holding hands: light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🤝‍👩🏻",
        "name":  "women holding hands: medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👭🏼",
        "name":  "women holding hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🤝‍👩🏽",
        "name":  "women holding hands: medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🤝‍👩🏾",
        "name":  "women holding hands: medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🤝‍👩🏿",
        "name":  "women holding hands: medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🤝‍👩🏻",
        "name":  "women holding hands: medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🤝‍👩🏼",
        "name":  "women holding hands: medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👭🏽",
        "name":  "women holding hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🤝‍👩🏾",
        "name":  "women holding hands: medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🤝‍👩🏿",
        "name":  "women holding hands: medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🤝‍👩🏻",
        "name":  "women holding hands: medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🤝‍👩🏼",
        "name":  "women holding hands: medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🤝‍👩🏽",
        "name":  "women holding hands: medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👭🏾",
        "name":  "women holding hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🤝‍👩🏿",
        "name":  "women holding hands: medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🤝‍👩🏻",
        "name":  "women holding hands: dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🤝‍👩🏼",
        "name":  "women holding hands: dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🤝‍👩🏽",
        "name":  "women holding hands: dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🤝‍👩🏾",
        "name":  "women holding hands: dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👭🏿",
        "name":  "women holding hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👫",
        "name":  "woman and man holding hands",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👫🏻",
        "name":  "woman and man holding hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🤝‍👨🏼",
        "name":  "woman and man holding hands: light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🤝‍👨🏽",
        "name":  "woman and man holding hands: light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🤝‍👨🏾",
        "name":  "woman and man holding hands: light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍🤝‍👨🏿",
        "name":  "woman and man holding hands: light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🤝‍👨🏻",
        "name":  "woman and man holding hands: medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👫🏼",
        "name":  "woman and man holding hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🤝‍👨🏽",
        "name":  "woman and man holding hands: medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🤝‍👨🏾",
        "name":  "woman and man holding hands: medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍🤝‍👨🏿",
        "name":  "woman and man holding hands: medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🤝‍👨🏻",
        "name":  "woman and man holding hands: medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🤝‍👨🏼",
        "name":  "woman and man holding hands: medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👫🏽",
        "name":  "woman and man holding hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🤝‍👨🏾",
        "name":  "woman and man holding hands: medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍🤝‍👨🏿",
        "name":  "woman and man holding hands: medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🤝‍👨🏻",
        "name":  "woman and man holding hands: medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🤝‍👨🏼",
        "name":  "woman and man holding hands: medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🤝‍👨🏽",
        "name":  "woman and man holding hands: medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👫🏾",
        "name":  "woman and man holding hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍🤝‍👨🏿",
        "name":  "woman and man holding hands: medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🤝‍👨🏻",
        "name":  "woman and man holding hands: dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🤝‍👨🏼",
        "name":  "woman and man holding hands: dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🤝‍👨🏽",
        "name":  "woman and man holding hands: dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍🤝‍👨🏾",
        "name":  "woman and man holding hands: dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👫🏿",
        "name":  "woman and man holding hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👬",
        "name":  "men holding hands",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👬🏻",
        "name":  "men holding hands: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🤝‍👨🏼",
        "name":  "men holding hands: light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🤝‍👨🏽",
        "name":  "men holding hands: light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🤝‍👨🏾",
        "name":  "men holding hands: light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍🤝‍👨🏿",
        "name":  "men holding hands: light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🤝‍👨🏻",
        "name":  "men holding hands: medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👬🏼",
        "name":  "men holding hands: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🤝‍👨🏽",
        "name":  "men holding hands: medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🤝‍👨🏾",
        "name":  "men holding hands: medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍🤝‍👨🏿",
        "name":  "men holding hands: medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🤝‍👨🏻",
        "name":  "men holding hands: medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🤝‍👨🏼",
        "name":  "men holding hands: medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👬🏽",
        "name":  "men holding hands: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🤝‍👨🏾",
        "name":  "men holding hands: medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍🤝‍👨🏿",
        "name":  "men holding hands: medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🤝‍👨🏻",
        "name":  "men holding hands: medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🤝‍👨🏼",
        "name":  "men holding hands: medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🤝‍👨🏽",
        "name":  "men holding hands: medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👬🏾",
        "name":  "men holding hands: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍🤝‍👨🏿",
        "name":  "men holding hands: medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🤝‍👨🏻",
        "name":  "men holding hands: dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🤝‍👨🏼",
        "name":  "men holding hands: dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🤝‍👨🏽",
        "name":  "men holding hands: dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍🤝‍👨🏾",
        "name":  "men holding hands: dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👬🏿",
        "name":  "men holding hands: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💏",
        "name":  "kiss",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💏🏻",
        "name":  "kiss: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💏🏼",
        "name":  "kiss: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💏🏽",
        "name":  "kiss: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💏🏾",
        "name":  "kiss: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💏🏿",
        "name":  "kiss: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍❤️‍💋‍🧑🏼",
        "name":  "kiss: person, person, light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍❤️‍💋‍🧑🏽",
        "name":  "kiss: person, person, light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍❤️‍💋‍🧑🏾",
        "name":  "kiss: person, person, light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍❤️‍💋‍🧑🏿",
        "name":  "kiss: person, person, light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍❤️‍💋‍🧑🏻",
        "name":  "kiss: person, person, medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍❤️‍💋‍🧑🏽",
        "name":  "kiss: person, person, medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍❤️‍💋‍🧑🏾",
        "name":  "kiss: person, person, medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍❤️‍💋‍🧑🏿",
        "name":  "kiss: person, person, medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍❤️‍💋‍🧑🏻",
        "name":  "kiss: person, person, medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍❤️‍💋‍🧑🏼",
        "name":  "kiss: person, person, medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍❤️‍💋‍🧑🏾",
        "name":  "kiss: person, person, medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍❤️‍💋‍🧑🏿",
        "name":  "kiss: person, person, medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍❤️‍💋‍🧑🏻",
        "name":  "kiss: person, person, medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍❤️‍💋‍🧑🏼",
        "name":  "kiss: person, person, medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍❤️‍💋‍🧑🏽",
        "name":  "kiss: person, person, medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍❤️‍💋‍🧑🏿",
        "name":  "kiss: person, person, medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍❤️‍💋‍🧑🏻",
        "name":  "kiss: person, person, dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍❤️‍💋‍🧑🏼",
        "name":  "kiss: person, person, dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍❤️‍💋‍🧑🏽",
        "name":  "kiss: person, person, dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍❤️‍💋‍🧑🏾",
        "name":  "kiss: person, person, dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍❤️‍💋‍👨",
        "name":  "kiss: woman, man",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👨🏻",
        "name":  "kiss: woman, man, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👨🏼",
        "name":  "kiss: woman, man, light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👨🏽",
        "name":  "kiss: woman, man, light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👨🏾",
        "name":  "kiss: woman, man, light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👨🏿",
        "name":  "kiss: woman, man, light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👨🏻",
        "name":  "kiss: woman, man, medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👨🏼",
        "name":  "kiss: woman, man, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👨🏽",
        "name":  "kiss: woman, man, medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👨🏾",
        "name":  "kiss: woman, man, medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👨🏿",
        "name":  "kiss: woman, man, medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👨🏻",
        "name":  "kiss: woman, man, medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👨🏼",
        "name":  "kiss: woman, man, medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👨🏽",
        "name":  "kiss: woman, man, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👨🏾",
        "name":  "kiss: woman, man, medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👨🏿",
        "name":  "kiss: woman, man, medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👨🏻",
        "name":  "kiss: woman, man, medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👨🏼",
        "name":  "kiss: woman, man, medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👨🏽",
        "name":  "kiss: woman, man, medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👨🏾",
        "name":  "kiss: woman, man, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👨🏿",
        "name":  "kiss: woman, man, medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👨🏻",
        "name":  "kiss: woman, man, dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👨🏼",
        "name":  "kiss: woman, man, dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👨🏽",
        "name":  "kiss: woman, man, dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👨🏾",
        "name":  "kiss: woman, man, dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👨🏿",
        "name":  "kiss: woman, man, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍❤️‍💋‍👨",
        "name":  "kiss: man, man",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍💋‍👨🏻",
        "name":  "kiss: man, man, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍💋‍👨🏼",
        "name":  "kiss: man, man, light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍💋‍👨🏽",
        "name":  "kiss: man, man, light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍💋‍👨🏾",
        "name":  "kiss: man, man, light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍💋‍👨🏿",
        "name":  "kiss: man, man, light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍💋‍👨🏻",
        "name":  "kiss: man, man, medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍💋‍👨🏼",
        "name":  "kiss: man, man, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍💋‍👨🏽",
        "name":  "kiss: man, man, medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍💋‍👨🏾",
        "name":  "kiss: man, man, medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍💋‍👨🏿",
        "name":  "kiss: man, man, medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍💋‍👨🏻",
        "name":  "kiss: man, man, medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍💋‍👨🏼",
        "name":  "kiss: man, man, medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍💋‍👨🏽",
        "name":  "kiss: man, man, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍💋‍👨🏾",
        "name":  "kiss: man, man, medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍💋‍👨🏿",
        "name":  "kiss: man, man, medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍💋‍👨🏻",
        "name":  "kiss: man, man, medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍💋‍👨🏼",
        "name":  "kiss: man, man, medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍💋‍👨🏽",
        "name":  "kiss: man, man, medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍💋‍👨🏾",
        "name":  "kiss: man, man, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍💋‍👨🏿",
        "name":  "kiss: man, man, medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍💋‍👨🏻",
        "name":  "kiss: man, man, dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍💋‍👨🏼",
        "name":  "kiss: man, man, dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍💋‍👨🏽",
        "name":  "kiss: man, man, dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍💋‍👨🏾",
        "name":  "kiss: man, man, dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍💋‍👨🏿",
        "name":  "kiss: man, man, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍❤️‍💋‍👩",
        "name":  "kiss: woman, woman",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👩🏻",
        "name":  "kiss: woman, woman, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👩🏼",
        "name":  "kiss: woman, woman, light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👩🏽",
        "name":  "kiss: woman, woman, light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👩🏾",
        "name":  "kiss: woman, woman, light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍💋‍👩🏿",
        "name":  "kiss: woman, woman, light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👩🏻",
        "name":  "kiss: woman, woman, medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👩🏼",
        "name":  "kiss: woman, woman, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👩🏽",
        "name":  "kiss: woman, woman, medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👩🏾",
        "name":  "kiss: woman, woman, medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍💋‍👩🏿",
        "name":  "kiss: woman, woman, medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👩🏻",
        "name":  "kiss: woman, woman, medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👩🏼",
        "name":  "kiss: woman, woman, medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👩🏽",
        "name":  "kiss: woman, woman, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👩🏾",
        "name":  "kiss: woman, woman, medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍💋‍👩🏿",
        "name":  "kiss: woman, woman, medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👩🏻",
        "name":  "kiss: woman, woman, medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👩🏼",
        "name":  "kiss: woman, woman, medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👩🏽",
        "name":  "kiss: woman, woman, medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👩🏾",
        "name":  "kiss: woman, woman, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍💋‍👩🏿",
        "name":  "kiss: woman, woman, medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👩🏻",
        "name":  "kiss: woman, woman, dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👩🏼",
        "name":  "kiss: woman, woman, dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👩🏽",
        "name":  "kiss: woman, woman, dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👩🏾",
        "name":  "kiss: woman, woman, dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍💋‍👩🏿",
        "name":  "kiss: woman, woman, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💑",
        "name":  "couple with heart",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💑🏻",
        "name":  "couple with heart: light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💑🏼",
        "name":  "couple with heart: medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💑🏽",
        "name":  "couple with heart: medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💑🏾",
        "name":  "couple with heart: medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "💑🏿",
        "name":  "couple with heart: dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍❤️‍🧑🏼",
        "name":  "couple with heart: person, person, light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍❤️‍🧑🏽",
        "name":  "couple with heart: person, person, light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍❤️‍🧑🏾",
        "name":  "couple with heart: person, person, light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏻‍❤️‍🧑🏿",
        "name":  "couple with heart: person, person, light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍❤️‍🧑🏻",
        "name":  "couple with heart: person, person, medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍❤️‍🧑🏽",
        "name":  "couple with heart: person, person, medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍❤️‍🧑🏾",
        "name":  "couple with heart: person, person, medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏼‍❤️‍🧑🏿",
        "name":  "couple with heart: person, person, medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍❤️‍🧑🏻",
        "name":  "couple with heart: person, person, medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍❤️‍🧑🏼",
        "name":  "couple with heart: person, person, medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍❤️‍🧑🏾",
        "name":  "couple with heart: person, person, medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏽‍❤️‍🧑🏿",
        "name":  "couple with heart: person, person, medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍❤️‍🧑🏻",
        "name":  "couple with heart: person, person, medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍❤️‍🧑🏼",
        "name":  "couple with heart: person, person, medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍❤️‍🧑🏽",
        "name":  "couple with heart: person, person, medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏾‍❤️‍🧑🏿",
        "name":  "couple with heart: person, person, medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍❤️‍🧑🏻",
        "name":  "couple with heart: person, person, dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍❤️‍🧑🏼",
        "name":  "couple with heart: person, person, dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍❤️‍🧑🏽",
        "name":  "couple with heart: person, person, dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑🏿‍❤️‍🧑🏾",
        "name":  "couple with heart: person, person, dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍❤️‍👨",
        "name":  "couple with heart: woman, man",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👨🏻",
        "name":  "couple with heart: woman, man, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👨🏼",
        "name":  "couple with heart: woman, man, light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👨🏽",
        "name":  "couple with heart: woman, man, light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👨🏾",
        "name":  "couple with heart: woman, man, light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👨🏿",
        "name":  "couple with heart: woman, man, light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👨🏻",
        "name":  "couple with heart: woman, man, medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👨🏼",
        "name":  "couple with heart: woman, man, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👨🏽",
        "name":  "couple with heart: woman, man, medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👨🏾",
        "name":  "couple with heart: woman, man, medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👨🏿",
        "name":  "couple with heart: woman, man, medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👨🏻",
        "name":  "couple with heart: woman, man, medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👨🏼",
        "name":  "couple with heart: woman, man, medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👨🏽",
        "name":  "couple with heart: woman, man, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👨🏾",
        "name":  "couple with heart: woman, man, medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👨🏿",
        "name":  "couple with heart: woman, man, medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👨🏻",
        "name":  "couple with heart: woman, man, medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👨🏼",
        "name":  "couple with heart: woman, man, medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👨🏽",
        "name":  "couple with heart: woman, man, medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👨🏾",
        "name":  "couple with heart: woman, man, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👨🏿",
        "name":  "couple with heart: woman, man, medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👨🏻",
        "name":  "couple with heart: woman, man, dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👨🏼",
        "name":  "couple with heart: woman, man, dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👨🏽",
        "name":  "couple with heart: woman, man, dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👨🏾",
        "name":  "couple with heart: woman, man, dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👨🏿",
        "name":  "couple with heart: woman, man, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍❤️‍👨",
        "name":  "couple with heart: man, man",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍👨🏻",
        "name":  "couple with heart: man, man, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍👨🏼",
        "name":  "couple with heart: man, man, light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍👨🏽",
        "name":  "couple with heart: man, man, light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍👨🏾",
        "name":  "couple with heart: man, man, light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏻‍❤️‍👨🏿",
        "name":  "couple with heart: man, man, light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍👨🏻",
        "name":  "couple with heart: man, man, medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍👨🏼",
        "name":  "couple with heart: man, man, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍👨🏽",
        "name":  "couple with heart: man, man, medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍👨🏾",
        "name":  "couple with heart: man, man, medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏼‍❤️‍👨🏿",
        "name":  "couple with heart: man, man, medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍👨🏻",
        "name":  "couple with heart: man, man, medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍👨🏼",
        "name":  "couple with heart: man, man, medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍👨🏽",
        "name":  "couple with heart: man, man, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍👨🏾",
        "name":  "couple with heart: man, man, medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏽‍❤️‍👨🏿",
        "name":  "couple with heart: man, man, medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍👨🏻",
        "name":  "couple with heart: man, man, medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍👨🏼",
        "name":  "couple with heart: man, man, medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍👨🏽",
        "name":  "couple with heart: man, man, medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍👨🏾",
        "name":  "couple with heart: man, man, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏾‍❤️‍👨🏿",
        "name":  "couple with heart: man, man, medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍👨🏻",
        "name":  "couple with heart: man, man, dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍👨🏼",
        "name":  "couple with heart: man, man, dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍👨🏽",
        "name":  "couple with heart: man, man, dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍👨🏾",
        "name":  "couple with heart: man, man, dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨🏿‍❤️‍👨🏿",
        "name":  "couple with heart: man, man, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍❤️‍👩",
        "name":  "couple with heart: woman, woman",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👩🏻",
        "name":  "couple with heart: woman, woman, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👩🏼",
        "name":  "couple with heart: woman, woman, light skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👩🏽",
        "name":  "couple with heart: woman, woman, light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👩🏾",
        "name":  "couple with heart: woman, woman, light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏻‍❤️‍👩🏿",
        "name":  "couple with heart: woman, woman, light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👩🏻",
        "name":  "couple with heart: woman, woman, medium-light skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👩🏼",
        "name":  "couple with heart: woman, woman, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👩🏽",
        "name":  "couple with heart: woman, woman, medium-light skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👩🏾",
        "name":  "couple with heart: woman, woman, medium-light skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏼‍❤️‍👩🏿",
        "name":  "couple with heart: woman, woman, medium-light skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👩🏻",
        "name":  "couple with heart: woman, woman, medium skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👩🏼",
        "name":  "couple with heart: woman, woman, medium skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👩🏽",
        "name":  "couple with heart: woman, woman, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👩🏾",
        "name":  "couple with heart: woman, woman, medium skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏽‍❤️‍👩🏿",
        "name":  "couple with heart: woman, woman, medium skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👩🏻",
        "name":  "couple with heart: woman, woman, medium-dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👩🏼",
        "name":  "couple with heart: woman, woman, medium-dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👩🏽",
        "name":  "couple with heart: woman, woman, medium-dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👩🏾",
        "name":  "couple with heart: woman, woman, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏾‍❤️‍👩🏿",
        "name":  "couple with heart: woman, woman, medium-dark skin tone, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👩🏻",
        "name":  "couple with heart: woman, woman, dark skin tone, light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👩🏼",
        "name":  "couple with heart: woman, woman, dark skin tone, medium-light skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👩🏽",
        "name":  "couple with heart: woman, woman, dark skin tone, medium skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👩🏾",
        "name":  "couple with heart: woman, woman, dark skin tone, medium-dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩🏿‍❤️‍👩🏿",
        "name":  "couple with heart: woman, woman, dark skin tone",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👩‍👦",
        "name":  "family: man, woman, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👩‍👧",
        "name":  "family: man, woman, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👩‍👧‍👦",
        "name":  "family: man, woman, girl, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👩‍👦‍👦",
        "name":  "family: man, woman, boy, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👩‍👧‍👧",
        "name":  "family: man, woman, girl, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👨‍👦",
        "name":  "family: man, man, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👨‍👧",
        "name":  "family: man, man, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👨‍👧‍👦",
        "name":  "family: man, man, girl, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👨‍👦‍👦",
        "name":  "family: man, man, boy, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👨‍👧‍👧",
        "name":  "family: man, man, girl, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👩‍👦",
        "name":  "family: woman, woman, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👩‍👧",
        "name":  "family: woman, woman, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👩‍👧‍👦",
        "name":  "family: woman, woman, girl, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👩‍👦‍👦",
        "name":  "family: woman, woman, boy, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👩‍👧‍👧",
        "name":  "family: woman, woman, girl, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👦",
        "name":  "family: man, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👦‍👦",
        "name":  "family: man, boy, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👧",
        "name":  "family: man, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👧‍👦",
        "name":  "family: man, girl, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👨‍👧‍👧",
        "name":  "family: man, girl, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👦",
        "name":  "family: woman, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👦‍👦",
        "name":  "family: woman, boy, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👧",
        "name":  "family: woman, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👧‍👦",
        "name":  "family: woman, girl, boy",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👩‍👧‍👧",
        "name":  "family: woman, girl, girl",
        "group":  "People \u0026 Body",
        "subgroup":  "family",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🗣️",
        "name":  "speaking head",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👤",
        "name":  "bust in silhouette",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👥",
        "name":  "busts in silhouette",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🫂",
        "name":  "people hugging",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👪",
        "name":  "family",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🧑‍🧒",
        "name":  "family: adult, adult, child",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🧑‍🧒‍🧒",
        "name":  "family: adult, adult, child, child",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🧒",
        "name":  "family: adult, child",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🧑‍🧒‍🧒",
        "name":  "family: adult, child, child",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "👣",
        "name":  "footprints",
        "group":  "People \u0026 Body",
        "subgroup":  "person-symbol",
        "family":  "People \u0026 Body"
    },
    {
        "symbol":  "🐵",
        "name":  "monkey face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐒",
        "name":  "monkey",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦍",
        "name":  "gorilla",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦧",
        "name":  "orangutan",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐶",
        "name":  "dog face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐕",
        "name":  "dog",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦮",
        "name":  "guide dog",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐕‍🦺",
        "name":  "service dog",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐩",
        "name":  "poodle",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐺",
        "name":  "wolf",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦊",
        "name":  "fox",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦝",
        "name":  "raccoon",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐱",
        "name":  "cat face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐈",
        "name":  "cat",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐈‍⬛",
        "name":  "black cat",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦁",
        "name":  "lion",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐯",
        "name":  "tiger face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐅",
        "name":  "tiger",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐆",
        "name":  "leopard",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐴",
        "name":  "horse face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🫎",
        "name":  "moose",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🫏",
        "name":  "donkey",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐎",
        "name":  "horse",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦄",
        "name":  "unicorn",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦓",
        "name":  "zebra",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦌",
        "name":  "deer",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦬",
        "name":  "bison",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐮",
        "name":  "cow face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐂",
        "name":  "ox",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐃",
        "name":  "water buffalo",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐄",
        "name":  "cow",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐷",
        "name":  "pig face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐖",
        "name":  "pig",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐗",
        "name":  "boar",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐽",
        "name":  "pig nose",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐏",
        "name":  "ram",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐑",
        "name":  "ewe",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐐",
        "name":  "goat",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐪",
        "name":  "camel",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐫",
        "name":  "two-hump camel",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦙",
        "name":  "llama",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦒",
        "name":  "giraffe",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐘",
        "name":  "elephant",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦣",
        "name":  "mammoth",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦏",
        "name":  "rhinoceros",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦛",
        "name":  "hippopotamus",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐭",
        "name":  "mouse face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐁",
        "name":  "mouse",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐀",
        "name":  "rat",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐹",
        "name":  "hamster",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐰",
        "name":  "rabbit face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐇",
        "name":  "rabbit",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐿️",
        "name":  "chipmunk",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦫",
        "name":  "beaver",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦔",
        "name":  "hedgehog",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦇",
        "name":  "bat",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐻",
        "name":  "bear",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐻‍❄️",
        "name":  "polar bear",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐨",
        "name":  "koala",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐼",
        "name":  "panda",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦥",
        "name":  "sloth",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦦",
        "name":  "otter",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦨",
        "name":  "skunk",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦘",
        "name":  "kangaroo",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦡",
        "name":  "badger",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐾",
        "name":  "paw prints",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-mammal",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦃",
        "name":  "turkey",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐔",
        "name":  "chicken",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐓",
        "name":  "rooster",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐣",
        "name":  "hatching chick",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐤",
        "name":  "baby chick",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐥",
        "name":  "front-facing baby chick",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐦",
        "name":  "bird",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐧",
        "name":  "penguin",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🕊️",
        "name":  "dove",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦅",
        "name":  "eagle",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦆",
        "name":  "duck",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦢",
        "name":  "swan",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦉",
        "name":  "owl",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦤",
        "name":  "dodo",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪶",
        "name":  "feather",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦩",
        "name":  "flamingo",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦚",
        "name":  "peacock",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦜",
        "name":  "parrot",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪽",
        "name":  "wing",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐦‍⬛",
        "name":  "black bird",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪿",
        "name":  "goose",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐦‍🔥",
        "name":  "phoenix",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bird",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐸",
        "name":  "frog",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-amphibian",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐊",
        "name":  "crocodile",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-reptile",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐢",
        "name":  "turtle",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-reptile",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦎",
        "name":  "lizard",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-reptile",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐍",
        "name":  "snake",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-reptile",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐲",
        "name":  "dragon face",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-reptile",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐉",
        "name":  "dragon",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-reptile",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦕",
        "name":  "sauropod",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-reptile",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦖",
        "name":  "T-Rex",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-reptile",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐳",
        "name":  "spouting whale",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐋",
        "name":  "whale",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐬",
        "name":  "dolphin",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦭",
        "name":  "seal",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐟",
        "name":  "fish",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐠",
        "name":  "tropical fish",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐡",
        "name":  "blowfish",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦈",
        "name":  "shark",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐙",
        "name":  "octopus",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐚",
        "name":  "spiral shell",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪸",
        "name":  "coral",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪼",
        "name":  "jellyfish",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-marine",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐌",
        "name":  "snail",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦋",
        "name":  "butterfly",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐛",
        "name":  "bug",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐜",
        "name":  "ant",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐝",
        "name":  "honeybee",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪲",
        "name":  "beetle",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🐞",
        "name":  "lady beetle",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦗",
        "name":  "cricket",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪳",
        "name":  "cockroach",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🕷️",
        "name":  "spider",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🕸️",
        "name":  "spider web",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦂",
        "name":  "scorpion",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦟",
        "name":  "mosquito",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪰",
        "name":  "fly",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪱",
        "name":  "worm",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🦠",
        "name":  "microbe",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "animal-bug",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "💐",
        "name":  "bouquet",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌸",
        "name":  "cherry blossom",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "💮",
        "name":  "white flower",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪷",
        "name":  "lotus",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🏵️",
        "name":  "rosette",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌹",
        "name":  "rose",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🥀",
        "name":  "wilted flower",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌺",
        "name":  "hibiscus",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌻",
        "name":  "sunflower",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌼",
        "name":  "blossom",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌷",
        "name":  "tulip",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪻",
        "name":  "hyacinth",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-flower",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌱",
        "name":  "seedling",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪴",
        "name":  "potted plant",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌲",
        "name":  "evergreen tree",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌳",
        "name":  "deciduous tree",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌴",
        "name":  "palm tree",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌵",
        "name":  "cactus",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌾",
        "name":  "sheaf of rice",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🌿",
        "name":  "herb",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "☘️",
        "name":  "shamrock",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🍀",
        "name":  "four leaf clover",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🍁",
        "name":  "maple leaf",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🍂",
        "name":  "fallen leaf",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🍃",
        "name":  "leaf fluttering in wind",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪹",
        "name":  "empty nest",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🪺",
        "name":  "nest with eggs",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🍄",
        "name":  "mushroom",
        "group":  "Animals \u0026 Nature",
        "subgroup":  "plant-other",
        "family":  "Animals \u0026 Nature"
    },
    {
        "symbol":  "🍇",
        "name":  "grapes",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍈",
        "name":  "melon",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍉",
        "name":  "watermelon",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍊",
        "name":  "tangerine",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍋",
        "name":  "lemon",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍋‍🟩",
        "name":  "lime",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍌",
        "name":  "banana",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍍",
        "name":  "pineapple",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥭",
        "name":  "mango",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍎",
        "name":  "red apple",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍏",
        "name":  "green apple",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍐",
        "name":  "pear",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍑",
        "name":  "peach",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍒",
        "name":  "cherries",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍓",
        "name":  "strawberry",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫐",
        "name":  "blueberries",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥝",
        "name":  "kiwi fruit",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍅",
        "name":  "tomato",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫒",
        "name":  "olive",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥥",
        "name":  "coconut",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-fruit",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥑",
        "name":  "avocado",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍆",
        "name":  "eggplant",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥔",
        "name":  "potato",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥕",
        "name":  "carrot",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🌽",
        "name":  "ear of corn",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🌶️",
        "name":  "hot pepper",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫑",
        "name":  "bell pepper",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥒",
        "name":  "cucumber",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥬",
        "name":  "leafy green",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥦",
        "name":  "broccoli",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧄",
        "name":  "garlic",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧅",
        "name":  "onion",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥜",
        "name":  "peanuts",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫘",
        "name":  "beans",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🌰",
        "name":  "chestnut",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫚",
        "name":  "ginger root",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫛",
        "name":  "pea pod",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍄‍🟫",
        "name":  "brown mushroom",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-vegetable",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍞",
        "name":  "bread",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥐",
        "name":  "croissant",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥖",
        "name":  "baguette bread",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫓",
        "name":  "flatbread",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥨",
        "name":  "pretzel",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥯",
        "name":  "bagel",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥞",
        "name":  "pancakes",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧇",
        "name":  "waffle",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧀",
        "name":  "cheese wedge",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍖",
        "name":  "meat on bone",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍗",
        "name":  "poultry leg",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥩",
        "name":  "cut of meat",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥓",
        "name":  "bacon",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍔",
        "name":  "hamburger",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍟",
        "name":  "french fries",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍕",
        "name":  "pizza",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🌭",
        "name":  "hot dog",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥪",
        "name":  "sandwich",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🌮",
        "name":  "taco",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🌯",
        "name":  "burrito",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫔",
        "name":  "tamale",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥙",
        "name":  "stuffed flatbread",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧆",
        "name":  "falafel",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥚",
        "name":  "egg",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍳",
        "name":  "cooking",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥘",
        "name":  "shallow pan of food",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍲",
        "name":  "pot of food",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫕",
        "name":  "fondue",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥣",
        "name":  "bowl with spoon",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥗",
        "name":  "green salad",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍿",
        "name":  "popcorn",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧈",
        "name":  "butter",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧂",
        "name":  "salt",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥫",
        "name":  "canned food",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-prepared",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍱",
        "name":  "bento box",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍘",
        "name":  "rice cracker",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍙",
        "name":  "rice ball",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍚",
        "name":  "cooked rice",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍛",
        "name":  "curry rice",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍜",
        "name":  "steaming bowl",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍝",
        "name":  "spaghetti",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍠",
        "name":  "roasted sweet potato",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍢",
        "name":  "oden",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍣",
        "name":  "sushi",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍤",
        "name":  "fried shrimp",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍥",
        "name":  "fish cake with swirl",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥮",
        "name":  "moon cake",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍡",
        "name":  "dango",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥟",
        "name":  "dumpling",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥠",
        "name":  "fortune cookie",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥡",
        "name":  "takeout box",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-asian",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🦀",
        "name":  "crab",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-marine",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🦞",
        "name":  "lobster",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-marine",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🦐",
        "name":  "shrimp",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-marine",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🦑",
        "name":  "squid",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-marine",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🦪",
        "name":  "oyster",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-marine",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍦",
        "name":  "soft ice cream",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍧",
        "name":  "shaved ice",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍨",
        "name":  "ice cream",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍩",
        "name":  "doughnut",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍪",
        "name":  "cookie",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🎂",
        "name":  "birthday cake",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍰",
        "name":  "shortcake",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧁",
        "name":  "cupcake",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥧",
        "name":  "pie",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍫",
        "name":  "chocolate bar",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍬",
        "name":  "candy",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍭",
        "name":  "lollipop",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍮",
        "name":  "custard",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍯",
        "name":  "honey pot",
        "group":  "Food \u0026 Drink",
        "subgroup":  "food-sweet",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍼",
        "name":  "baby bottle",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥛",
        "name":  "glass of milk",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "☕",
        "name":  "hot beverage",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫖",
        "name":  "teapot",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍵",
        "name":  "teacup without handle",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍶",
        "name":  "sake",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍾",
        "name":  "bottle with popping cork",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍷",
        "name":  "wine glass",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍸",
        "name":  "cocktail glass",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍹",
        "name":  "tropical drink",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍺",
        "name":  "beer mug",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍻",
        "name":  "clinking beer mugs",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥂",
        "name":  "clinking glasses",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥃",
        "name":  "tumbler glass",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫗",
        "name":  "pouring liquid",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥤",
        "name":  "cup with straw",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧋",
        "name":  "bubble tea",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧃",
        "name":  "beverage box",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧉",
        "name":  "mate",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🧊",
        "name":  "ice",
        "group":  "Food \u0026 Drink",
        "subgroup":  "drink",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥢",
        "name":  "chopsticks",
        "group":  "Food \u0026 Drink",
        "subgroup":  "dishware",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍽️",
        "name":  "fork and knife with plate",
        "group":  "Food \u0026 Drink",
        "subgroup":  "dishware",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🍴",
        "name":  "fork and knife",
        "group":  "Food \u0026 Drink",
        "subgroup":  "dishware",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🥄",
        "name":  "spoon",
        "group":  "Food \u0026 Drink",
        "subgroup":  "dishware",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🔪",
        "name":  "kitchen knife",
        "group":  "Food \u0026 Drink",
        "subgroup":  "dishware",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🫙",
        "name":  "jar",
        "group":  "Food \u0026 Drink",
        "subgroup":  "dishware",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🏺",
        "name":  "amphora",
        "group":  "Food \u0026 Drink",
        "subgroup":  "dishware",
        "family":  "Food \u0026 Drink"
    },
    {
        "symbol":  "🌍",
        "name":  "globe showing Europe-Africa",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-map",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌎",
        "name":  "globe showing Americas",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-map",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌏",
        "name":  "globe showing Asia-Australia",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-map",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌐",
        "name":  "globe with meridians",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-map",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🗺️",
        "name":  "world map",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-map",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🗾",
        "name":  "map of Japan",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-map",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🧭",
        "name":  "compass",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-map",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏔️",
        "name":  "snow-capped mountain",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛰️",
        "name":  "mountain",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌋",
        "name":  "volcano",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🗻",
        "name":  "mount fuji",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏕️",
        "name":  "camping",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏖️",
        "name":  "beach with umbrella",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏜️",
        "name":  "desert",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏝️",
        "name":  "desert island",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏞️",
        "name":  "national park",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-geographic",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏟️",
        "name":  "stadium",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏛️",
        "name":  "classical building",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏗️",
        "name":  "building construction",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🧱",
        "name":  "brick",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🪨",
        "name":  "rock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🪵",
        "name":  "wood",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛖",
        "name":  "hut",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏘️",
        "name":  "houses",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏚️",
        "name":  "derelict house",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏠",
        "name":  "house",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏡",
        "name":  "house with garden",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏢",
        "name":  "office building",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏣",
        "name":  "Japanese post office",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏤",
        "name":  "post office",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏥",
        "name":  "hospital",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏦",
        "name":  "bank",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏨",
        "name":  "hotel",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏩",
        "name":  "love hotel",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏪",
        "name":  "convenience store",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏫",
        "name":  "school",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏬",
        "name":  "department store",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏭",
        "name":  "factory",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏯",
        "name":  "Japanese castle",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏰",
        "name":  "castle",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "💒",
        "name":  "wedding",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🗼",
        "name":  "Tokyo tower",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🗽",
        "name":  "Statue of Liberty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-building",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛪",
        "name":  "church",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-religious",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕌",
        "name":  "mosque",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-religious",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛕",
        "name":  "hindu temple",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-religious",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕍",
        "name":  "synagogue",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-religious",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛩️",
        "name":  "shinto shrine",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-religious",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕋",
        "name":  "kaaba",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-religious",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛲",
        "name":  "fountain",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛺",
        "name":  "tent",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌁",
        "name":  "foggy",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌃",
        "name":  "night with stars",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏙️",
        "name":  "cityscape",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌄",
        "name":  "sunrise over mountains",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌅",
        "name":  "sunrise",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌆",
        "name":  "cityscape at dusk",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌇",
        "name":  "sunset",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌉",
        "name":  "bridge at night",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "♨️",
        "name":  "hot springs",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🎠",
        "name":  "carousel horse",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛝",
        "name":  "playground slide",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🎡",
        "name":  "ferris wheel",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🎢",
        "name":  "roller coaster",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "💈",
        "name":  "barber pole",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🎪",
        "name":  "circus tent",
        "group":  "Travel \u0026 Places",
        "subgroup":  "place-other",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚂",
        "name":  "locomotive",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚃",
        "name":  "railway car",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚄",
        "name":  "high-speed train",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚅",
        "name":  "bullet train",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚆",
        "name":  "train",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚇",
        "name":  "metro",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚈",
        "name":  "light rail",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚉",
        "name":  "station",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚊",
        "name":  "tram",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚝",
        "name":  "monorail",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚞",
        "name":  "mountain railway",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚋",
        "name":  "tram car",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚌",
        "name":  "bus",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚍",
        "name":  "oncoming bus",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚎",
        "name":  "trolleybus",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚐",
        "name":  "minibus",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚑",
        "name":  "ambulance",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚒",
        "name":  "fire engine",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚓",
        "name":  "police car",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚔",
        "name":  "oncoming police car",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚕",
        "name":  "taxi",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚖",
        "name":  "oncoming taxi",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚗",
        "name":  "automobile",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚘",
        "name":  "oncoming automobile",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚙",
        "name":  "sport utility vehicle",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛻",
        "name":  "pickup truck",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚚",
        "name":  "delivery truck",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚛",
        "name":  "articulated lorry",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚜",
        "name":  "tractor",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏎️",
        "name":  "racing car",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🏍️",
        "name":  "motorcycle",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛵",
        "name":  "motor scooter",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🦽",
        "name":  "manual wheelchair",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🦼",
        "name":  "motorized wheelchair",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛺",
        "name":  "auto rickshaw",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚲",
        "name":  "bicycle",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛴",
        "name":  "kick scooter",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛹",
        "name":  "skateboard",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛼",
        "name":  "roller skate",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚏",
        "name":  "bus stop",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛣️",
        "name":  "motorway",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛤️",
        "name":  "railway track",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛢️",
        "name":  "oil drum",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛽",
        "name":  "fuel pump",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛞",
        "name":  "wheel",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚨",
        "name":  "police car light",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚥",
        "name":  "horizontal traffic light",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚦",
        "name":  "vertical traffic light",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛑",
        "name":  "stop sign",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚧",
        "name":  "construction",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-ground",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⚓",
        "name":  "anchor",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛟",
        "name":  "ring buoy",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛵",
        "name":  "sailboat",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛶",
        "name":  "canoe",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚤",
        "name":  "speedboat",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛳️",
        "name":  "passenger ship",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛴️",
        "name":  "ferry",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛥️",
        "name":  "motor boat",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚢",
        "name":  "ship",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-water",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "✈️",
        "name":  "airplane",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛩️",
        "name":  "small airplane",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛫",
        "name":  "airplane departure",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛬",
        "name":  "airplane arrival",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🪂",
        "name":  "parachute",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "💺",
        "name":  "seat",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚁",
        "name":  "helicopter",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚟",
        "name":  "suspension railway",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚠",
        "name":  "mountain cableway",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚡",
        "name":  "aerial tramway",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛰️",
        "name":  "satellite",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🚀",
        "name":  "rocket",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛸",
        "name":  "flying saucer",
        "group":  "Travel \u0026 Places",
        "subgroup":  "transport-air",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🛎️",
        "name":  "bellhop bell",
        "group":  "Travel \u0026 Places",
        "subgroup":  "hotel",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🧳",
        "name":  "luggage",
        "group":  "Travel \u0026 Places",
        "subgroup":  "hotel",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⌛",
        "name":  "hourglass done",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⏳",
        "name":  "hourglass not done",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⌚",
        "name":  "watch",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⏰",
        "name":  "alarm clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⏱️",
        "name":  "stopwatch",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⏲️",
        "name":  "timer clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕰️",
        "name":  "mantelpiece clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕛",
        "name":  "twelve o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕧",
        "name":  "twelve-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕐",
        "name":  "one o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕜",
        "name":  "one-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕑",
        "name":  "two o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕝",
        "name":  "two-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕒",
        "name":  "three o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕞",
        "name":  "three-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕓",
        "name":  "four o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕟",
        "name":  "four-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕔",
        "name":  "five o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕠",
        "name":  "five-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕕",
        "name":  "six o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕡",
        "name":  "six-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕖",
        "name":  "seven o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕢",
        "name":  "seven-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕗",
        "name":  "eight o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕣",
        "name":  "eight-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕘",
        "name":  "nine o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕤",
        "name":  "nine-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕙",
        "name":  "ten o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕥",
        "name":  "ten-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕚",
        "name":  "eleven o’clock",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🕦",
        "name":  "eleven-thirty",
        "group":  "Travel \u0026 Places",
        "subgroup":  "time",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌑",
        "name":  "new moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌒",
        "name":  "waxing crescent moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌓",
        "name":  "first quarter moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌔",
        "name":  "waxing gibbous moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌕",
        "name":  "full moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌖",
        "name":  "waning gibbous moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌗",
        "name":  "last quarter moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌘",
        "name":  "waning crescent moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌙",
        "name":  "crescent moon",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌚",
        "name":  "new moon face",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌛",
        "name":  "first quarter moon face",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌜",
        "name":  "last quarter moon face",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌡️",
        "name":  "thermometer",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "☀️",
        "name":  "sun",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌝",
        "name":  "full moon face",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌞",
        "name":  "sun with face",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🪐",
        "name":  "ringed planet",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⭐",
        "name":  "star",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌟",
        "name":  "glowing star",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌠",
        "name":  "shooting star",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌌",
        "name":  "milky way",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "☁️",
        "name":  "cloud",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛅",
        "name":  "sun behind cloud",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛈️",
        "name":  "cloud with lightning and rain",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌤️",
        "name":  "sun behind small cloud",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌥️",
        "name":  "sun behind large cloud",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌦️",
        "name":  "sun behind rain cloud",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌧️",
        "name":  "cloud with rain",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌨️",
        "name":  "cloud with snow",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌩️",
        "name":  "cloud with lightning",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌪️",
        "name":  "tornado",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌫️",
        "name":  "fog",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌬️",
        "name":  "wind face",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌀",
        "name":  "cyclone",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌈",
        "name":  "rainbow",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌂",
        "name":  "closed umbrella",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "☂️",
        "name":  "umbrella",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "☔",
        "name":  "umbrella with rain drops",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛱️",
        "name":  "umbrella on ground",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⚡",
        "name":  "high voltage",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "❄️",
        "name":  "snowflake",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "☃️",
        "name":  "snowman",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "⛄",
        "name":  "snowman without snow",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "☄️",
        "name":  "comet",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🔥",
        "name":  "fire",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "💧",
        "name":  "droplet",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🌊",
        "name":  "water wave",
        "group":  "Travel \u0026 Places",
        "subgroup":  "sky \u0026 weather",
        "family":  "Travel \u0026 Places"
    },
    {
        "symbol":  "🎃",
        "name":  "jack-o-lantern",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎄",
        "name":  "Christmas tree",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎆",
        "name":  "fireworks",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎇",
        "name":  "sparkler",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🧨",
        "name":  "firecracker",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "✨",
        "name":  "sparkles",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎈",
        "name":  "balloon",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎉",
        "name":  "party popper",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎊",
        "name":  "confetti ball",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎋",
        "name":  "tanabata tree",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎍",
        "name":  "pine decoration",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎎",
        "name":  "Japanese dolls",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎏",
        "name":  "carp streamer",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎐",
        "name":  "wind chime",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎑",
        "name":  "moon viewing ceremony",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🧧",
        "name":  "red envelope",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎀",
        "name":  "ribbon",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎁",
        "name":  "wrapped gift",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎗️",
        "name":  "reminder ribbon",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎟️",
        "name":  "admission tickets",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎫",
        "name":  "ticket",
        "group":  "Activities",
        "subgroup":  "event",
        "family":  "Activities"
    },
    {
        "symbol":  "🎖️",
        "name":  "military medal",
        "group":  "Activities",
        "subgroup":  "award-medal",
        "family":  "Activities"
    },
    {
        "symbol":  "🏆",
        "name":  "trophy",
        "group":  "Activities",
        "subgroup":  "award-medal",
        "family":  "Activities"
    },
    {
        "symbol":  "🏅",
        "name":  "sports medal",
        "group":  "Activities",
        "subgroup":  "award-medal",
        "family":  "Activities"
    },
    {
        "symbol":  "🥇",
        "name":  "1st place medal",
        "group":  "Activities",
        "subgroup":  "award-medal",
        "family":  "Activities"
    },
    {
        "symbol":  "🥈",
        "name":  "2nd place medal",
        "group":  "Activities",
        "subgroup":  "award-medal",
        "family":  "Activities"
    },
    {
        "symbol":  "🥉",
        "name":  "3rd place medal",
        "group":  "Activities",
        "subgroup":  "award-medal",
        "family":  "Activities"
    },
    {
        "symbol":  "⚽",
        "name":  "soccer ball",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "⚾",
        "name":  "baseball",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🥎",
        "name":  "softball",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏀",
        "name":  "basketball",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏐",
        "name":  "volleyball",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏈",
        "name":  "american football",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏉",
        "name":  "rugby football",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🎾",
        "name":  "tennis",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🥏",
        "name":  "flying disc",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🎳",
        "name":  "bowling",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏏",
        "name":  "cricket game",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏑",
        "name":  "field hockey",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏒",
        "name":  "ice hockey",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🥍",
        "name":  "lacrosse",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏓",
        "name":  "ping pong",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🏸",
        "name":  "badminton",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🥊",
        "name":  "boxing glove",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🥋",
        "name":  "martial arts uniform",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🥅",
        "name":  "goal net",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "⛳",
        "name":  "flag in hole",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "⛸️",
        "name":  "ice skate",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🎣",
        "name":  "fishing pole",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🤿",
        "name":  "diving mask",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🎽",
        "name":  "running shirt",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🎿",
        "name":  "skis",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🛷",
        "name":  "sled",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🥌",
        "name":  "curling stone",
        "group":  "Activities",
        "subgroup":  "sport",
        "family":  "Activities"
    },
    {
        "symbol":  "🎯",
        "name":  "bullseye",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🪀",
        "name":  "yo-yo",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🪁",
        "name":  "kite",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🔫",
        "name":  "water pistol",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🎱",
        "name":  "pool 8 ball",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🔮",
        "name":  "crystal ball",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🪄",
        "name":  "magic wand",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🎮",
        "name":  "video game",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🕹️",
        "name":  "joystick",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🎰",
        "name":  "slot machine",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🎲",
        "name":  "game die",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🧩",
        "name":  "puzzle piece",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🧸",
        "name":  "teddy bear",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🪅",
        "name":  "piñata",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🪩",
        "name":  "mirror ball",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🪆",
        "name":  "nesting dolls",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "♠️",
        "name":  "spade suit",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "♥️",
        "name":  "heart suit",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "♦️",
        "name":  "diamond suit",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "♣️",
        "name":  "club suit",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "♟️",
        "name":  "chess pawn",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🃏",
        "name":  "joker",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🀄",
        "name":  "mahjong red dragon",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🎴",
        "name":  "flower playing cards",
        "group":  "Activities",
        "subgroup":  "game",
        "family":  "Activities"
    },
    {
        "symbol":  "🎭",
        "name":  "performing arts",
        "group":  "Activities",
        "subgroup":  "arts \u0026 crafts",
        "family":  "Activities"
    },
    {
        "symbol":  "🖼️",
        "name":  "framed picture",
        "group":  "Activities",
        "subgroup":  "arts \u0026 crafts",
        "family":  "Activities"
    },
    {
        "symbol":  "🎨",
        "name":  "artist palette",
        "group":  "Activities",
        "subgroup":  "arts \u0026 crafts",
        "family":  "Activities"
    },
    {
        "symbol":  "🧵",
        "name":  "thread",
        "group":  "Activities",
        "subgroup":  "arts \u0026 crafts",
        "family":  "Activities"
    },
    {
        "symbol":  "🪡",
        "name":  "sewing needle",
        "group":  "Activities",
        "subgroup":  "arts \u0026 crafts",
        "family":  "Activities"
    },
    {
        "symbol":  "🧶",
        "name":  "yarn",
        "group":  "Activities",
        "subgroup":  "arts \u0026 crafts",
        "family":  "Activities"
    },
    {
        "symbol":  "🪢",
        "name":  "knot",
        "group":  "Activities",
        "subgroup":  "arts \u0026 crafts",
        "family":  "Activities"
    },
    {
        "symbol":  "👓",
        "name":  "glasses",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🕶️",
        "name":  "sunglasses",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🥽",
        "name":  "goggles",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🥼",
        "name":  "lab coat",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🦺",
        "name":  "safety vest",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👔",
        "name":  "necktie",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👕",
        "name":  "t-shirt",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👖",
        "name":  "jeans",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🧣",
        "name":  "scarf",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🧤",
        "name":  "gloves",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🧥",
        "name":  "coat",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🧦",
        "name":  "socks",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👗",
        "name":  "dress",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👘",
        "name":  "kimono",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🥻",
        "name":  "sari",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🩱",
        "name":  "one-piece swimsuit",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🩲",
        "name":  "briefs",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🩳",
        "name":  "shorts",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👙",
        "name":  "bikini",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👚",
        "name":  "woman’s clothes",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🪭",
        "name":  "folding hand fan",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👛",
        "name":  "purse",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👜",
        "name":  "handbag",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👝",
        "name":  "clutch bag",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🛍️",
        "name":  "shopping bags",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🎒",
        "name":  "backpack",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🩴",
        "name":  "thong sandal",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👞",
        "name":  "man’s shoe",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👟",
        "name":  "running shoe",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🥾",
        "name":  "hiking boot",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🥿",
        "name":  "flat shoe",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👠",
        "name":  "high-heeled shoe",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👡",
        "name":  "woman’s sandal",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🩰",
        "name":  "ballet shoes",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👢",
        "name":  "woman’s boot",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🪮",
        "name":  "hair pick",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👑",
        "name":  "crown",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "👒",
        "name":  "woman’s hat",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🎩",
        "name":  "top hat",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🎓",
        "name":  "graduation cap",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🧢",
        "name":  "billed cap",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🪖",
        "name":  "military helmet",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "⛑️",
        "name":  "rescue worker’s helmet",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "📿",
        "name":  "prayer beads",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "💄",
        "name":  "lipstick",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "💍",
        "name":  "ring",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "💎",
        "name":  "gem stone",
        "group":  "Objects",
        "subgroup":  "clothing",
        "family":  "Objects"
    },
    {
        "symbol":  "🔇",
        "name":  "muted speaker",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "🔈",
        "name":  "speaker low volume",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "🔉",
        "name":  "speaker medium volume",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "🔊",
        "name":  "speaker high volume",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "📢",
        "name":  "loudspeaker",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "📣",
        "name":  "megaphone",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "📯",
        "name":  "postal horn",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "🔔",
        "name":  "bell",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "🔕",
        "name":  "bell with slash",
        "group":  "Objects",
        "subgroup":  "sound",
        "family":  "Objects"
    },
    {
        "symbol":  "🎼",
        "name":  "musical score",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "🎵",
        "name":  "musical note",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "🎶",
        "name":  "musical notes",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "🎙️",
        "name":  "studio microphone",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "🎚️",
        "name":  "level slider",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "🎛️",
        "name":  "control knobs",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "🎤",
        "name":  "microphone",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "🎧",
        "name":  "headphone",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "📻",
        "name":  "radio",
        "group":  "Objects",
        "subgroup":  "music",
        "family":  "Objects"
    },
    {
        "symbol":  "🎷",
        "name":  "saxophone",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🪗",
        "name":  "accordion",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🎸",
        "name":  "guitar",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🎹",
        "name":  "musical keyboard",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🎺",
        "name":  "trumpet",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🎻",
        "name":  "violin",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🪕",
        "name":  "banjo",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🥁",
        "name":  "drum",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🪘",
        "name":  "long drum",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🪇",
        "name":  "maracas",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "🪈",
        "name":  "flute",
        "group":  "Objects",
        "subgroup":  "musical-instrument",
        "family":  "Objects"
    },
    {
        "symbol":  "📱",
        "name":  "mobile phone",
        "group":  "Objects",
        "subgroup":  "phone",
        "family":  "Objects"
    },
    {
        "symbol":  "📲",
        "name":  "mobile phone with arrow",
        "group":  "Objects",
        "subgroup":  "phone",
        "family":  "Objects"
    },
    {
        "symbol":  "☎️",
        "name":  "telephone",
        "group":  "Objects",
        "subgroup":  "phone",
        "family":  "Objects"
    },
    {
        "symbol":  "📞",
        "name":  "telephone receiver",
        "group":  "Objects",
        "subgroup":  "phone",
        "family":  "Objects"
    },
    {
        "symbol":  "📟",
        "name":  "pager",
        "group":  "Objects",
        "subgroup":  "phone",
        "family":  "Objects"
    },
    {
        "symbol":  "📠",
        "name":  "fax machine",
        "group":  "Objects",
        "subgroup":  "phone",
        "family":  "Objects"
    },
    {
        "symbol":  "🔋",
        "name":  "battery",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "🪫",
        "name":  "low battery",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "🔌",
        "name":  "electric plug",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "💻",
        "name":  "laptop",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "🖥️",
        "name":  "desktop computer",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "🖨️",
        "name":  "printer",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "⌨️",
        "name":  "keyboard",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "🖱️",
        "name":  "computer mouse",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "🖲️",
        "name":  "trackball",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "💽",
        "name":  "computer disk",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "💾",
        "name":  "floppy disk",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "💿",
        "name":  "optical disk",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "📀",
        "name":  "dvd",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "🧮",
        "name":  "abacus",
        "group":  "Objects",
        "subgroup":  "computer",
        "family":  "Objects"
    },
    {
        "symbol":  "🎥",
        "name":  "movie camera",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "🎞️",
        "name":  "film frames",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "📽️",
        "name":  "film projector",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "🎬",
        "name":  "clapper board",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "📺",
        "name":  "television",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "📷",
        "name":  "camera",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "📸",
        "name":  "camera with flash",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "📹",
        "name":  "video camera",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "📼",
        "name":  "videocassette",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "🔍",
        "name":  "magnifying glass tilted left",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "🔎",
        "name":  "magnifying glass tilted right",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "🕯️",
        "name":  "candle",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "💡",
        "name":  "light bulb",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "🔦",
        "name":  "flashlight",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "🏮",
        "name":  "red paper lantern",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "🪔",
        "name":  "diya lamp",
        "group":  "Objects",
        "subgroup":  "light \u0026 video",
        "family":  "Objects"
    },
    {
        "symbol":  "📔",
        "name":  "notebook with decorative cover",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📕",
        "name":  "closed book",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📖",
        "name":  "open book",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📗",
        "name":  "green book",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📘",
        "name":  "blue book",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📙",
        "name":  "orange book",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📚",
        "name":  "books",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📓",
        "name":  "notebook",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📒",
        "name":  "ledger",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📃",
        "name":  "page with curl",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📜",
        "name":  "scroll",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📄",
        "name":  "page facing up",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📰",
        "name":  "newspaper",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "🗞️",
        "name":  "rolled-up newspaper",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "📑",
        "name":  "bookmark tabs",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "🔖",
        "name":  "bookmark",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "🏷️",
        "name":  "label",
        "group":  "Objects",
        "subgroup":  "book-paper",
        "family":  "Objects"
    },
    {
        "symbol":  "💰",
        "name":  "money bag",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "🪙",
        "name":  "coin",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "💴",
        "name":  "yen banknote",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "💵",
        "name":  "dollar banknote",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "💶",
        "name":  "euro banknote",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "💷",
        "name":  "pound banknote",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "💸",
        "name":  "money with wings",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "💳",
        "name":  "credit card",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "🧾",
        "name":  "receipt",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "💹",
        "name":  "chart increasing with yen",
        "group":  "Objects",
        "subgroup":  "money",
        "family":  "Objects"
    },
    {
        "symbol":  "✉️",
        "name":  "envelope",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📧",
        "name":  "e-mail",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📨",
        "name":  "incoming envelope",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📩",
        "name":  "envelope with arrow",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📤",
        "name":  "outbox tray",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📥",
        "name":  "inbox tray",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📦",
        "name":  "package",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📫",
        "name":  "closed mailbox with raised flag",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📪",
        "name":  "closed mailbox with lowered flag",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📬",
        "name":  "open mailbox with raised flag",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📭",
        "name":  "open mailbox with lowered flag",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "📮",
        "name":  "postbox",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "🗳️",
        "name":  "ballot box with ballot",
        "group":  "Objects",
        "subgroup":  "mail",
        "family":  "Objects"
    },
    {
        "symbol":  "✏️",
        "name":  "pencil",
        "group":  "Objects",
        "subgroup":  "writing",
        "family":  "Objects"
    },
    {
        "symbol":  "✒️",
        "name":  "black nib",
        "group":  "Objects",
        "subgroup":  "writing",
        "family":  "Objects"
    },
    {
        "symbol":  "🖋️",
        "name":  "fountain pen",
        "group":  "Objects",
        "subgroup":  "writing",
        "family":  "Objects"
    },
    {
        "symbol":  "🖊️",
        "name":  "pen",
        "group":  "Objects",
        "subgroup":  "writing",
        "family":  "Objects"
    },
    {
        "symbol":  "🖌️",
        "name":  "paintbrush",
        "group":  "Objects",
        "subgroup":  "writing",
        "family":  "Objects"
    },
    {
        "symbol":  "🖍️",
        "name":  "crayon",
        "group":  "Objects",
        "subgroup":  "writing",
        "family":  "Objects"
    },
    {
        "symbol":  "📝",
        "name":  "memo",
        "group":  "Objects",
        "subgroup":  "writing",
        "family":  "Objects"
    },
    {
        "symbol":  "💼",
        "name":  "briefcase",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📁",
        "name":  "file folder",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📂",
        "name":  "open file folder",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "🗂️",
        "name":  "card index dividers",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📅",
        "name":  "calendar",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📆",
        "name":  "tear-off calendar",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "🗒️",
        "name":  "spiral notepad",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "🗓️",
        "name":  "spiral calendar",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📇",
        "name":  "card index",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📈",
        "name":  "chart increasing",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📉",
        "name":  "chart decreasing",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📊",
        "name":  "bar chart",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📋",
        "name":  "clipboard",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📌",
        "name":  "pushpin",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📍",
        "name":  "round pushpin",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📎",
        "name":  "paperclip",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "🖇️",
        "name":  "linked paperclips",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📏",
        "name":  "straight ruler",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "📐",
        "name":  "triangular ruler",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "✂️",
        "name":  "scissors",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "🗃️",
        "name":  "card file box",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "🗄️",
        "name":  "file cabinet",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "🗑️",
        "name":  "wastebasket",
        "group":  "Objects",
        "subgroup":  "office",
        "family":  "Objects"
    },
    {
        "symbol":  "🔒",
        "name":  "locked",
        "group":  "Objects",
        "subgroup":  "lock",
        "family":  "Objects"
    },
    {
        "symbol":  "🔓",
        "name":  "unlocked",
        "group":  "Objects",
        "subgroup":  "lock",
        "family":  "Objects"
    },
    {
        "symbol":  "🔏",
        "name":  "locked with pen",
        "group":  "Objects",
        "subgroup":  "lock",
        "family":  "Objects"
    },
    {
        "symbol":  "🔐",
        "name":  "locked with key",
        "group":  "Objects",
        "subgroup":  "lock",
        "family":  "Objects"
    },
    {
        "symbol":  "🔑",
        "name":  "key",
        "group":  "Objects",
        "subgroup":  "lock",
        "family":  "Objects"
    },
    {
        "symbol":  "🗝️",
        "name":  "old key",
        "group":  "Objects",
        "subgroup":  "lock",
        "family":  "Objects"
    },
    {
        "symbol":  "🔨",
        "name":  "hammer",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🪓",
        "name":  "axe",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "⛏️",
        "name":  "pick",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "⚒️",
        "name":  "hammer and pick",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🛠️",
        "name":  "hammer and wrench",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🗡️",
        "name":  "dagger",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "⚔️",
        "name":  "crossed swords",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "💣",
        "name":  "bomb",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🪃",
        "name":  "boomerang",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🏹",
        "name":  "bow and arrow",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🛡️",
        "name":  "shield",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🪚",
        "name":  "carpentry saw",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🔧",
        "name":  "wrench",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🪛",
        "name":  "screwdriver",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🔩",
        "name":  "nut and bolt",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "⚙️",
        "name":  "gear",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🗜️",
        "name":  "clamp",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "⚖️",
        "name":  "balance scale",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🦯",
        "name":  "white cane",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🔗",
        "name":  "link",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "⛓️‍💥",
        "name":  "broken chain",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "⛓️",
        "name":  "chains",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🪝",
        "name":  "hook",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🧰",
        "name":  "toolbox",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🧲",
        "name":  "magnet",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "🪜",
        "name":  "ladder",
        "group":  "Objects",
        "subgroup":  "tool",
        "family":  "Objects"
    },
    {
        "symbol":  "⚗️",
        "name":  "alembic",
        "group":  "Objects",
        "subgroup":  "science",
        "family":  "Objects"
    },
    {
        "symbol":  "🧪",
        "name":  "test tube",
        "group":  "Objects",
        "subgroup":  "science",
        "family":  "Objects"
    },
    {
        "symbol":  "🧫",
        "name":  "petri dish",
        "group":  "Objects",
        "subgroup":  "science",
        "family":  "Objects"
    },
    {
        "symbol":  "🧬",
        "name":  "dna",
        "group":  "Objects",
        "subgroup":  "science",
        "family":  "Objects"
    },
    {
        "symbol":  "🔬",
        "name":  "microscope",
        "group":  "Objects",
        "subgroup":  "science",
        "family":  "Objects"
    },
    {
        "symbol":  "🔭",
        "name":  "telescope",
        "group":  "Objects",
        "subgroup":  "science",
        "family":  "Objects"
    },
    {
        "symbol":  "📡",
        "name":  "satellite antenna",
        "group":  "Objects",
        "subgroup":  "science",
        "family":  "Objects"
    },
    {
        "symbol":  "💉",
        "name":  "syringe",
        "group":  "Objects",
        "subgroup":  "medical",
        "family":  "Objects"
    },
    {
        "symbol":  "🩸",
        "name":  "drop of blood",
        "group":  "Objects",
        "subgroup":  "medical",
        "family":  "Objects"
    },
    {
        "symbol":  "💊",
        "name":  "pill",
        "group":  "Objects",
        "subgroup":  "medical",
        "family":  "Objects"
    },
    {
        "symbol":  "🩹",
        "name":  "adhesive bandage",
        "group":  "Objects",
        "subgroup":  "medical",
        "family":  "Objects"
    },
    {
        "symbol":  "🩼",
        "name":  "crutch",
        "group":  "Objects",
        "subgroup":  "medical",
        "family":  "Objects"
    },
    {
        "symbol":  "🩺",
        "name":  "stethoscope",
        "group":  "Objects",
        "subgroup":  "medical",
        "family":  "Objects"
    },
    {
        "symbol":  "🩻",
        "name":  "x-ray",
        "group":  "Objects",
        "subgroup":  "medical",
        "family":  "Objects"
    },
    {
        "symbol":  "🚪",
        "name":  "door",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🛗",
        "name":  "elevator",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🪞",
        "name":  "mirror",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🪟",
        "name":  "window",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🛏️",
        "name":  "bed",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🛋️",
        "name":  "couch and lamp",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🪑",
        "name":  "chair",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🚽",
        "name":  "toilet",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🪠",
        "name":  "plunger",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🚿",
        "name":  "shower",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🛁",
        "name":  "bathtub",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🪤",
        "name":  "mouse trap",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🪒",
        "name":  "razor",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🧴",
        "name":  "lotion bottle",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🧷",
        "name":  "safety pin",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🧹",
        "name":  "broom",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🧺",
        "name":  "basket",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🧻",
        "name":  "roll of paper",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🪣",
        "name":  "bucket",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🧼",
        "name":  "soap",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🫧",
        "name":  "bubbles",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🪥",
        "name":  "toothbrush",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🧽",
        "name":  "sponge",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🧯",
        "name":  "fire extinguisher",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🛒",
        "name":  "shopping cart",
        "group":  "Objects",
        "subgroup":  "household",
        "family":  "Objects"
    },
    {
        "symbol":  "🚬",
        "name":  "cigarette",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "⚰️",
        "name":  "coffin",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "🪦",
        "name":  "headstone",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "⚱️",
        "name":  "funeral urn",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "🧿",
        "name":  "nazar amulet",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "🪬",
        "name":  "hamsa",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "🗿",
        "name":  "moai",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "🪧",
        "name":  "placard",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "🪪",
        "name":  "identification card",
        "group":  "Objects",
        "subgroup":  "other-object",
        "family":  "Objects"
    },
    {
        "symbol":  "🏧",
        "name":  "ATM sign",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚮",
        "name":  "litter in bin sign",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚰",
        "name":  "potable water",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "♿",
        "name":  "wheelchair symbol",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚹",
        "name":  "men’s room",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚺",
        "name":  "women’s room",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚻",
        "name":  "restroom",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚼",
        "name":  "baby symbol",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚾",
        "name":  "water closet",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🛂",
        "name":  "passport control",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🛃",
        "name":  "customs",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🛄",
        "name":  "baggage claim",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "🛅",
        "name":  "left luggage",
        "group":  "Symbols",
        "subgroup":  "transport-sign",
        "family":  "Symbols"
    },
    {
        "symbol":  "⚠️",
        "name":  "warning",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚸",
        "name":  "children crossing",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "⛔",
        "name":  "no entry",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚫",
        "name":  "prohibited",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚳",
        "name":  "no bicycles",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚭",
        "name":  "no smoking",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚯",
        "name":  "no littering",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚱",
        "name":  "non-potable water",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "🚷",
        "name":  "no pedestrians",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "📵",
        "name":  "no mobile phones",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔞",
        "name":  "no one under eighteen",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "☢️",
        "name":  "radioactive",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "☣️",
        "name":  "biohazard",
        "group":  "Symbols",
        "subgroup":  "warning",
        "family":  "Symbols"
    },
    {
        "symbol":  "⬆️",
        "name":  "up arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "↗️",
        "name":  "up-right arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "➡️",
        "name":  "right arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "↘️",
        "name":  "down-right arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "⬇️",
        "name":  "down arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "↙️",
        "name":  "down-left arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "⬅️",
        "name":  "left arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "↖️",
        "name":  "up-left arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "↕️",
        "name":  "up-down arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "↔️",
        "name":  "left-right arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "↩️",
        "name":  "right arrow curving left",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "↪️",
        "name":  "left arrow curving right",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "⤴️",
        "name":  "right arrow curving up",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "⤵️",
        "name":  "right arrow curving down",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔃",
        "name":  "clockwise vertical arrows",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔄",
        "name":  "counterclockwise arrows button",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔙",
        "name":  "BACK arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔚",
        "name":  "END arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔛",
        "name":  "ON! arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔜",
        "name":  "SOON arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔝",
        "name":  "TOP arrow",
        "group":  "Symbols",
        "subgroup":  "arrow",
        "family":  "Symbols"
    },
    {
        "symbol":  "🛐",
        "name":  "place of worship",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "⚛️",
        "name":  "atom symbol",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "🕉️",
        "name":  "om",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "✡️",
        "name":  "star of David",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "☸️",
        "name":  "wheel of dharma",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "☯️",
        "name":  "yin yang",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "✝️",
        "name":  "latin cross",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "☦️",
        "name":  "orthodox cross",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "☪️",
        "name":  "star and crescent",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "☮️",
        "name":  "peace symbol",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "🕎",
        "name":  "menorah",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔯",
        "name":  "dotted six-pointed star",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "🪯",
        "name":  "khanda",
        "group":  "Symbols",
        "subgroup":  "religion",
        "family":  "Symbols"
    },
    {
        "symbol":  "♈",
        "name":  "Aries",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♉",
        "name":  "Taurus",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♊",
        "name":  "Gemini",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♋",
        "name":  "Cancer",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♌",
        "name":  "Leo",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♍",
        "name":  "Virgo",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♎",
        "name":  "Libra",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♏",
        "name":  "Scorpio",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♐",
        "name":  "Sagittarius",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♑",
        "name":  "Capricorn",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♒",
        "name":  "Aquarius",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "♓",
        "name":  "Pisces",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "⛎",
        "name":  "Ophiuchus",
        "group":  "Symbols",
        "subgroup":  "zodiac",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔀",
        "name":  "shuffle tracks button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔁",
        "name":  "repeat button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔂",
        "name":  "repeat single button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "▶️",
        "name":  "play button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏩",
        "name":  "fast-forward button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏭️",
        "name":  "next track button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏯️",
        "name":  "play or pause button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "◀️",
        "name":  "reverse button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏪",
        "name":  "fast reverse button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏮️",
        "name":  "last track button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔼",
        "name":  "upwards button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏫",
        "name":  "fast up button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔽",
        "name":  "downwards button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏬",
        "name":  "fast down button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏸️",
        "name":  "pause button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏹️",
        "name":  "stop button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏺️",
        "name":  "record button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⏏️",
        "name":  "eject button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🎦",
        "name":  "cinema",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔅",
        "name":  "dim button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔆",
        "name":  "bright button",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "📶",
        "name":  "antenna bars",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🛜",
        "name":  "wireless",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "📳",
        "name":  "vibration mode",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "📴",
        "name":  "mobile phone off",
        "group":  "Symbols",
        "subgroup":  "av-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "♀️",
        "name":  "female sign",
        "group":  "Symbols",
        "subgroup":  "gender",
        "family":  "Symbols"
    },
    {
        "symbol":  "♂️",
        "name":  "male sign",
        "group":  "Symbols",
        "subgroup":  "gender",
        "family":  "Symbols"
    },
    {
        "symbol":  "⚧️",
        "name":  "transgender symbol",
        "group":  "Symbols",
        "subgroup":  "gender",
        "family":  "Symbols"
    },
    {
        "symbol":  "✖️",
        "name":  "multiply",
        "group":  "Symbols",
        "subgroup":  "math",
        "family":  "Symbols"
    },
    {
        "symbol":  "➕",
        "name":  "plus",
        "group":  "Symbols",
        "subgroup":  "math",
        "family":  "Symbols"
    },
    {
        "symbol":  "➖",
        "name":  "minus",
        "group":  "Symbols",
        "subgroup":  "math",
        "family":  "Symbols"
    },
    {
        "symbol":  "➗",
        "name":  "divide",
        "group":  "Symbols",
        "subgroup":  "math",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟰",
        "name":  "heavy equals sign",
        "group":  "Symbols",
        "subgroup":  "math",
        "family":  "Symbols"
    },
    {
        "symbol":  "♾️",
        "name":  "infinity",
        "group":  "Symbols",
        "subgroup":  "math",
        "family":  "Symbols"
    },
    {
        "symbol":  "‼️",
        "name":  "double exclamation mark",
        "group":  "Symbols",
        "subgroup":  "punctuation",
        "family":  "Symbols"
    },
    {
        "symbol":  "⁉️",
        "name":  "exclamation question mark",
        "group":  "Symbols",
        "subgroup":  "punctuation",
        "family":  "Symbols"
    },
    {
        "symbol":  "❓",
        "name":  "red question mark",
        "group":  "Symbols",
        "subgroup":  "punctuation",
        "family":  "Symbols"
    },
    {
        "symbol":  "❔",
        "name":  "white question mark",
        "group":  "Symbols",
        "subgroup":  "punctuation",
        "family":  "Symbols"
    },
    {
        "symbol":  "❕",
        "name":  "white exclamation mark",
        "group":  "Symbols",
        "subgroup":  "punctuation",
        "family":  "Symbols"
    },
    {
        "symbol":  "❗",
        "name":  "red exclamation mark",
        "group":  "Symbols",
        "subgroup":  "punctuation",
        "family":  "Symbols"
    },
    {
        "symbol":  "〰️",
        "name":  "wavy dash",
        "group":  "Symbols",
        "subgroup":  "punctuation",
        "family":  "Symbols"
    },
    {
        "symbol":  "💱",
        "name":  "currency exchange",
        "group":  "Symbols",
        "subgroup":  "currency",
        "family":  "Symbols"
    },
    {
        "symbol":  "💲",
        "name":  "heavy dollar sign",
        "group":  "Symbols",
        "subgroup":  "currency",
        "family":  "Symbols"
    },
    {
        "symbol":  "⚕️",
        "name":  "medical symbol",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "♻️",
        "name":  "recycling symbol",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⚜️",
        "name":  "fleur-de-lis",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔱",
        "name":  "trident emblem",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "📛",
        "name":  "name badge",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔰",
        "name":  "Japanese symbol for beginner",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "⭕",
        "name":  "hollow red circle",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "✅",
        "name":  "check mark button",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "☑️",
        "name":  "check box with check",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "✔️",
        "name":  "check mark",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "❌",
        "name":  "cross mark",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "❎",
        "name":  "cross mark button",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "➰",
        "name":  "curly loop",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "➿",
        "name":  "double curly loop",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "〽️",
        "name":  "part alternation mark",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "✳️",
        "name":  "eight-spoked asterisk",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "✴️",
        "name":  "eight-pointed star",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "❇️",
        "name":  "sparkle",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "©️",
        "name":  "copyright",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "®️",
        "name":  "registered",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "™️",
        "name":  "trade mark",
        "group":  "Symbols",
        "subgroup":  "other-symbol",
        "family":  "Symbols"
    },
    {
        "symbol":  "#️⃣",
        "name":  "",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "*️⃣",
        "name":  "keycap: *",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "0️⃣",
        "name":  "keycap: 0",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "1️⃣",
        "name":  "keycap: 1",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "2️⃣",
        "name":  "keycap: 2",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "3️⃣",
        "name":  "keycap: 3",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "4️⃣",
        "name":  "keycap: 4",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "5️⃣",
        "name":  "keycap: 5",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "6️⃣",
        "name":  "keycap: 6",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "7️⃣",
        "name":  "keycap: 7",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "8️⃣",
        "name":  "keycap: 8",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "9️⃣",
        "name":  "keycap: 9",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔟",
        "name":  "keycap: 10",
        "group":  "Symbols",
        "subgroup":  "keycap",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔠",
        "name":  "input latin uppercase",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔡",
        "name":  "input latin lowercase",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔢",
        "name":  "input numbers",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔣",
        "name":  "input symbols",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔤",
        "name":  "input latin letters",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🅰️",
        "name":  "A button (blood type)",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆎",
        "name":  "AB button (blood type)",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🅱️",
        "name":  "B button (blood type)",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆑",
        "name":  "CL button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆒",
        "name":  "COOL button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆓",
        "name":  "FREE button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "ℹ️",
        "name":  "information",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆔",
        "name":  "ID button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "Ⓜ️",
        "name":  "circled M",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆕",
        "name":  "NEW button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆖",
        "name":  "NG button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🅾️",
        "name":  "O button (blood type)",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆗",
        "name":  "OK button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🅿️",
        "name":  "P button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆘",
        "name":  "SOS button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆙",
        "name":  "UP! button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🆚",
        "name":  "VS button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈁",
        "name":  "Japanese “here” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈂️",
        "name":  "Japanese “service charge” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈷️",
        "name":  "Japanese “monthly amount” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈶",
        "name":  "Japanese “not free of charge” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈯",
        "name":  "Japanese “reserved” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🉐",
        "name":  "Japanese “bargain” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈹",
        "name":  "Japanese “discount” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈚",
        "name":  "Japanese “free of charge” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈲",
        "name":  "Japanese “prohibited” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🉑",
        "name":  "Japanese “acceptable” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈸",
        "name":  "Japanese “application” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈴",
        "name":  "Japanese “passing grade” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈳",
        "name":  "Japanese “vacancy” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "㊗️",
        "name":  "Japanese “congratulations” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "㊙️",
        "name":  "Japanese “secret” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈺",
        "name":  "Japanese “open for business” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🈵",
        "name":  "Japanese “no vacancy” button",
        "group":  "Symbols",
        "subgroup":  "alphanum",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔴",
        "name":  "red circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟠",
        "name":  "orange circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟡",
        "name":  "yellow circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟢",
        "name":  "green circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔵",
        "name":  "blue circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟣",
        "name":  "purple circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟤",
        "name":  "brown circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "⚫",
        "name":  "black circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "⚪",
        "name":  "white circle",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟥",
        "name":  "red square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟧",
        "name":  "orange square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟨",
        "name":  "yellow square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟩",
        "name":  "green square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟦",
        "name":  "blue square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟪",
        "name":  "purple square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🟫",
        "name":  "brown square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "⬛",
        "name":  "black large square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "⬜",
        "name":  "white large square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "◼️",
        "name":  "black medium square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "◻️",
        "name":  "white medium square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "◾",
        "name":  "black medium-small square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "◽",
        "name":  "white medium-small square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "▪️",
        "name":  "black small square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "▫️",
        "name":  "white small square",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔶",
        "name":  "large orange diamond",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔷",
        "name":  "large blue diamond",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔸",
        "name":  "small orange diamond",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔹",
        "name":  "small blue diamond",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔺",
        "name":  "red triangle pointed up",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔻",
        "name":  "red triangle pointed down",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "💠",
        "name":  "diamond with a dot",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔘",
        "name":  "radio button",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔳",
        "name":  "white square button",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🔲",
        "name":  "black square button",
        "group":  "Symbols",
        "subgroup":  "geometric",
        "family":  "Symbols"
    },
    {
        "symbol":  "🏁",
        "name":  "chequered flag",
        "group":  "Flags",
        "subgroup":  "flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🚩",
        "name":  "triangular flag",
        "group":  "Flags",
        "subgroup":  "flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🎌",
        "name":  "crossed flags",
        "group":  "Flags",
        "subgroup":  "flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🏴",
        "name":  "black flag",
        "group":  "Flags",
        "subgroup":  "flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🏳️",
        "name":  "white flag",
        "group":  "Flags",
        "subgroup":  "flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🏳️‍🌈",
        "name":  "rainbow flag",
        "group":  "Flags",
        "subgroup":  "flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🏳️‍⚧️",
        "name":  "transgender flag",
        "group":  "Flags",
        "subgroup":  "flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🏴‍☠️",
        "name":  "pirate flag",
        "group":  "Flags",
        "subgroup":  "flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇨",
        "name":  "flag: Ascension Island",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇩",
        "name":  "flag: Andorra",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇪",
        "name":  "flag: United Arab Emirates",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇫",
        "name":  "flag: Afghanistan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇬",
        "name":  "flag: Antigua \u0026 Barbuda",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇮",
        "name":  "flag: Anguilla",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇱",
        "name":  "flag: Albania",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇲",
        "name":  "flag: Armenia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇴",
        "name":  "flag: Angola",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇶",
        "name":  "flag: Antarctica",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇷",
        "name":  "flag: Argentina",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇸",
        "name":  "flag: American Samoa",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇹",
        "name":  "flag: Austria",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇺",
        "name":  "flag: Australia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇼",
        "name":  "flag: Aruba",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇽",
        "name":  "flag: Åland Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇦🇿",
        "name":  "flag: Azerbaijan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇦",
        "name":  "flag: Bosnia \u0026 Herzegovina",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇧",
        "name":  "flag: Barbados",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇩",
        "name":  "flag: Bangladesh",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇪",
        "name":  "flag: Belgium",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇫",
        "name":  "flag: Burkina Faso",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇬",
        "name":  "flag: Bulgaria",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇭",
        "name":  "flag: Bahrain",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇮",
        "name":  "flag: Burundi",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇯",
        "name":  "flag: Benin",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇱",
        "name":  "flag: St. Barthélemy",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇲",
        "name":  "flag: Bermuda",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇳",
        "name":  "flag: Brunei",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇴",
        "name":  "flag: Bolivia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇶",
        "name":  "flag: Caribbean Netherlands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇷",
        "name":  "flag: Brazil",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇸",
        "name":  "flag: Bahamas",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇹",
        "name":  "flag: Bhutan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇻",
        "name":  "flag: Bouvet Island",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇼",
        "name":  "flag: Botswana",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇾",
        "name":  "flag: Belarus",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇧🇿",
        "name":  "flag: Belize",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇦",
        "name":  "flag: Canada",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇨",
        "name":  "flag: Cocos (Keeling) Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇩",
        "name":  "flag: Congo - Kinshasa",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇫",
        "name":  "flag: Central African Republic",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇬",
        "name":  "flag: Congo - Brazzaville",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇭",
        "name":  "flag: Switzerland",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇮",
        "name":  "flag: Côte d’Ivoire",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇰",
        "name":  "flag: Cook Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇱",
        "name":  "flag: Chile",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇲",
        "name":  "flag: Cameroon",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇳",
        "name":  "flag: China",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇴",
        "name":  "flag: Colombia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇵",
        "name":  "flag: Clipperton Island",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇷",
        "name":  "flag: Costa Rica",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇺",
        "name":  "flag: Cuba",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇻",
        "name":  "flag: Cape Verde",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇼",
        "name":  "flag: Curaçao",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇽",
        "name":  "flag: Christmas Island",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇾",
        "name":  "flag: Cyprus",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇨🇿",
        "name":  "flag: Czechia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇩🇪",
        "name":  "flag: Germany",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇩🇬",
        "name":  "flag: Diego Garcia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇩🇯",
        "name":  "flag: Djibouti",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇩🇰",
        "name":  "flag: Denmark",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇩🇲",
        "name":  "flag: Dominica",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇩🇴",
        "name":  "flag: Dominican Republic",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇩🇿",
        "name":  "flag: Algeria",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇦",
        "name":  "flag: Ceuta \u0026 Melilla",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇨",
        "name":  "flag: Ecuador",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇪",
        "name":  "flag: Estonia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇬",
        "name":  "flag: Egypt",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇭",
        "name":  "flag: Western Sahara",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇷",
        "name":  "flag: Eritrea",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇸",
        "name":  "flag: Spain",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇹",
        "name":  "flag: Ethiopia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇪🇺",
        "name":  "flag: European Union",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇫🇮",
        "name":  "flag: Finland",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇫🇯",
        "name":  "flag: Fiji",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇫🇰",
        "name":  "flag: Falkland Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇫🇲",
        "name":  "flag: Micronesia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇫🇴",
        "name":  "flag: Faroe Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇫🇷",
        "name":  "flag: France",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇦",
        "name":  "flag: Gabon",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇧",
        "name":  "flag: United Kingdom",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇩",
        "name":  "flag: Grenada",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇪",
        "name":  "flag: Georgia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇫",
        "name":  "flag: French Guiana",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇬",
        "name":  "flag: Guernsey",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇭",
        "name":  "flag: Ghana",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇮",
        "name":  "flag: Gibraltar",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇱",
        "name":  "flag: Greenland",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇲",
        "name":  "flag: Gambia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇳",
        "name":  "flag: Guinea",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇵",
        "name":  "flag: Guadeloupe",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇶",
        "name":  "flag: Equatorial Guinea",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇷",
        "name":  "flag: Greece",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇸",
        "name":  "flag: South Georgia \u0026 South Sandwich Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇹",
        "name":  "flag: Guatemala",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇺",
        "name":  "flag: Guam",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇼",
        "name":  "flag: Guinea-Bissau",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇬🇾",
        "name":  "flag: Guyana",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇭🇰",
        "name":  "flag: Hong Kong SAR China",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇭🇲",
        "name":  "flag: Heard \u0026 McDonald Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇭🇳",
        "name":  "flag: Honduras",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇭🇷",
        "name":  "flag: Croatia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇭🇹",
        "name":  "flag: Haiti",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇭🇺",
        "name":  "flag: Hungary",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇨",
        "name":  "flag: Canary Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇩",
        "name":  "flag: Indonesia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇪",
        "name":  "flag: Ireland",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇱",
        "name":  "flag: Israel",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇲",
        "name":  "flag: Isle of Man",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇳",
        "name":  "flag: India",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇴",
        "name":  "flag: British Indian Ocean Territory",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇶",
        "name":  "flag: Iraq",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇷",
        "name":  "flag: Iran",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇸",
        "name":  "flag: Iceland",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇮🇹",
        "name":  "flag: Italy",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇯🇪",
        "name":  "flag: Jersey",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇯🇲",
        "name":  "flag: Jamaica",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇯🇴",
        "name":  "flag: Jordan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇯🇵",
        "name":  "flag: Japan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇪",
        "name":  "flag: Kenya",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇬",
        "name":  "flag: Kyrgyzstan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇭",
        "name":  "flag: Cambodia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇮",
        "name":  "flag: Kiribati",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇲",
        "name":  "flag: Comoros",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇳",
        "name":  "flag: St. Kitts \u0026 Nevis",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇵",
        "name":  "flag: North Korea",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇷",
        "name":  "flag: South Korea",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇼",
        "name":  "flag: Kuwait",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇾",
        "name":  "flag: Cayman Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇰🇿",
        "name":  "flag: Kazakhstan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇦",
        "name":  "flag: Laos",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇧",
        "name":  "flag: Lebanon",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇨",
        "name":  "flag: St. Lucia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇮",
        "name":  "flag: Liechtenstein",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇰",
        "name":  "flag: Sri Lanka",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇷",
        "name":  "flag: Liberia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇸",
        "name":  "flag: Lesotho",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇹",
        "name":  "flag: Lithuania",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇺",
        "name":  "flag: Luxembourg",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇻",
        "name":  "flag: Latvia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇱🇾",
        "name":  "flag: Libya",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇦",
        "name":  "flag: Morocco",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇨",
        "name":  "flag: Monaco",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇩",
        "name":  "flag: Moldova",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇪",
        "name":  "flag: Montenegro",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇫",
        "name":  "flag: St. Martin",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇬",
        "name":  "flag: Madagascar",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇭",
        "name":  "flag: Marshall Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇰",
        "name":  "flag: North Macedonia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇱",
        "name":  "flag: Mali",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇲",
        "name":  "flag: Myanmar (Burma)",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇳",
        "name":  "flag: Mongolia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇴",
        "name":  "flag: Macao SAR China",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇵",
        "name":  "flag: Northern Mariana Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇶",
        "name":  "flag: Martinique",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇷",
        "name":  "flag: Mauritania",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇸",
        "name":  "flag: Montserrat",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇹",
        "name":  "flag: Malta",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇺",
        "name":  "flag: Mauritius",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇻",
        "name":  "flag: Maldives",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇼",
        "name":  "flag: Malawi",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇽",
        "name":  "flag: Mexico",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇾",
        "name":  "flag: Malaysia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇲🇿",
        "name":  "flag: Mozambique",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇦",
        "name":  "flag: Namibia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇨",
        "name":  "flag: New Caledonia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇪",
        "name":  "flag: Niger",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇫",
        "name":  "flag: Norfolk Island",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇬",
        "name":  "flag: Nigeria",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇮",
        "name":  "flag: Nicaragua",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇱",
        "name":  "flag: Netherlands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇴",
        "name":  "flag: Norway",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇵",
        "name":  "flag: Nepal",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇷",
        "name":  "flag: Nauru",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇺",
        "name":  "flag: Niue",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇳🇿",
        "name":  "flag: New Zealand",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇴🇲",
        "name":  "flag: Oman",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇦",
        "name":  "flag: Panama",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇪",
        "name":  "flag: Peru",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇫",
        "name":  "flag: French Polynesia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇬",
        "name":  "flag: Papua New Guinea",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇭",
        "name":  "flag: Philippines",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇰",
        "name":  "flag: Pakistan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇱",
        "name":  "flag: Poland",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇲",
        "name":  "flag: St. Pierre \u0026 Miquelon",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇳",
        "name":  "flag: Pitcairn Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇷",
        "name":  "flag: Puerto Rico",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇸",
        "name":  "flag: Palestinian Territories",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇹",
        "name":  "flag: Portugal",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇼",
        "name":  "flag: Palau",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇵🇾",
        "name":  "flag: Paraguay",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇶🇦",
        "name":  "flag: Qatar",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇷🇪",
        "name":  "flag: Réunion",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇷🇴",
        "name":  "flag: Romania",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇷🇸",
        "name":  "flag: Serbia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇷🇺",
        "name":  "flag: Russia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇷🇼",
        "name":  "flag: Rwanda",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇦",
        "name":  "flag: Saudi Arabia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇧",
        "name":  "flag: Solomon Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇨",
        "name":  "flag: Seychelles",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇩",
        "name":  "flag: Sudan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇪",
        "name":  "flag: Sweden",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇬",
        "name":  "flag: Singapore",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇭",
        "name":  "flag: St. Helena",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇮",
        "name":  "flag: Slovenia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇯",
        "name":  "flag: Svalbard \u0026 Jan Mayen",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇰",
        "name":  "flag: Slovakia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇱",
        "name":  "flag: Sierra Leone",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇲",
        "name":  "flag: San Marino",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇳",
        "name":  "flag: Senegal",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇴",
        "name":  "flag: Somalia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇷",
        "name":  "flag: Suriname",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇸",
        "name":  "flag: South Sudan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇹",
        "name":  "flag: São Tomé \u0026 Príncipe",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇻",
        "name":  "flag: El Salvador",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇽",
        "name":  "flag: Sint Maarten",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇾",
        "name":  "flag: Syria",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇸🇿",
        "name":  "flag: Eswatini",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇦",
        "name":  "flag: Tristan da Cunha",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇨",
        "name":  "flag: Turks \u0026 Caicos Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇩",
        "name":  "flag: Chad",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇫",
        "name":  "flag: French Southern Territories",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇬",
        "name":  "flag: Togo",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇭",
        "name":  "flag: Thailand",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇯",
        "name":  "flag: Tajikistan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇰",
        "name":  "flag: Tokelau",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇱",
        "name":  "flag: Timor-Leste",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇲",
        "name":  "flag: Turkmenistan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇳",
        "name":  "flag: Tunisia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇴",
        "name":  "flag: Tonga",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇷",
        "name":  "flag: Türkiye",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇹",
        "name":  "flag: Trinidad \u0026 Tobago",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇻",
        "name":  "flag: Tuvalu",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇼",
        "name":  "flag: Taiwan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇹🇿",
        "name":  "flag: Tanzania",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇺🇦",
        "name":  "flag: Ukraine",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇺🇬",
        "name":  "flag: Uganda",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇺🇲",
        "name":  "flag: U.S. Outlying Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇺🇳",
        "name":  "flag: United Nations",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇺🇸",
        "name":  "flag: United States",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇺🇾",
        "name":  "flag: Uruguay",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇺🇿",
        "name":  "flag: Uzbekistan",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇻🇦",
        "name":  "flag: Vatican City",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇻🇨",
        "name":  "flag: St. Vincent \u0026 Grenadines",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇻🇪",
        "name":  "flag: Venezuela",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇻🇬",
        "name":  "flag: British Virgin Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇻🇮",
        "name":  "flag: U.S. Virgin Islands",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇻🇳",
        "name":  "flag: Vietnam",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇻🇺",
        "name":  "flag: Vanuatu",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇼🇫",
        "name":  "flag: Wallis \u0026 Futuna",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇼🇸",
        "name":  "flag: Samoa",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇽🇰",
        "name":  "flag: Kosovo",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇾🇪",
        "name":  "flag: Yemen",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇾🇹",
        "name":  "flag: Mayotte",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇿🇦",
        "name":  "flag: South Africa",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇿🇲",
        "name":  "flag: Zambia",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🇿🇼",
        "name":  "flag: Zimbabwe",
        "group":  "Flags",
        "subgroup":  "country-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "name":  "flag: England",
        "group":  "Flags",
        "subgroup":  "subdivision-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        "name":  "flag: Scotland",
        "group":  "Flags",
        "subgroup":  "subdivision-flag",
        "family":  "Flags"
    },
    {
        "symbol":  "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
        "name":  "flag: Wales",
        "group":  "Flags",
        "subgroup":  "subdivision-flag",
        "family":  "Flags"
    }
];
  function translateEmojiName(name) {
    if (!name) {
      return name;
    }

    const normalized = name.trim();
    const lower = normalized.toLowerCase();
    const phraseMap = new Map([
      ['rolling on the floor laughing', 'roulant par terre de rire'],
      ['face with tears of joy', 'visage avec des larmes de joie'],
      ['beaming face with smiling eyes', 'visage rayonnant aux yeux souriants'],
      ['smiling face with heart-eyes', 'visage souriant aux yeux en forme de cœur'],
      ['face with hand over mouth', 'visage avec la main sur la bouche'],
      ['face with open eyes and hand over mouth', 'visage avec les yeux ouverts et la main sur la bouche'],
      ['face with peeking eye', 'visage avec un œil qui regarde'],
      ['face with raised eyebrow', 'visage avec un sourcil levé'],
      ['face with diagonal mouth', 'visage avec une bouche oblique'],
      ['face with medical mask', 'visage avec un masque médical'],
      ['face with head-bandage', 'visage avec un bandage'],
      ['face with rolling eyes', 'visage aux yeux tournés'],
      ['face blowing a kiss', 'visage qui envoie un baiser'],
      ['zipper-mouth face', 'visage à bouche zippée'],
      ['face screaming in fear', 'visage hurlant de peur'],
      ['face with symbols on mouth', 'visage avec des symboles sur la bouche'],
      ['star-struck', 'ébloui'],
      ['FREE button', 'bouton GRATUIT'],
      ['Japanese “free of charge” button', 'bouton japonais « gratuit »'],
      ['Japanese “not free of charge” button', 'bouton japonais « payant »'],
      ['grinning face', 'visage souriant'],
      ['grinning face with big eyes', 'visage souriant aux grands yeux'],
      ['grinning face with smiling eyes', 'visage souriant aux yeux souriants'],
      ['grinning squinting face', 'visage souriant aux yeux plissés'],
      ['grinning face with sweat', 'visage souriant avec de la sueur'],
      ['slightly smiling face', 'visage légèrement souriant'],
      ['upside-down face', 'visage à l’envers'],
      ['melting face', 'visage fondant'],
      ['winking face', 'visage qui fait un clin d’œil'],
      ['smiling face with smiling eyes', 'visage souriant aux yeux souriants'],
      ['smiling face with halo', 'visage souriant avec une auréole'],
      ['smiling face with hearts', 'visage souriant avec des cœurs'],
      ['smiling face with open hands', 'visage souriant avec les mains ouvertes'],
      ['kissing face', 'visage qui fait un baiser'],
      ['smiling face', 'visage souriant'],
      ['kissing face with closed eyes', 'visage qui fait un baiser les yeux fermés'],
      ['kissing face with smiling eyes', 'visage qui fait un baiser les yeux souriants'],
      ['smiling face with tear', 'visage souriant avec une larme'],
      ['face savoring food', 'visage qui savoure un aliment'],
      ['face with tongue', 'visage avec la langue sortie'],
      ['winking face with tongue', 'visage qui fait un clin d’œil avec la langue sortie'],
      ['zany face', 'visage loufoque'],
      ['squinting face with tongue', 'visage aux yeux plissés avec la langue sortie'],
      ['money-mouth face', 'visage à la bouche en forme de monnaie'],
      ['saluting face', 'visage qui salue'],
      ['neutral face', 'visage neutre'],
      ['expressionless face', 'visage sans expression'],
      ['face with open mouth', 'visage à la bouche ouverte'],
      ['hushed face', 'visage calme'],
      ['astonished face', 'visage étonné'],
      ['flushed face', 'visage rougi'],
      ['pleading face', 'visage implorant'],
      ['face holding back tears', 'visage qui retient ses larmes'],
      ['frowning face with open mouth', 'visage fronçant les sourcils avec la bouche ouverte'],
      ['anguished face', 'visage angoissé'],
      ['fearful face', 'visage apeuré'],
      ['anxious face with sweat', 'visage anxieux avec de la sueur'],
      ['sad but relieved face', 'visage triste mais soulagé'],
      ['crying face', 'visage qui pleure'],
      ['loudly crying face', 'visage qui pleure bruyamment'],
      ['confounded face', 'visage déconcerté'],
      ['persevering face', 'visage persévérant'],
      ['disappointed face', 'visage déçu'],
      ['downcast face with sweat', 'visage abattu avec de la sueur'],
      ['weary face', 'visage fatigué'],
      ['tired face', 'visage las'],
      ['yawning face', 'visage qui bâille'],
      ['enraged face', 'visage furieux'],
      ['angry face', 'visage en colère'],
      ['face with steam from nose', 'visage avec de la vapeur qui sort du nez'],
      ['shushing face', 'visage chuchotant'],
      ['thinking face', 'visage qui réfléchit'],
      ['face without mouth', 'visage sans bouche'],
      ['dotted line face', 'visage à contours pointillés'],
      ['face in clouds', 'visage dans les nuages'],
      ['smirking face', 'visage narquois'],
      ['unamused face', 'visage pas amusé'],
      ['grimacing face', 'visage grimaçant'],
      ['face exhaling', 'visage qui expire'],
      ['lying face', 'visage qui ment'],
      ['face with crossed-out eyes', 'visage aux yeux barrés'],
      ['face with spiral eyes', 'visage aux yeux en spirale'],
      ['face with thermometer', 'visage avec un thermomètre'],
      ['smiling face with sunglasses', 'visage souriant avec des lunettes de soleil'],
      ['face with monocle', 'visage au monocle'],
      ['smiling face with horns', 'visage souriant avec des cornes'],
      ['angry face with horns', 'visage en colère avec des cornes'],
      ['stadium', 'stade'],
      ['shrimp', 'crevette'],
      ['flag: cameroon', 'drapeau du Cameroun'],
      ['flag: burundi', 'drapeau du Burundi'],
      ['flag: chile', 'drapeau du Chili'],
      ['flag: singapore', 'drapeau de Singapour'],
      ['spouting whale', 'baleine qui jaillit'],
      ['last quarter moon face', 'visage de lune du dernier quartier'],
      ['abacus', 'abaque'],
      ['up arrow', 'flèche vers le haut'],
      ['motor scooter', 'scooter'],
      ['see no evil monkey', 'singe qui ne voit pas le mal'],
      ['globe showing americas', 'globe montrant les Amériques'],
      ['bookmark tabs', 'onglets de marque-pages'],
      ['woman\'s boot', 'botte de femme'],
      ['two o\'clock', 'deux heures'],
      ['fishing pole', 'canne à pêche'],
      ['pound banknote', 'billet de livre sterling'],
      ['woman walking facing right', 'femme qui marche vers la droite'],
      ['anchor', 'ancre'],
      ['locked with pen', 'cadenas avec stylo'],
      ['rabbit', 'lapin'],
      ['white large square', 'grand carré blanc'],
      ['person with crown', 'personne avec une couronne'],
      ['woman farmer', 'femme agricultrice'],
      ['japanese “vacancy” button', 'bouton japonais « libre »'],
      ['kimono', 'kimono'],
      ['shallow pan of food', 'poêle peu profonde avec nourriture']
    ]);

    if (phraseMap.has(lower)) {
      return phraseMap.get(lower);
    }

    const replacements = [
      [/\bwith\b/gi, 'avec'],
      [/\band\b/gi, 'et'],
      [/\bof\b/gi, 'de'],
      [/\bthe\b/gi, 'le'],
      [/\ba\b/gi, 'un'],
      [/\bto\b/gi, 'à'],
      [/\bfor\b/gi, 'pour'],
      [/\bby\b/gi, 'par'],
      [/\bon\b/gi, 'sur'],
      [/\bslightly\b/gi, 'légèrement'],
      [/\bsmiling\b/gi, 'souriant'],
      [/\bgrinning\b/gi, 'souriant'],
      [/\bbeaming\b/gi, 'rayonnant'],
      [/\bshushing\b/gi, 'chuchotant'],
      [/\bthinking\b/gi, 'réfléchissant'],
      [/\bsaluting\b/gi, 'qui salue'],
      [/\bneutral\b/gi, 'neutre'],
      [/\bexpressionless\b/gi, 'sans expression'],
      [/\bopen\b/gi, 'ouvert'],
      [/\bclosed\b/gi, 'fermé'],
      [/\bblack\b/gi, 'noir'],
      [/\bwhite\b/gi, 'blanc'],
      [/\bblue\b/gi, 'bleu'],
      [/\bgreen\b/gi, 'vert'],
      [/\bred\b/gi, 'rouge'],
      [/\byellow\b/gi, 'jaune'],
      [/\bpurple\b/gi, 'violet'],
      [/\borange\b/gi, 'orange'],
      [/\bbrown\b/gi, 'brun'],
      [/\bgray\b/gi, 'gris'],
      [/\bgrey\b/gi, 'gris'],
      [/\bheart-eyes\b/gi, 'yeux en forme de cœur'],
      [/\bheart\b/gi, 'cœur'],
      [/\bhearts\b/gi, 'cœurs'],
      [/\beyes\b/gi, 'yeux'],
      [/\beye\b/gi, 'œil'],
      [/\bfaces\b/gi, 'visages'],
      [/\bface\b/gi, 'visage'],
      [/\bhand\b/gi, 'main'],
      [/\bhands\b/gi, 'mains'],
      [/\bhead\b/gi, 'tête'],
      [/\bmask\b/gi, 'masque'],
      [/\bthermometer\b/gi, 'thermomètre'],
      [/\bskull\b/gi, 'crâne'],
      [/\bcowboy\b/gi, 'cowboy'],
      [/\bhat\b/gi, 'chapeau'],
      [/\bpoo\b/gi, 'caca'],
      [/\bghost\b/gi, 'fantôme'],
      [/\balien\b/gi, 'extraterrestre'],
      [/\brobot\b/gi, 'robot'],
      [/\bman\b/gi, 'homme'],
      [/\bwoman\b/gi, 'femme'],
      [/\bperson\b/gi, 'personne'],
      [/\bboy\b/gi, 'garçon'],
      [/\bgirl\b/gi, 'fille'],
      [/\bbaby\b/gi, 'bébé'],
      [/\bchild\b/gi, 'enfant'],
      [/\bpolice\b/gi, 'police'],
      [/\bfire\b/gi, 'feu'],
      [/\bwater\b/gi, 'eau'],
      [/\brocket\b/gi, 'fusée'],
      [/\bstar\b/gi, 'étoile'],
      [/\bsmoke\b/gi, 'fumée'],
      [/\bexploding\b/gi, 'explosif'],
      [/\bflushed\b/gi, 'rougi'],
      [/\bdizzy\b/gi, 'étourdi'],
      [/\bparty\b/gi, 'fête'],
      [/\bzany\b/gi, 'loufoque'],
      [/\bcold\b/gi, 'froid'],
      [/\bhot\b/gi, 'chaud'],
      [/\bgreen\b/gi, 'vert'],
      [/\bblue\b/gi, 'bleu'],
      [/\bred\b/gi, 'rouge'],
      [/\bblack\b/gi, 'noir'],
      [/\bwhite\b/gi, 'blanc'],
      [/\bbrown\b/gi, 'brun'],
      [/\bgray\b/gi, 'gris'],
      [/\bgrey\b/gi, 'gris'],
      [/\bbutton\b/gi, 'bouton'],
      [/\bjapanese\b/gi, 'japonais'],
      [/\bfrench\b/gi, 'français'],
      [/\bflag\b/gi, 'drapeau'],
      [/\btears\b/gi, 'larmes'],
      [/\btear\b/gi, 'larme'],
      [/\bjoy\b/gi, 'joie'],
      [/\brolling\b/gi, 'qui roule'],
      [/\bblowing\b/gi, 'qui envoie'],
      [/\bkiss\b/gi, 'baiser'],
      [/\bkisses\b/gi, 'baisers'],
      [/\braised\b/gi, 'levé'],
      [/\beyebrow\b/gi, 'sourcil'],
      [/\beyebrows\b/gi, 'sourcils'],
      [/\bupside-down\b/gi, 'à l’envers'],
      [/\bmelting\b/gi, 'fondant'],
      [/\bwinking\b/gi, 'qui fait un clin d’œil'],
      [/\bhalo\b/gi, 'auréole'],
      [/\bstar-struck\b/gi, 'ébloui'],
      [/\bpeeking\b/gi, 'qui regarde à travers'],
      [/\bmedical\b/gi, 'médical'],
      [/\bsymbols\b/gi, 'symboles'],
      [/\bsteam\b/gi, 'vapeur'],
      [/\bnose\b/gi, 'nez'],
      [/\bsavoring\b/gi, 'qui savoure'],
      [/\btongue\b/gi, 'langue'],
      [/\bmoney-mouth\b/gi, 'bouche en forme de monnaie'],
      [/\bsquinting\b/gi, 'aux yeux plissés'],
      [/\bspiral\b/gi, 'en spirale'],
      [/\bcrossed-out\b/gi, 'barrés'],
      [/\bthermometer\b/gi, 'thermomètre'],
      [/\bmonocle\b/gi, 'monocle'],
      [/\bhorns\b/gi, 'cornes'],
      [/\bexhaling\b/gi, 'qui expire'],
      [/\blying\b/gi, 'qui ment'],
      [/\bsmirking\b/gi, 'narquois'],
      [/\bunamused\b/gi, 'pas amusé'],
      [/\bgrimacing\b/gi, 'grimaçant'],
      [/\bclouds\b/gi, 'nuages']
    ];

    let result = normalized.replace(/-/g, ' ');
    replacements.forEach(([regex, replacement]) => {
      result = result.replace(regex, replacement);
    });
    result = result.replace(/\s+/g, ' ').trim();
    return result;
  }

  const EMOJI_LIBRARY = RAW_EMOJI_ENTRIES.filter((emoji) => !SKIN_TONE_VARIANT_REGEX.test(emoji.name)).map((emoji, index, arr) => {
    const rarityName = (() => {
      const mythicNames = new Set([
        'dodo',
        'pile of poo',
        'anatomical heart',
        'prince',
        'princess',
        'genie',
        'kiss',
        'unicorn',
        'hyacinth',
        'four leaf clover',
        'birthday cake',
        'map of Japan',
        'statue of liberty',
        'volcano',
        'race car',
        'flying saucer',
        'full moon',
        'jack-o-lantern',
        'piñata',
        'underwear',
        'ring',
        'gem stone',
        'dvd',
        'shield',
        'rabbit',
        'radioactive',
        'flag: France'
      ]);

      if (emoji.symbol === '🦝' || emoji.name === 'raccoon') {
        return 'Légendaire Ultime';
      }

      if (mythicNames.has(emoji.name)) {
        return 'Mythique';
      }

      const ratio = index / Math.max(1, arr.length);
      if (ratio < 0.7) return 'Commun';
      if (ratio < 0.9) return 'Peu commun';
      if (ratio < 0.97) return 'Rare';
      if (ratio < 0.995) return 'Épique';
      return 'Légendaire';
    })();
    const rarity = getRarityByName(rarityName);
    return {
      ...emoji,
      name: translateEmojiName(emoji.name),
      rarity,
      rate: rarity.rate
    };
  });

  global.EmojiTCGData = {
    RARITY_CONFIG,
    EMOJI_LIBRARY,
    getRarityByName,
    getRarityRank,
    translateEmojiName
  };
})(window);
