# 📦 Publishing Guide - tailwindcss-corner-shape

Ce guide explique comment publier le plugin `tailwindcss-corner-shape` sur GitHub et npm.

## 🚀 Prérequis

1. **Compte npm** : [Créer un compte](https://www.npmjs.com/signup) si nécessaire
2. **Compte GitHub** : Avoir accès à ton compte GitHub
3. **npm CLI** : Installé et configuré
4. **Git** : Installé et configuré

## 📋 Étapes de Publication

### 1. Préparer le Repository GitHub

```bash
# Se placer dans le dossier du plugin
cd src/lib/tailwind-plugins

# Initialiser un nouveau repo git (si pas déjà fait)
git init

# Créer le repo sur GitHub
# Option 1 : Via GitHub CLI
gh repo create tailwindcss-corner-shape --public --source=. --remote=origin

# Option 2 : Via l'interface GitHub
# 1. Aller sur github.com
# 2. Cliquer sur "New repository"
# 3. Nommer "tailwindcss-corner-shape"
# 4. Choisir "Public"
# 5. Ne pas initialiser avec README (on l'a déjà)
```

### 2. Premier Commit et Push

```bash
# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "feat: Initial release of tailwindcss-corner-shape v1.0.0

- Zero-config plugin for automatic corner-shape application
- Support for all CSS corner-shape keywords
- Custom superellipse values
- Full TypeScript support
- Comprehensive documentation"

# Ajouter le remote si ce n'est pas fait
git remote add origin https://github.com/bilalharouchi/tailwindcss-corner-shape.git

# Push vers GitHub
git push -u origin main
```

### 3. Installer les Dépendances de Build

```bash
# Installer tsup pour la compilation
npm install tsup@latest typescript@latest --save-dev

# Ou avec pnpm
pnpm add -D tsup@latest typescript@latest
```

### 4. Tester le Build Localement

```bash
# Compiler le plugin
npm run build

# Vérifier que dist/ contient les fichiers
ls -la dist/
# Devrait afficher :
# - index.js (CommonJS)
# - index.mjs (ESM)
# - index.d.ts (TypeScript types)
```

### 5. Se Connecter à npm

```bash
# Se connecter à npm
npm login

# Vérifier que tu es connecté
npm whoami
```

### 6. Publier sur npm

```bash
# Publier en version 1.0.0
npm publish

# Si c'est un scoped package (@bilal/tailwindcss-corner-shape)
npm publish --access public
```

### 7. Vérifier la Publication

```bash
# Vérifier sur npm
npm info tailwindcss-corner-shape

# Tester l'installation
mkdir test-install
cd test-install
npm init -y
npm install tailwindcss-corner-shape
```

## 🔄 Publier une Nouvelle Version

### 1. Mettre à Jour le Code

```bash
# Faire tes modifications...
git add .
git commit -m "feat: nouvelle fonctionnalité"
```

### 2. Bump la Version

```bash
# Pour un patch (1.0.0 → 1.0.1)
npm version patch

# Pour un minor (1.0.0 → 1.1.0)
npm version minor

# Pour un major (1.0.0 → 2.0.0)
npm version major
```

Cette commande :
- Met à jour `package.json`
- Crée un commit git
- Crée un tag git

### 3. Push et Publier

```bash
# Push les commits et les tags
git push && git push --tags

# Publier la nouvelle version
npm publish
```

### 4. Créer une Release GitHub

```bash
# Via GitHub CLI
gh release create v1.0.1 --title "v1.0.1" --notes "Bug fixes and improvements"

# Ou via l'interface GitHub :
# 1. Aller sur github.com/bilalharouchi/tailwindcss-corner-shape
# 2. Cliquer sur "Releases" → "Draft a new release"
# 3. Choisir le tag (v1.0.1)
# 4. Ajouter les release notes depuis CHANGELOG.md
```

## 📝 Semantic Versioning

Respecter les règles de versioning :

- **PATCH** (1.0.X) : Bug fixes, pas de breaking changes
- **MINOR** (1.X.0) : Nouvelles fonctionnalités, rétro-compatible
- **MAJOR** (X.0.0) : Breaking changes

## 🔒 Sécurité

### NPM 2FA (Recommandé)

```bash
# Activer 2FA sur npm
npm profile enable-2fa auth-and-writes
```

### Protected Branches sur GitHub

1. Aller dans Settings → Branches
2. Ajouter une règle pour `main`
3. Cocher "Require pull request reviews"

## 📊 Statistiques et Monitoring

### npm Stats

- **Dashboard npm** : https://www.npmjs.com/package/tailwindcss-corner-shape
- **Downloads** : Visibles sur la page npm

### GitHub Stats

- **Stars/Forks** : Sur la page du repo
- **Issues** : https://github.com/bilalharouchi/tailwindcss-corner-shape/issues

## 🐛 Troubleshooting

### Erreur "Package already exists"

```bash
# Le nom est pris, choisir un autre nom
# Modifier dans package.json et republier
```

### Erreur "You must verify your email"

```bash
# Vérifier ton email npm
npm profile get
```

### Erreur de Build

```bash
# Nettoyer et rebuild
rm -rf dist node_modules
npm install
npm run build
```

## 📚 Ressources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

## ✅ Checklist Avant Publication

- [ ] Tests locaux réussis
- [ ] Build fonctionne (`npm run build`)
- [ ] README.md à jour
- [ ] CHANGELOG.md à jour
- [ ] Version correctement bumpée
- [ ] Commit et tag créés
- [ ] Push vers GitHub
- [ ] npm login effectué
- [ ] Tests d'installation après publication

---

**Fait avec ❤️ par Bilal Harouchi**
