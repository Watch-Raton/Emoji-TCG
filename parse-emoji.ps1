$lines = Get-Content 'emoji-test-15.1.txt' -Encoding UTF8
$group = ''
$subgroup = ''
$entries = @()

foreach ($line in $lines) {
    $t = $line.Trim()
    if ([string]::IsNullOrEmpty($t)) { continue }
    if ($t.StartsWith('#')) {
        if ($t -like '# group:*') {
            $group = $t.Substring(8).Trim()
            $subgroup = ''
        } elseif ($t -like '# subgroup:*') {
            $subgroup = $t.Substring(11).Trim()
        }
        continue
    }

    $parts = $t.Split('#')
    if ($parts.Count -lt 2) { continue }

    $left = $parts[0].Trim()
    $right = $parts[1].Trim()
    if (-not $left.Contains(';')) { continue }

    $status = $left.Substring($left.LastIndexOf(';') + 1).Trim()
    if ($status -ne 'fully-qualified') { continue }

    $cpPart = $left.Split(';')[0].Trim()
    $codePoints = $cpPart -split '\s+' | ForEach-Object { [Convert]::ToInt32($_, 16) }

    function Get-UnicodeChar([int]$codePoint) {
        if ($codePoint -le 0xFFFF) {
            return [char]$codePoint
        }
        $u = $codePoint - 0x10000
        $high = [char](0xD800 + ($u -shr 10))
        $low = [char](0xDC00 + ($u -band 0x3FF))
        return "${high}${low}"
    }

    $chars = @()
    foreach ($cp in $codePoints) {
        $chars += Get-UnicodeChar $cp
    }
    $symbol = -join $chars

    if ($right -match '^(?<symbol>\S+)\s+E[0-9\.]+\s+(?<name>.+)$') {
        $name = $Matches['name'].Trim()
    } else {
        $rightParts = $right -split '\s+' | Where-Object { $_ -ne '' }
        $name = if ($rightParts.Count -gt 1) { ($rightParts[1..($rightParts.Count - 1)] -join ' ') } else { $right }
    }

    $entries += [PSCustomObject]@{
        symbol = $symbol
        name = $name
        group = $group
        subgroup = $subgroup
    }
}

$json = $entries | ConvertTo-Json -Depth 5
Set-Content -Path 'emoji-test-15.1.json' -Value $json -Encoding UTF8
Write-Output "Wrote $($entries.Count) entries to emoji-test-15.1.json"