const express = require('express');
const ApplicantController = require('../controller/applicant')
const checkAuth = require('../middleware/check-auth');
const checkApplicant = require('../middleware/check-applicant');
const router = express.Router();

router.get('', checkAuth, checkApplicant, ApplicantController.viewHome);
router.get('/list', ApplicantController.viewProgramList);
router.get('/apply', checkAuth, checkApplicant, ApplicantController.applyProgramme);
router.get('/select/:idProgram', checkAuth, checkApplicant, ApplicantController.selectProgramme);
router.get('/qualification/:idProgram', checkAuth, checkApplicant, ApplicantController.viewQualification);
router.get('/new-qualification/:idProgram', checkAuth, checkApplicant, ApplicantController.addQualification);
router.get('/university/detail/:idUniv', checkAuth, checkApplicant, ApplicantController.viewProgram);

router.post('/qualification/:idProgram', checkAuth, checkApplicant, ApplicantController.doAddQualification);
router.post('/submit/:idProgram/:idQualification', checkAuth, checkApplicant, ApplicantController.doAddApplication);

module.exports = router;