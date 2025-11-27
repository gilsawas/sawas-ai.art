# Instructions pour Intégrer les Assets

Gil, voici comment ajouter vos images au site :

## 1. Logo LUZ Cercle Doré

**Source:** Image 1 que vous m'avez fournie
**Fichier:** `image (3).png`
**Action:**
```bash
# Copier dans:
assets/logos/luz-circle.png

# Utilisation dans HTML:
<img src="assets/logos/luz-circle.png" alt="Logo LUZ" class="logo-luz" />
```

**Optimisation recommandée:**
- Détourage du fond noir → transparent
- Format PNG-24 avec alpha channel
- Taille recommandée: 512×512px
- Outil: Photoshop, GIMP, ou remove.bg

## 2. Logo "LUZ, FUSION ET CONSCIENCE"

**Source:** Image 5
**Fichier:** `ChatGPT Image 30 oct. 2025, 02_15_31.png`
**Action:**
```bash
# Copier dans:
assets/logos/luz-fusion-conscience.png

# Utilisation: backgrounds, headers alternatifs
```

## 3. Logo Sawas-ai Typographique

**Source:** Image 6
**Fichier:** `ChatGPT Image 30 oct. 2025, 02_19_10.png`
**Action:**
```bash
# Copier dans:
assets/logos/sawas-ai-logo.png

# Utilisation: header, footer
```

## 4. Signature Gil Manuscrite

**Source:** Image 2
**Fichier:** `gil_sawas_signature_black (2).png`
**Action:**
```bash
# Copier dans:
assets/logos/signature-gil.png

# Utilisation dans footer:
<img src="assets/logos/signature-gil.png" alt="Signature Gil Sawas" class="footer-logo" />
```

## 5. Photo Gil Portrait

**Source:** Image 3
**Fichier:** `5Crrl7iATTzbctK5ogbN (3).jpg`
**Action:**
```bash
# Copier dans:
assets/images/gil-portrait.jpg

# Utilisation: Page "À propos"
```

**Optimisation recommandée:**
- Crop portrait vertical optimal
- Format WebP + fallback JPG
- Taille: 800×1200px
- Compression: 85% qualité

## 6. Icônes Réseaux Sociaux

**Source:** Image 4
**Fichier:** `Capture d'écran 2025-06-07 162030.png`
**Action:**
```bash
# Extraire individuellement et copier dans:
assets/icons/linkedin.png
assets/icons/x-twitter.png
assets/icons/youtube.png
assets/icons/tiktok.png
assets/icons/facebook.png
```

**Chaque icône:**
- Taille: 64×64px
- Format: PNG transparent
- Style: Cercle doré avec logo

## Commandes Rapides

```bash
# Depuis le dossier où sont vos images:

# 1. Logos
cp "image (3).png" /home/user/sawas-ai.art/assets/logos/luz-circle.png
cp "ChatGPT Image 30 oct. 2025, 02_15_31.png" /home/user/sawas-ai.art/assets/logos/luz-fusion-conscience.png
cp "ChatGPT Image 30 oct. 2025, 02_19_10.png" /home/user/sawas-ai.art/assets/logos/sawas-ai-logo.png
cp "gil_sawas_signature_black (2).png" /home/user/sawas-ai.art/assets/logos/signature-gil.png

# 2. Images
cp "5Crrl7iATTzbctK5ogbN (3).jpg" /home/user/sawas-ai.art/assets/images/gil-portrait.jpg

# 3. Icônes (à extraire manuellement de la capture d'écran)
# ou utiliser les SVG temporaires déjà dans index.html
```

## Fichiers à Modifier Ensuite

Une fois les images copiées, remplacer dans `index.html`:

1. **Ligne ~68** : SVG logo LUZ → `<img src="assets/logos/luz-circle.png" />`
2. **Ligne ~460** : SVG footer logo → `<img src="assets/logos/signature-gil.png" />`
3. **Lignes 481-527** : SVG icônes → `<img src="assets/icons/[nom].png" />`

## Notes

- Les SVG actuels dans index.html sont des placeholders élégants
- Ils fonctionnent parfaitement en attendant vos vraies images
- Quand vous ajouterez les vraies images, le design sera encore meilleur!
- Les icônes sociales n'ont PAS de liens pour l'instant (comme demandé)
