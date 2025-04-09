# Spotify Clone 🎵

Bienvenue dans **Spotify Clone**, une application web développée avec **React** et **Vite**. Ce projet offre une expérience immersive pour écouter de la musique, naviguer dans des albums et afficher des paroles synchronisées.

---

## Fonctionnalités 🚀

### 1. **Lecture audio**
   - Contrôles intuitifs : lecture/pause, précédent/suivant, et réglage du volume.
   - Interface fluide pour une expérience utilisateur agréable.

### 2. **Affichage des paroles synchronisées**
   - Paroles affichées en temps réel, synchronisées avec la lecture audio.
   - Format des paroles : fichiers `.lrc` contenant des timestamps pour chaque ligne.
   - Exemple :
     ```plaintext
     [01:21.00] Tu ne pourras jamais être libre
     [01:23.00] Tant que tu resteras enchaîné
     ```

### 3. **Navigation intuitive**
   - Accès facile aux sections : page d'accueil, albums, recherche, et affichage des paroles.
   - Design responsive pour une utilisation sur mobile, tablette et ordinateur.

### 4. **Recherche avancée**
   - Recherchez des chansons, artistes ou genres directement depuis l'application.
   - Suggestions dynamiques pour une expérience utilisateur améliorée.

### 5. **Commandes vocales**
   - Contrôlez la lecture avec des commandes vocales simples, comme :
     - "Joue la chanson suivante"
     - "Mets en pause"
     - "Reprends la lecture"

### 6. **Gestion des playlists**
   - Créez, modifiez et supprimez vos playlists personnalisées.
   - Ajoutez ou retirez des chansons à la volée.

### 7. **Mode hors ligne (en développement)**
   - Téléchargez vos chansons préférées pour les écouter sans connexion Internet.

---

## Aperçu des paroles synchronisées 🎤

Les fichiers `.lrc` utilisés pour les paroles contiennent des timestamps pour chaque ligne, permettant une synchronisation précise avec la musique. Voici un extrait d'exemple :

```plaintext
[01:21.00] Tu ne pourras jamais être libre
[01:23.00] Tant que tu resteras enchaîné
[01:24.00] Oh mon âme
[01:28.00] Ne te trouble point
[01:30.00] Refrain :
[01:34.00] Tout va bien
```

Ces fichiers sont stockés dans le dossier public/lyrics/ et sont chargés dynamiquement par l'application.

## Installation et exécution 🚀
### 1. **Clonez ce dépôt :** 🛠️
```bash
    git clone https://github.com/votre-utilisateur/spotify-clone.git
    cd spotify-clone
 ```

### 2. **Installez les dépendances :** 
```bash
    npm install
 ```

### 3. **Lancez le serveur de développement :** 
```bash
    npm install
 ```
npm run dev