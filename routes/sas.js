const express = require('express');
const SasController = require('../controller/sas')
const checkAuth = require('../middleware/check-auth');
const checkSAS = require('../middleware/check-sas');
const router = express.Router();

router.get('', checkAuth, checkSAS, SasController.viewHome);
router.get('/maintain', checkAuth, checkSAS, SasController.viewMaintain);
router.get('/add', checkAuth, checkSAS, SasController.addQualification);
router.get('/register', checkAuth, checkSAS, SasController.registerUniversity);
router.get('/new/:id', checkAuth, checkSAS, SasController.addNewUniversity);
router.get('/edit/:id', checkAuth, checkSAS, SasController.editQualification);

router.get('/university/admin/:id', checkAuth, checkSAS, SasController.viewAdminList);
router.get('/university/edit/:id', checkAuth, checkSAS, SasController.editUniversity);
router.get('/university/admin/edit/:idAdmin/:idUniv', checkAuth, checkSAS, SasController.editAdminUniversity);
router.get('/university/admin/reset/:idAdmin/:idUniv', checkAuth, checkSAS, SasController.resetAdminUniversity);

router.post('/add', checkAuth, checkSAS, SasController.doAddQualification);
router.post('/university/add', checkAuth, checkSAS, SasController.doAddUniversity);
router.post('/university/admin/:id', checkAuth, checkSAS, SasController.doAddAdminUniversity);

router.put('/edit/:id', checkAuth, checkSAS, SasController.doEditQualification);
router.put('/university/edit/:id', checkAuth, checkSAS, SasController.doEditUniversity);
router.put('/university/admin/edit/:idAdmin/:idUniv', checkAuth, checkSAS, SasController.doEditAdminUniversity);
router.put('/university/admin/reset/:idAdmin/:idUniv', checkAuth, checkSAS, SasController.doResetAdminUniversity);

router.delete('/:id', checkAuth, checkSAS, SasController.doDeleteQualification);
router.delete('/university/:id', checkAuth, checkSAS, SasController.doDeleteUniversity);
router.delete('/university/admin/:idAdmin/:idUniv', checkAuth, checkSAS, SasController.doDeleteAdminUniversity);



module.exports = router;