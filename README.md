# Noocarb – Formulaire commercial (maquette React + Tailwind + Recharts)

## Démarrer en local
```bash
npm install
npm run dev
```

## Build de production
```bash
npm run build
# dossier dist/ à déployer (Netlify Drop, Vercel, Cloudflare Pages…)
```

## Déploiement rapide
- **Netlify (build auto)** : crée un dépôt GitHub, pousse ce dossier, puis "New site from Git" → framework Vite → build par défaut.
- **Vercel** : Importer depuis Git, framework Vite → build par défaut.
- **Netlify Drop** (drag & drop) : construire localement (`npm run build`) puis glisser le **dossier `dist/`**.

## Personnalisation
- Modifier les couleurs du thème dans `src/App.jsx` (const THEME) ou via Tailwind tokens.
- Aucune donnée n'est envoyée : export JSON local pour test.

Etapes incluses : Flottes & mobilité, Autres données d'entrée, Options (GNC/H₂/Élec/Diesel), Récap, **Graphiques & score**, **Pistes d'amélioration**.
