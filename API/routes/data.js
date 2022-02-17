const express = require('express');
const dataCtrl = require("../controllers/data");
const router = express.Router();


router.get('/', dataCtrl.getData);
router.get('/:id', dataCtrl.showData);
router.put('/:id', dataCtrl.updateData);
router.delete('/:id', dataCtrl.deleteData);
router.get('/json2xml/:id', dataCtrl.json2xmlData);

module.exports = router;