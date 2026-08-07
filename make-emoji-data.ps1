function Translate-EmojiName([string]$name) {
    if (-not $name) { return $name }

    $normalized = $name.Trim()

    $phraseReplacements = @{
        'rolling on the floor laughing' = 'roulant par terre de rire'
        'face with tears of joy' = 'visage avec des larmes de joie'
        'face with steam from nose' = 'visage avec de la vapeur sortant du nez'
        'face with hand over mouth' = 'visage avec la main sur la bouche'
        'face with open eyes and hand over mouth' = 'visage avec les yeux ouverts et la main sur la bouche'
        'face with peeking eye' = 'visage avec un œil qui regarde'
        'face with raised eyebrow' = 'visage avec un sourcil levé'
        'face with diagonal mouth' = 'visage avec une bouche oblique'
        'face with medical mask' = 'visage avec un masque médical'
        'face with thermometer' = 'visage avec un thermomètre'
        'face with head-bandage' = 'visage avec un bandage'
        'face with rolling eyes' = 'visage les yeux levés'
        'smiling face with heart-eyes' = 'visage souriant aux yeux en forme de cœur'
        'smiling face with smiling eyes' = 'visage souriant aux yeux souriants'
        'smiling face with halo' = 'visage souriant avec une auréole'
        'smiling face with hearts' = 'visage souriant avec des cœurs'
        'face blowing a kiss' = 'visage soufflant un baiser'
        'winking face' = 'visage faisant un clin d’œil'
        'grinning face with sweat' = 'visage souriant avec de la sueur'
        'cowboy hat face' = 'visage avec un chapeau de cowboy'
        'zipper-mouth face' = 'visage bouche zippée'
        'cold face' = 'visage froid'
        'hot face' = 'visage chaud'
        'woozy face' = 'visage étourdi'
        'sleeping face' = 'visage endormi'
        'pensive face' = 'visage pensif'
        'disappointed face' = 'visage déçu'
        'angry face with horns' = 'visage en colère avec des cornes'
        'smiling face with sunglasses' = 'visage souriant avec des lunettes de soleil'
        'nerd face' = 'visage de nerd'
        'clown face' = 'visage de clown'
        'pile of poo' = 'tas de caca'
        'skull and crossbones' = 'crâne et os croisés'
        'alien monster' = 'monstre extraterrestre'
        'grinning squinting face' = 'visage souriant et plissé'
        'beaming face with smiling eyes' = 'visage rayonnant aux yeux souriants'
        'face with tears of joy' = 'visage en larmes de joie'
        'face savoring food' = 'visage savourant de la nourriture'
        'face with tongue' = 'visage avec la langue dehors'
        'hugging face' = 'visage câlin'
        'shushing face' = 'visage chut'
        'thinking face' = 'visage pensif'
        'loudly crying face' = 'visage en pleurs'
        'face screaming in fear' = 'visage hurlant de peur'
        'face with symbols on mouth' = 'visage avec des symboles sur la bouche'
        'star-struck' = 'ébloui'
        'Japanese “free of charge” button' = 'bouton japonais « gratuit »'
        'Japanese “not free of charge” button' = 'bouton japonais « payant »'
        'FREE button' = 'bouton GRATUIT'
        'flag:' = 'Drapeau :'
    }

    $lower = $normalized.ToLowerInvariant()
    foreach ($pattern in $phraseReplacements.Keys) {
        if ($lower -eq $pattern.ToLowerInvariant()) {
            return $phraseReplacements[$pattern]
        }
    }

    $result = $normalized

    $replacements = @{
        '\bwith\b' = 'avec'
        '\band\b' = 'et'
        '\bof\b' = 'de'
        '\bthe\b' = 'le'
        '\ba\b' = 'un'
        '\bto\b' = 'à'
        '\bfor\b' = 'pour'
        '\bby\b' = 'par'
        '\bon\b' = 'sur'
        '\bsmiling\b' = 'souriant'
        '\bgrinning\b' = 'souriant'
        '\bwinking\b' = 'faisant un clin d’œil'
        '\bbowing\b' = 's’inclinant'
        '\bclosed\b' = 'fermé'
        '\bopen\b' = 'ouvert'
        '\bbig\b' = 'grand'
        '\bsmall\b' = 'petit'
        '\bheart-eyes\b' = 'yeux en forme de cœur'
        '\bheart\b' = 'cœur'
        '\bhearts\b' = 'cœurs'
        '\beyes\b' = 'yeux'
        '\beye\b' = 'œil'
        '\bface\b' = 'Visage'
        '\bfaces\b' = 'Visages'
        '\bhand\b' = 'main'
        '\bhands\b' = 'mains'
        '\bhead\b' = 'tête'
        '\bhelmet\b' = 'casque'
        '\bmask\b' = 'masque'
        '\bthermometer\b' = 'thermomètre'
        '\bblood\b' = 'sang'
        '\bskull\b' = 'crâne'
        '\bcowboy\b' = 'cowboy'
        '\bhat\b' = 'chapeau'
        '\bpoo\b' = 'caca'
        '\bghost\b' = 'fantôme'
        '\balien\b' = 'extraterrestre'
        '\brobot\b' = 'robot'
        '\bman\b' = 'homme'
        '\bwoman\b' = 'femme'
        '\bperson\b' = 'personne'
        '\bboy\b' = 'garçon'
        '\bgirl\b' = 'fille'
        '\bbaby\b' = 'bébé'
        '\bchild\b' = 'enfant'
        '\bpolice\b' = 'police'
        '\bfire\b' = 'feu'
        '\bwater\b' = 'eau'
        '\brain\b' = 'cerveau'
        '\brocket\b' = 'fusée'
        '\bstar\b' = 'étoile'
        '\bsmoke\b' = 'fumée'
        '\bexploding\b' = 'explosif'
        '\bflushed\b' = 'rougi'
        '\bdizzy\b' = 'étourdi'
        '\bparty\b' = 'fête'
        '\bzany\b' = 'loufoque'
        '\bcold\b' = 'froid'
        '\bhot\b' = 'chaud'
        '\bgreen\b' = 'vert'
        '\bblue\b' = 'bleu'
        '\bred\b' = 'rouge'
        '\bblack\b' = 'noir'
        '\bwhite\b' = 'blanc'
        '\bbrown\b' = 'brun'
        '\bgray\b' = 'gris'
        '\bgrey\b' = 'gris'
        '\bmedium-light skin tone\b' = 'teint moyen clair'
        '\bmedium-dark skin tone\b' = 'teint moyen foncé'
        '\bdark skin tone\b' = 'teint foncé'
        '\blight skin tone\b' = 'teint clair'
        '\bskin tone\b' = 'teint'
        '\bflag\b' = 'drapeau'
        '\bbutton\b' = 'bouton'
        '\bJapanese\b' = 'japonais'
        '\bIsrael\b' = 'Israël'
        '\bFrench\b' = 'français'
    }

    foreach ($pattern in $replacements.Keys) {
        $result = [regex]::Replace($result, $pattern, $replacements[$pattern], 'IgnoreCase')
    }

    $result = $result -replace '-', ' '
    $result = $result -replace ' +', ' '
    return $result.Trim()
}

