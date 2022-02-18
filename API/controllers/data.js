const Data = require("../models/data");
const axios = require('axios');
const fs = require('fs')
var convert = require('xml-js');


/* récupérer les données de l'API OKGO et les stocker dans la BDD */
exports.getData = (req, res, next) => {
    axios.get("https://magellan-okgo-demo.osc-fr1.scalingo.io/files/ao1.json", {
        headers: { Authorization: "Bearer " + process.env.OKGO_KEY, ContentType: "application/json" }})
    .then((result) => {
        const ndata = new Data({
            ...result.data,
          });
          ndata.save()
        res.status(200).json(ndata);  
    })
    .catch((error) => res.status(400).json({error}))
};



/* afficher les données */
exports.showData = (req, res, next) => {
    Data.findOne({
        _id: req.params.id,
      })
        .then((data) => res.status(200).json(data))
        .catch((error) =>
          res.status(404).json({
            error,
          })
        );
};


/* mettre à jour les données */
exports.updateData = (req, res, next) => {
    const dataObject =  {...req.body};
    Data.updateOne({_id: req.params.id} , { ...dataObject})
    .then(() =>
      res.status(200).json({
        message: "Data modifié !",
      }))
    .catch((error) =>
      res.status(400).json({
        message: "Data non trouvé.. !",
      })
    );

};

/* supprimer les données */
exports.deleteData = (req, res, next) => {
    Data.findOne({
        _id: req.params.id,
      })
      .then((data) => {
            Data.deleteOne({
            _id: req.params.id,
            })
            .then(() => { 
              res.status(200).json({
                message: "Data supprimé !",
              })
            }
            )
            .catch(() =>
              res.status(400).json({
                message: "Data non supprimé...",
              })
            );
      })
      .catch(() =>
        res.status(400).json({
          message: "Data non trouvé...",
        })
      );
};

/* convertir et enrefistrer les données */
exports.json2xmlData = (req, res, next) => {
  Data.findOne({
      _id: req.params.id,
  })
  .then((data) => {
      var json = JSON.stringify(data);
      fs.writeFile('data/data.json', json, function(erreur) {
          if (erreur) {
              console.log(erreur)}
          else {
              var jsonDoc = require('fs').readFileSync('data/data.json', 'utf8');
              var options = {compact: true, ignoreComment: true, spaces: 4};
              var result = convert.json2xml(jsonDoc, options);
              res.header("Content-Type", "application/xml");
              res.status(200).send(result)
          } 
          fs.writeFile('data/data.xml', result, function(erreur) {
            if (erreur) {
              console.log(erreur)}
          })
      })
  }) 
  .catch(() =>
      res.status(400).json({
      message: "Data non trouvé. .",
      })
  ) 
}; 


/* FTP */

/* afficher les données FTP */
exports.promiseFTP = (req, res, next) => {
    var PromiseFtp = require('promise-ftp');
    var ftp = new PromiseFtp();
    ftp.connect({host: "vs2by.ftp.infomaniak.com", user: "vs2by_ftptest", password: "C-eaA5o6Yh0K"})
    .then(function (serverMessage) {
        console.log('Server message: '+serverMessage);
        return ftp.list('/');
    }).then(function (list) {
        console.log('Directory listing:');
        res.status(200).send(list);
        console.dir(list);
    return ftp.end();
  });
}; 


/* envoyer des données au FTP */
exports.sendFTP = (req, res, next) => {
  var PromiseFtp = require('promise-ftp');
  var ftp = new PromiseFtp();
  ftp.connect({host: "vs2by.ftp.infomaniak.com", user: "vs2by_ftptest", password: "C-eaA5o6Yh0K"})
  .then(function (serverMessage) {
    console.log('Server message: '+serverMessage);
    return ftp.put('data/data.xml', 'guillaumeleger140@gmail.com');
  }).then(function () {
    res.status(200).json({
      message: "Data envoyé!",
    });
    return ftp.end();
  });
};


/* récupérer les données du FTP */
exports.getFTP = (req, res, next) => {
  var PromiseFtp = require('promise-ftp');
  var ftp = new PromiseFtp();
  ftp.connect({host: "vs2by.ftp.infomaniak.com", user: "vs2by_ftptest", password: "C-eaA5o6Yh0K"})
  .then(function (serverMessage) {
    return ftp.get('guillaumeleger140@gmail.com');
  }).then(function (stream) {
    res.status(200).json({
      message: "Data reçu!",
    });
    return new Promise(function (resolve, reject) {
      stream.once('close', resolve);
      stream.once('error', reject);
      stream.pipe(fs.createWriteStream('data/get.txt'));
    });
  }).then(function () {
    return ftp.end();
  });
};
