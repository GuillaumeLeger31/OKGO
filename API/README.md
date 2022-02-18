# Test Technique OKGO. 

* node/express et mongoDB

## lancement API

* Ajoutez  le document `.env` dans le dossier `/API`
* Allez dans le dossier API : `cd API`
* Installez toutes les dépendances du projet : `npm install`
* Démarrez le serveur Node.js : `nodemon server`


## ENDPOINT

path parameters
{ _id = "620f449ed389ca3314ace82e"}


### DATA
* `GET`localhost:3000/api/data
    * Ajoute dans la BDD les données de la requete et renvoie les infos avec l'{ _id } (mongodb _id).
* `GET`localhost:3000/api/data/{ _id }
    * affiche les données d'un _id.
* `PUT`localhost:3000/api/data/{ _id }
    * modifie les données d'un id. (ajouter dans le body la paire clef/valeur voulu).
* `DELETE`localhost:3000/api/data/{ _id }
    * supprime les données d'un id.
* `GET`localhost:3000/api/data/json2xml/{ _id }
    * convertie et enregistre les données dans un document (/data).

### FTP
* `GET`localhost:3000/api/data/ftp/connect
    * affiche la liste du répertoire
* `GET`localhost:3000/api/data/ftp/send
    * envoie  le document sur le répertoire
* `GET`localhost:3000/api/data/ftp/recup
    * récuperer un document depuis le répertoire



### effectuer le processus 

* `GET`localhost:3000/api/data
* `GET`localhost:3000/api/data/json2xml/{ id }
* `GET`localhost:3000/api/data/ftp/send