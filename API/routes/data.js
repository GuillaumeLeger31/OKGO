const express = require('express');
const dataCtrl = require("../controllers/data");
const router = express.Router();


router.get('/', dataCtrl.getData);
router.get('/:id', dataCtrl.showData);
router.put('/:id', dataCtrl.updateData);
router.delete('/:id', dataCtrl.deleteData);
router.get('/json2xml/:id', dataCtrl.json2xmlData);


router.get('/ftp/connect', dataCtrl.promiseFTP);
router.get('/ftp/send', dataCtrl.sendFTP);
router.get('/ftp/recup', dataCtrl.getFTP);

module.exports = router;