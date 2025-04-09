# Spotify Clone 🎵

Ce projet est une application web de type clone de Spotify, développée avec **React** et **Vite**. Il permet de naviguer dans des albums, de lire des chansons, d'afficher les paroles synchronisées et d'utiliser des commandes vocales pour contrôler la lecture.

## Fonctionnalités 🚀

### 1. **Lecture audio**
- Permet de lire des chansons avec des contrôles intuitifs : lecture/pause, précédent/suivant, et réglage du volume.
- Interface utilisateur fluide pour une expérience agréable.

### 2. **Affichage des paroles synchronisées**
- Les paroles des chansons sont affichées en temps réel, synchronisées avec la lecture audio.
- Format des paroles : fichiers `.lrc` (comme dans le fichier `song9.lrc`), contenant des timestamps pour chaque ligne de texte.
- Exemple :
  ```plaintext
  [01:21.00] Tu ne pourras jamais être libre
  [01:23.00] Tant que tu resteras enchaîné

  3. Navigation intuitive
Accédez facilement à différentes sections de l'application : page d'accueil, albums, recherche, et affichage des paroles.
Design responsive pour une utilisation sur mobile, tablette et ordinateur.
4. Recherche avancée
Recherchez des chansons, artistes ou genres directement depuis l'application.
Suggestions dynamiques pour une expérience utilisateur améliorée.
5. Commandes vocales
Contrôlez la lecture avec des commandes vocales simples, comme :
"Joue la chanson suivante"
"Mets en pause"
"Reprends la lecture"
6. Gestion des playlists
Créez, modifiez et supprimez vos playlists personnalisées.
Ajoutez ou retirez des chansons à la volée.
7. Mode hors ligne (en développement)
Téléchargez vos chansons préférées pour les écouter sans connexion Internet.

Aperçu des paroles synchronisées 🎤
Les fichiers .lrc utilisés pour les paroles contiennent des timestamps pour chaque ligne, permettant une synchronisation précise avec la musique. Voici un extrait d'exemple :

[01:21.00] Tu ne pourras jamais être libre
[01:23.00] Tant que tu resteras enchaîné
[01:24.00] Oh mon âme
[01:28.00] Ne te trouble point
[01:30.00] Refrain :
[01:34.00] Tout va bien

Ces fichiers sont stockés dans le dossier public/lyrics/ et sont chargés dynamiquement par l'application.

Installation et exécution 🛠️
Clonez ce dépôt :

bash git clone https://github.com/votre-utilisateur/spotify-clone.git
cd spotify-clone

Installez les dépendances :
bash npm install

Lancez le serveur de développement :
npm run dev