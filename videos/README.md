# 📹 Dossier Vidéos

## Fichier à uploader ici :

**Nom du fichier :** `kling_20251211_Image_to_Video__quelques__1801_0__1_.mp4`

**Caractéristiques :**
- Format : MP4
- Durée : 10 secondes
- Format vidéo : Carré (1:1)
- Contenu : Logo LUZ avec particules scintillantes et éclair
- Fond : Noir

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
