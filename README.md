# Home Component - Application Guide

## Description

Le composant `Home` est au cœur de notre application et joue un rôle crucial dans l'intégration avec d'autres systèmes externes, en particulier l'interface ASP. Ce document vise à expliquer comment et pourquoi vous devez passer par la page spécifique mentionnée dans les commentaires du code pour garantir le bon fonctionnement de certaines fonctionnalités de l'application.

## Nécessité de passer par la page ASP

### Contexte :
Dans le cadre de notre application, certaines informations critiques, telles que le **matricule de l'utilisateur**, sont récupérées depuis une autre page ASP hébergée sur un serveur interne. Cette page, nommée `gest_arbo_usv_modif0.asp` et située dans le dossier **USV_PROD** (accessible à l'adresse 192.168.0.254), transmet des paramètres spécifiques via l'URL lorsque vous naviguez vers notre application.

### Fonctionnalité essentielle :
- **Matricule :** Cette valeur est transmise dans l'URL sous forme d'un paramètre `matricule`. L'application extrait cette information pour l'utiliser dans plusieurs processus, notamment dans les formulaires de requêtes de la page d'accueil.

- **pageKey :** Ce paramètre clé est également transmis dans l'URL pour activer dynamiquement des formulaires dans l'application. Sans ce paramètre, certains composants critiques, comme le **RequestForQueryForm**, ne s'ouvriraient pas automatiquement.

### Pourquoi est-ce important ?
1. **Transmission d'informations :** En passant par la page `gest_arbo_usv_modif0.asp`, les informations de l'utilisateur sont transmises en toute transparence à l'application via les paramètres d'URL. Cela permet une meilleure personnalisation et une utilisation optimisée des formulaires.

2. **Activation des composants dynamiques :** Le paramètre `pageKey` contrôle l'ouverture de certains composants (comme le formulaire de requête) sans nécessiter d'actions manuelles de l'utilisateur. Cela améliore l'expérience utilisateur et facilite le traitement des requêtes.

3. **Intégration avec le système existant :** Le flux reliant l'ASP et l'application assure une continuité dans les opérations en récupérant les données nécessaires à partir des systèmes hérités et en les transférant vers la nouvelle interface front-end.

## Explication du fonctionnement du code

### Dépendances principales :
- **React & Hooks :** Le composant utilise les hooks `useState`, `useEffect`, et `useContext` pour gérer l'état du formulaire et les données de l'utilisateur.
- **Router (useSearchParams) :** Permet de récupérer les paramètres de l'URL et d'extraire des informations comme `matricule` et `pageKey`.
- **Context (UserContext) :** Utilisé pour mettre à jour le **matricule** dans le contexte global de l'application, facilitant ainsi son accès à d'autres composants.

### Logique principale :
- L'application détecte automatiquement les paramètres présents dans l'URL lorsque l'utilisateur accède à la page via `gest_arbo_usv_modif0.asp`.
- **Matricule** : Récupéré et enregistré dans le contexte utilisateur pour une utilisation future dans l'application.
- **pageKey** : Si ce paramètre est présent, il active automatiquement le formulaire de requête (**RequestForQueryForm**).
- La fonction `toggleFormState` gère l'état d'ouverture du formulaire en fonction de la présence du paramètre `pageKey`.

### Schéma général du flux de travail :
1. **L'utilisateur accède à l'application via la page ASP**.
2. Les paramètres de l'URL sont récupérés dans le composant `Home`.
3. Si le `matricule` est trouvé, il est sauvegardé dans le contexte global.
4. Si `pageKey` est présent, le formulaire de requête s'ouvre automatiquement.

## Conclusion

Il est **indispensable** de passer par la page ASP mentionnée dans le code pour que certaines fonctionnalités de l'application fonctionnent correctement, notamment la transmission des informations utilisateur (comme le matricule) et l'activation dynamique des formulaires. Cela garantit une intégration fluide entre les anciens systèmes et l'interface moderne de notre application.