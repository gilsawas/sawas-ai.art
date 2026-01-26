# Dossier Videos

## Fichiers requis pour le Hero Triple :

### 1. Video "Gil Through Time" (GAUCHE)

**Nom du fichier :** `gil_through_time_FINAL_v3.mp4`

**Caracteristiques :**
- Format : MP4 (H.264)
- Resolution : 1920x1080 (Full HD)
- Duree : 30 secondes
- Poids : ~3.6 MB
- Contenu : Video personnelle "Gil Through Time"
- Usage : Hero section gauche (background)

### 2. Video Logo LUZ (CENTRE) - DEJA PRESENT

**Nom du fichier :** `kling_20251211_Image_to_Video__pas_de_mo_1543_0 (1).mp4`

**Caracteristiques :**
- Format : MP4
- Duree : ~10 secondes
- Format video : Carre (1:1)
- Contenu : Logo LUZ avec particules scintillantes
- Usage : Hero section centre (background anime)

## Instructions Upload :

1. Place le fichier vidéo dans ce dossier `/videos/`
2. Assure-toi que le nom du fichier est exact (avec tous les underscores)
3. Vérifie que le fichier n'est pas trop lourd (idéalement < 5 MB pour performance web)

## Optimisation (optionnel) :

Si le fichier est trop lourd, tu peux le compresser avec :
- HandBrake (gratuit)
- FFmpeg
- Ou services en ligne comme CloudConvert

Commande FFmpeg pour compression :
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow output.mp4
```

## Test :

Après upload, ouvre `index.html` dans un navigateur pour vérifier que la vidéo se charge correctement.

---

**Note :** La page d'accueil est configurée pour démarrer automatiquement la vidéo en boucle (autoplay, muted, loop).
