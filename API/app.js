const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const dataRoutes = require("./routes/data");

require('dotenv').config();
mongoose
  .connect(process.env.DB_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Bonjour</h1>')
});

app.use("/api/data", dataRoutes);

module.exports = app;