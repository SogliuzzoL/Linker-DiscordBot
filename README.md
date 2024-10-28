
# Linker-DiscordBot

**Linker-DiscordBot** est un bot Discord permettant de générer des codes de liaison afin de connecter un compte Discord à une autre plateforme ou service de manière sécurisée.

## Fonctionnalités
- Génération de codes de liaison uniques pour chaque utilisateur.
- Connexion sécurisée et rapide entre Discord et des services tiers.
- Stockage des données de liaison dans une base MongoDB.

## Prérequis

- **Node.js** v20 ou plus récent
- **MongoDB** (base de données NoSQL pour le stockage des données de liaison)

## Installation des dépendances

Pour installer les dépendances, exécutez les commandes suivantes :

```bash
npm install discord.js
npm install pm2 -g
```

## Configuration

1. Ouvrez le fichier `config.js`.
2. Modifiez les informations de connexion pour MongoDB.
3. Remplacez le token de votre bot Discord par le vôtre, disponible dans le [portail de développeur Discord](https://discord.com/developers/applications).

## Lancement du programme

1. **Vérification de fonctionnement :**

   Utilisez la commande suivante pour tester le bot :

   ```bash
   node app.js
   ```

2. **Lancement en production :**

   Pour lancer le bot en production, utilisez une commande telle que `pm2` ou une autre méthode de déploiement de votre choix. Par exemple :

   ```bash
   pm2 start app.js
   ```

---
