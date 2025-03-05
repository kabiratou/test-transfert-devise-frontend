I- Instructions d’installation et d’exécution

1. Prérequis

Avant de lancer l'application frontend, assurez vous d'avoir les éléments suivants installés :
- Node.js (version 20 ou supérieure)
- npm (gestionnaire de paquets)
- Un navigateur web moderne (Chrome ou Firefox)
- Un éditeur de code (VS Code recommandé)

2. Installation des outils

A. Vérifier si Node.js est installé :

node -v

Si Node.js n'est pas installé, téléchargez et installez la dernière version depuis [Node.js](https://nodejs.org/).

#### B. Installer les dépendances du projet :
Cloner le dépôt du frontend :
```bash
git clone https://github.com/nom-utilisateur/test-transfert-devise-frontend.git
cd test-transfert-devise-frontend
```
Installez les dépendances :
```bash
npm install
```

### 3. Lancement de l'application
Lancer l'application avec la commande suivante :
```bash
npm run dev
```
L'application sera accessible sur : [http://localhost:3000](http://localhost:5173)

---

## II- Fonctionnalités de l'API Consommée

- Création d'un utilisateur : `POST /api/user/save`
- Authentification : `POST /api/auth/login`
- Ajout de compte utilisateur : `POST /api/comptes/save`
- Liste des utilisateurs avec leur compte : `GET /api/user/compte/list`
- Taux de change actuel : `GET /api/user/taux-change/USDCAD`
- Transfert entre utilisateurs avec conversion : `POST /api/user/transfert`

---

## III- Explication des technologies utilisées

### React.js
Framework utilisé pour le développement du frontend, facilitant la création d'interfaces utilisateur dynamiques et interactives.

### React Context API
Utilisé pour la gestion centralisée de l'état global de l'application.

### Axios / Fetch API
Permet d'effectuer des appels API vers le backend pour gérer les utilisateurs, les comptes et les conversions de devises.

### TailwindCSS
Bibliothèque CSS utilisée pour créer des interfaces utilisateurs modernes et responsives.

---

## IV- Instructions pour tester le projet
1. Suivez les instructions d'installation des prérequis.
2. Clonez le dépôt du projet.
3. Configurez les variables d'environnement si nécessaire (URL de l'API backend).
4. Lancez le projet avec `npm run dev`.
5. Testez les différentes fonctionnalités via l'interface utilisateur.

---


