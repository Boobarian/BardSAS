const express = require('express');

const UniversityController = require('../controller/university')
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const router = express.Router();

router.get('/:idAdmin', checkAuth, checkAdmin, UniversityController.viewHome);
router.get('/:idAdmin/record', checkAuth, checkAdmin, UniversityController.viewProgramme);
router.get('/:idAdmin/list', checkAuth, checkAdmin, UniversityController.listApplication);
router.get('/:idAdmin/change', checkAuth, checkAdmin, UniversityController.changeStatus);
router.get('/:idAdmin/edit/:idProgram', checkAuth, checkAdmin, UniversityController.viewEditProgramme);
router.get('/:idAdmin/review/:idProgram', checkAuth, checkAdmin, UniversityController.reviewApplication);
router.get('/:idAdmin/:idUniv/program', checkAuth, checkAdmin, UniversityController.addProgramme);
router.get('/:idAdmin/:idProgram/detail/:idApplication', checkAuth, checkAdmin, UniversityController.detailApplicant);


router.post('/:idAdmin/:idUniv/add', checkAuth, checkAdmin, UniversityController.doAddProgramme);

router.put('/:idAdmin/edit/:idProgram', checkAuth, checkAdmin, UniversityController.doEditPorgramme);
router.put('/:idAdmin/:idProgram/detail/:idApplication', checkAuth, checkAdmin, UniversityController.doEditApplication);

router.delete('/:idAdmin/:idProgram', checkAuth, checkAdmin, UniversityController.doDeletePorgramme);

module.exports = router;