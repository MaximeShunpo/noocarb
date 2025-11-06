# Noocarb – Formulaire commercial (maquette React + Tailwind + Recharts)

Application web pour la configuration de mobilité et options énergétiques pour flottes de véhicules.

## 🚀 Démarrer en local

```bash
npm install
npm run dev
```

## 📦 Build de production

```bash
npm run build
# dossier dist/ à déployer (Netlify Drop, Vercel, Cloudflare Pages…)
```

## 🏗️ Structure du projet

```
src/
├── components/
│   ├── ui/              # Composants UI réutilisables
│   └── sections/        # Sections du formulaire
├── constants/           # Constantes et configuration
├── hooks/               # Hooks personnalisés
├── utils/               # Fonctions utilitaires
└── App.jsx              # Composant principal
```

## 🚢 Déploiement rapide

- **Netlify (build auto)** : crée un dépôt GitHub, pousse ce dossier, puis "New site from Git" → framework Vite → build par défaut.
- **Vercel** : Importer depuis Git, framework Vite → build par défaut.
- **Netlify Drop** (drag & drop) : construire localement (`npm run build`) puis glisser le **dossier `dist/`**.

## 🎨 Personnalisation

- Modifier les couleurs du thème dans `src/constants/theme.js`
- Aucune donnée n'est envoyée : export JSON local pour test.

## 📋 Fonctionnalités

Étapes incluses : Flottes & mobilité, Autres données d'entrée, Options (GNC/H₂/Élec/Diesel), Récap, **Graphiques & score**, **Pistes d'amélioration**.
