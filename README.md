# Emoji-TCG

`Emoji-TCG` est un jeu web de collection d’émojis.

## Comment ça marche

- Ouvre des boosters de 10 émojis.
- Tu peux ouvrir jusqu’à 3 boosters par heure.
- Chaque émoji a une rareté : `Commun`, `Peu commun`, `Rare`, `Épique`, `Légendaire`.
- Les émojis sont tirés aléatoirement depuis une bibliothèque et ajoutés à ta collection.

## Objectif

- Compléter ta collection d’émojis.
- Découvrir de nouvelles cartes et suivre ton score.
- Consulter les taux d’obtention par rareté.

## Interface

- Page principale : ouvre des boosters, affiche les boosters disponibles, le temps restant, la collection et le dernier booster obtenu.
- Bibliothèque complète : liste tous les émojis disponibles, permet la recherche et le tri par taux.

## Technique

- `emoji-data.js` contient la liste des émojis et leurs noms.
- `app.js` gère l’ouverture des boosters, l’état de la collection et l’affichage.
- Les données du joueur sont stockées dans `localStorage`.
