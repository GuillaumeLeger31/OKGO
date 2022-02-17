# Test Technique OKGO. 

* node/express et mongoDB

## lancement API

* Ajoutez  le document `.env` dans le dossier `/API`
* Allez dans le dossier API : `cd API`
* Installez toutes les dépendances du projet : `npm install`
* Démarrez le serveur Node.js : `nodemon server`


## ENDPOINT

PATH PARAMETERS
{ id = "61defa25d23f7abaf67deae5"}

* DATA
* `GET`localhost:3000/api/data
    Ajoute dans la BDD les données de la requete et renvoie les infos avec l'{ id }.
* `GET`localhost:3000/api/data/{ id }
    affiche les données d'un id.
* `PUT`localhost:3000/api/data/{ id }
    modifie les données d'un id. (ajouter dans le body la paire clef/valeur voulu).
* `DELETE`localhost:3000/api/data/{ id }
    supprime les données d'un id.
* `GET`localhost:3000/api/data/json2xml/{ id }
    convertie et enregistre les données dans un document (/data).


* FTP
* `GET`localhost:3000/api/data/ftp/connect
    affiche la liste du répertoire
* `GET`localhost:3000/api/data/ftp/send
    envoie  le document sur le répertoire
* `GET`localhost:3000/api/data/ftp/recup
    récuperer un document depuis le répertoire



* effectuer le processus 

* `GET`localhost:3000/api/data
* `GET`localhost:3000/api/data/json2xml/{ id }
* `GET`localhost:3000/api/data/ftp/send