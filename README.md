Prérequis et Configuration de l'Application

Prérequis

1. Node.js : Assurez-vous que Node.js est installé. Vous pouvez le télécharger depuis https://nodejs.org/.
2. MongoDB : Assurez-vous que MongoDB est installé et en cours d'exécution. Vous pouvez le télécharger depuis https://www.mongodb.com/.
3. Redis : Assurez-vous que Redis est installé et en cours d'exécution. Vous pouvez le télécharger depuis https://redis.io/.

Configuration

1. Cloner le dépôt : Clonez le dépôt sur votre machine locale.
   git clone <repository-url>
   cd learning-platform-nosql

2. Installer les dépendances : Installez les packages Node.js requis.
   npm install

3. Configurer MongoDB : Assurez-vous que MongoDB est en cours d'exécution sur votre machine locale ou mettez à jour la chaîne de connexion dans app.js pour pointer vers votre instance MongoDB.
   await mongoose.connect('mongodb://localhost:27017/yourdbname', {  });

4. Configurer Redis : Assurez-vous que Redis est en cours d'exécution sur votre machine locale ou mettez à jour les paramètres de connexion Redis dans vos fichiers de service si nécessaire.

Exécution de l'application

1. Démarrer le serveur : Exécutez l'application avec Node.js.
   node src/app.js

2. Vérifier que le serveur fonctionne : Vous devriez voir un message indiquant que le serveur est en cours d'exécution et connecté à MongoDB.
   Connected to MongoDB!
   Server is running on port 3000