$source = Get-Content 'emoji-test-15.1.json' -Raw | ConvertFrom-Json
$entries = foreach ($item in $source) {
    $translatedName = Translate-EmojiName($item.name)
    [PSCustomObject]@{
        symbol = $item.symbol
        name = $translatedName
        group = $item.group
        subgroup = $item.subgroup
        family = if ($item.group) { $item.group } else { 'Autres' }
    }
}

function Get-RarityForIndex([int]$index, [int]$total) {
    $ratio = $index / [math]::Max(1, $total)
    if ($ratio -lt 0.7) { return 'Commun' }
    if ($ratio -lt 0.9) { return 'Peu commun' }
    if ($ratio -lt 0.97) { return 'Rare' }
    if ($ratio -lt 0.995) { return 'Épique' }
    return 'Légendaire'
}

$rawJson = $entries | ConvertTo-Json -Depth 5

$js = @"
(function (global) {
  const RARITY_CONFIG = [
    { id: 'common', name: 'Commun', rate: 70, weight: 70, color: '#60a5fa' },
    { id: 'uncommon', name: 'Peu commun', rate: 20, weight: 20, color: '#34d399' },
    { id: 'rare', name: 'Rare', rate: 7, weight: 7, color: '#a78bfa' },
    { id: 'epic', name: 'Épique', rate: 2.5, weight: 2.5, color: '#f59e0b' },
    { id: 'legendary', name: 'Légendaire', rate: 0.5, weight: 0.5, color: '#fb7185' }
  ];

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

  const RAW_EMOJI_ENTRIES = $rawJson;
  const EMOJI_LIBRARY = RAW_EMOJI_ENTRIES.map((emoji, index, arr) => {
    const rarityName = (() => {
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
      rarity,
      rate: rarity.rate
    };
  });

  global.EmojiTCGData = {
    RARITY_CONFIG,
    EMOJI_LIBRARY,
    getRarityByName,
    getRarityRank
  };
})(window);
"@

Set-Content -Path 'emoji-data.js' -Value $js -Encoding UTF8
Write-Output "Generated emoji-data.js with $($entries.Count) emoji entries."
