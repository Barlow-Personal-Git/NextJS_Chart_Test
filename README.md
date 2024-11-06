# NextJS_Chart_Test
 
Ceci est fait avec [Next.js](https://nextjs.org).

## Commencer

Tout d'abord, vous devez installer les dépendances en utilisant l'une des commandes suivantes :
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Ensuite, construisez le projet en utilisant :
```bash
npm run build
# or
yarn run build
# or
pnpm run build
# or
bun run build
```

Finalement, démarrez le serveur de développement :
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## Déploiement sur Vercel

Ce projet est déployé sur Vercel 
Le lien est le suivant : [https://next-js-chart-test.vercel.app/](https://next-js-chart-test.vercel.app/)

## Codes

Le fichier principal est `page.tsx` dans le dossier `src\app`.
Les composants se trouvent dans `src\app\composants`
`composants.jsx` est le composant parent des 3 autres composants :  `barre_filtre.jsx`, `graphiques.jsx` et `prix.jsx`;
J'ai ajouté des commentaires pour simplifier la compréhension de mes fichiers.

## Fonctionnalités

- Les données peuvent être filtrées.
- Les barres dans les graphiques peuvent être cliquées pour effectuer un zoom avant et cliquer à nouveau permet de revenir en arrière.
- Le prix moyen change en fonction des données disponibles selon le filtrage.
