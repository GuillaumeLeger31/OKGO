const Data = require("../models/data");
const axios = require('axios');
const fs = require('fs')
var convert = require('xml-js');

exports.getData = (req, res, next) => {
    axios.get("https://magellan-okgo-demo.osc-fr1.scalingo.io/files/ao1.json", {
        headers: { Authorization: "Bearer " + process.env.OKGO_KEY, ContentType: "application/json" }})
    .then((result) => {
        const ndata = new Data({
            ...result.data,
          });
          ndata.save()
        res.status(200).send("Data récupérée et ajoutée !");  
    })
    .catch((error) => res.status(400).json({error}))
};

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

exports.updateData = (req, res, next) => {
    const dataObject =  {...req.body};
    Data.updateOne({_id: req.params.id} , { ...dataObject})
    .then(() =>
      res.status(200).json({
        message: "Data modifié !",
      }))
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );

};


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

exports.json2xmlData = (req, res, next) => {
  Data.findOne({
      _id: req.params.id,
  })
  .then((data) => {
      var json = JSON.stringify(data);
      fs.writeFile('data.json', json, function(erreur) {
          if (erreur) {
              console.log(erreur)}
          else {
              var jsonDoc = require('fs').readFileSync('data.json', 'utf8');
              var options = {compact: true, ignoreComment: true, spaces: 4};
              var result = convert.json2xml(jsonDoc, options);
              res.header("Content-Type", "application/xml");
              res.status(200).send(result)
          }
      })
  }) 
  .catch(() =>
      res.status(400).json({
      message: "Data non trouvé. .",
      })
  ) 

}; 


