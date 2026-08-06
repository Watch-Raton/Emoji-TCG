$source = Get-Content 'emoji-test-15.1.json' -Raw | ConvertFrom-Json
$entries = foreach ($item in $source) {
    [PSCustomObject]@{
        symbol = $item.symbol
        name = $item.name
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
