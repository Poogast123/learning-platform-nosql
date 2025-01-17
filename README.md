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