Utilisation de l'API
Vous pouvez utiliser des outils comme :
- Postman (https://www.postman.com/)
- curl (https://curl.se/)

pour interagir avec les points de terminaison de l'API.

Points de terminaison des Cours

1. Créer un cours :
   - Endpoint : POST /api/courses
   - Corps de la requête :
     {
       "title": "Titre du Cours",
       "description": "Description du Cours",
       "teacherId": "60d5f9b8f8d2c72b8c8b4567"
     }

2. Obtenir tous les cours :
   - Endpoint : GET /api/courses

3. Obtenir un cours spécifique :
   - Endpoint : GET /api/courses/:id
   - Exemple : GET /api/courses/60d5f9b8f8d2c72b8c8b4567

4. Obtenir des statistiques sur les cours :
   - Endpoint : GET /api/courses/stats

Points de terminaison des Étudiants

1. Créer un étudiant :
   - Endpoint : POST /api/students
   - Corps de la requête :
     {
       "name": "Nom de l'Étudiant",
       "age": 20,
       "courseId": "60d5f9b8f8d2c72b8c8b4567"
     }

2. Obtenir tous les étudiants :
   - Endpoint : GET /api/students

3. Obtenir un étudiant spécifique :
   - Endpoint : GET /api/students/:id
   - Exemple : GET /api/students/60d5f9b8f8d2c72b8c8b4567

Arrêt propre (Graceful Shutdown)

L'application est configurée pour gérer un arrêt propre. Elle fermera la connexion MongoDB et quittera le processus proprement lorsqu'elle recevra un signal de terminaison (par exemple, SIGINT ou SIGTERM).




Structure du Projet : learning-platform-nosql

learning-platform-nosql/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   ├── controllers/
│   │   ├── courseController.js
│   │   ├── studentController.js
│   ├── routes/
│   │   ├── courseRoutes.js
│   │   ├── studentRoutes.js
│   ├── services/
│   │   ├── mongoService.js
│   │   ├── redisService.js
│   ├── app.js
├── .env
├── package.json
├── package-lock.json

Description des dossiers et fichiers

- src/: Contient tout le code source de l'application.
  - config/: Contient les fichiers de configuration.
    - db.js: Gère les connexions à MongoDB et Redis.
    - env.js: Gère la validation des variables d'environnement.
  - controllers/: Contient la logique métier pour les différentes entités.
    - courseController.js: Gère les opérations liées aux cours.
    - studentController.js: Gère les opérations liées aux étudiants.
  - routes/: Contient les définitions des routes de l'application.
    - courseRoutes.js: Définit les routes pour les cours.
    - studentRoutes.js: Définit les routes pour les étudiants.
  - services/: Contient des services utilitaires pour interagir avec les bases de données et le cache.
    - mongoService.js: Fournit des fonctions utilitaires pour MongoDB.
    - redisService.js: Fournit des fonctions utilitaires pour Redis.
  - app.js: Point d'entrée principal de l'application. Configure et démarre le serveur Express.
-.env: Fichier de configuration des variables d'environnement (non partagé, mais généralement présent).
- package.json: Fichier de configuration de npm, liste les dépendances et les scripts.
- package-lock.json: Fichier généré automatiquement par npm pour verrouiller les versions des dépendances.




Les choix techniques que vous avez faits

Organisation du projet

- Séparation des responsabilités: Le projet est organisé en différents dossiers (`controllers`, `routes`, `services`, `config`) pour séparer les responsabilités et faciliter la maintenance.
  - `controllers/`: Contient la logique métier pour les différentes entités.
  - `routes/`: Définit les routes de l'application.
  - `services/`: Fournit des fonctions utilitaires pour interagir avec les bases de données et le cache.
  - `config/`: Gère les configurations et les connexions aux bases de données.

Utilisation de MongoDB et Redis

- MongoDB: Utilisé comme base de données principale pour stocker les informations sur les cours et les étudiants.
  - Avantages: Flexible, évolutif, et bien adapté pour les applications nécessitant une base de données NoSQL.
- Redis: Utilisé pour le caching afin d'améliorer les performances de l'application.
  - Avantages: Très rapide, idéal pour le stockage temporaire de données fréquemment accédées.

Middleware et gestion des requêtes
- Express.js: Utilisé comme framework de serveur web pour gérer les requêtes HTTP.
  - Avantages: Léger, flexible, et dispose d'un large écosystème de middleware.
- CORS: Utilisé pour permettre les requêtes cross-origin.
- body-parser: Utilisé pour parser les corps des requêtes HTTP en JSON.

Gestion des variables d’environnement

- dotenv: Utilisé pour charger les variables d'environnement à partir d'un fichier `.env`.
  - Avantages: Permet de gérer les valeurs sensibles comme les clés API ou les chaînes de connexion de manière sécurisée.

Gestion des erreurs et arrêt gracieux

- Gestion centralisée des erreurs: Les erreurs sont gérées de manière centralisée pour assurer une meilleure maintenance et débogage.
- Arrêt gracieux: L'application est configurée pour fermer proprement les connexions à MongoDB lors de la réception de signaux de terminaison (`SIGINT`, `SIGTERM`).

Validation des données

- Validation des variables d'environnement: Les variables d'environnement sont validées au démarrage pour s'assurer que toutes les valeurs requises sont présentes.
- Validation des IDs: Les IDs MongoDB sont validés avant d'être utilisés dans les requêtes pour éviter les erreurs.







- Question: Comment organiser le point d'entrée de l'application ?

Il doit être limité à des tâches spécifiques.
Eviter les surcharge par deviser les taches en different modules.
Utilisation des variables d’environnement pour gérer des valeurs sensibles comme les clés API ou les chaînes de connexion.
Centralisation des middlewares dans un fichier séparé pour les organiser proprement.
L'ajoute d'une gestion centralisée des erreurs pour éviter de les traiter dans chaque route.

-Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

Charger les Variables d’Environnement.
Initialiser les Dépendances et Modules.
Configurer une Structure Modulaire.
Ajouter un Gestionnaire d’Erreurs Global.
Vérifier les Dépendances Externes.
Lancer le Serveur.

- Question: Quelles sont les informations sensibles à ne jamais commiter ?

Clés d’API, Identifiants de Base de Données, Fichiers de Configuration Contenant des Données Sensibles, Clés Privées, Jetons de Session ou Cookies, Données Personnelles Identifiables, Données Bancaires.

- Question: Pourquoi utiliser des variables d'environnement ?

Séparation des données sensibles
Faciliter la configuration multi-environnements
Portabilité et flexibilité
Éviter les erreurs et simplifier le déploiement

- Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?

Détection précoce des erreurs de configuration
Prévention des comportements inattendus
Sécurité
Facilite le diagnostic et la maintenance

- Question: Que se passe-t-il si une variable requise est manquante ?

Lorsqu'une variable d'environnement requise est absente, cela peut avoir des conséquences graves sur le fonctionnement et la sécurité de l'application. 

- Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?

 Réduction de la duplication de code
 Séparation des responsabilités (Single Responsibility Principle)
 Facilité de maintenance et d'évolution
 Facilité de test

- Question : Comment gérer proprement la fermeture des connexions ?

Écouter les événements du processus
Utiliser les hooks de la base de données
Fermeture automatique lors de l'arrêt du serveur
Utiliser des bibliothèques de gestion de connexions
Validation avant la fermeture

- Question : Comment gérer efficacement le cache avec Redis ?

Identifier les données à mettre en cache
Utiliser des clés de cache bien structurées
Définir une durée de vie (TTL) pour les clés
Utiliser une politique d'éviction
Implémenter un cache de type "write-through" ou "write-behind"

- Question: Quelles sont les bonnes pratiques pour les clés Redis ?

Utiliser des noms de clés descriptifs et structurés
Eviter des clés trop longues
Utiliser des préfixes de namespace
Ajouter des suffixes d'expiration

- Question: Pourquoi créer des services séparés ?

Modularité et séparation des préoccupations
Facilité de maintenance
Scalabilité améliorée
Déploiement indépendant

- Question: Pourquoi séparer les routes dans différents fichiers ?

 Modularité et organisation
 Clarté et lisibilité
 Facilité de maintenance
 Collaboration d'équipe
 Extensibilité
 Réutilisation et testabilité

- Question : Comment organiser les routes de manière cohérente ?

Organiser par fonctionnalité ou domaine
Utiliser un fichier central (router) pour importer les modules de routes
Utiliser des préfixes cohérents pour les URL
Utiliser des middlewares pour la gestion des fonctionnalités communes
Versionner les API
Gérer les erreurs de manière centralisée

- Question: Quelle est la différence entre un contrôleur et une route ?

Les routes sont responsables de définir les points d'entrée pour une application web, c'est-à-dire les chemins URL qui peuvent être visités par les utilisateurs ou les clients. Une fois que la route correspond à la requête d'un utilisateur, elle va déléguer la logique à un contrôleur.
Les routes gèrent donc la partie réception de la requête et la réponse aux utilisateurs, tandis que les contrôleurs contiennent la logique métier qui sera exécutée pour traiter la requête.

- Question : Pourquoi séparer la logique métier des routes ?

Amélioration de la lisibilité et de la clarté du code
Réutilisabilité de la logique métier
Facilité de test unitaire
Séparation des préoccupations (Separation of Concerns)
Facilité de maintenance et d'évolution
Organisation pour les équipes de développement

