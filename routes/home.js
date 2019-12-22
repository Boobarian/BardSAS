const express = require('express');
const HomeController = require('../controllers/home')
const SasController = require('../controllers/sas')
const router = express.Router();

router.get('', HomeController.viewHome);
router.get('/signin', HomeController.viewLogin);
router.get('/logout', HomeController.doLogout);

router.post('/signin', HomeController.doLogin);

router.post('/add', SasController.doAddQualification);

module.exports = router;