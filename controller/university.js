const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const QualificationObt = require('../models/qulificationObtain');
const Applicant = require('../models/applicant');
const Application = require('../models/application');
const Programme = require('../models/programme');
const University = require('../models/university');

exports.viewHome = (req, res, next) => {
    console.log(req.params.idAdmin)
    res.render("university/univHome", {
        title: "University Admin Home | Student Application System",
        idAdmin: req.params.idAdmin,
        page: 'admin-home'
    });
}

exports.viewProgramme = (req, res, next) => {
    let idAdmin = req.params.idAdmin;
    University.find().then(docs => {
        let id;
        docs.forEach(function(doc) {
            console.log('foreach',doc)
            if (doc.users.includes(idAdmin)) {
                console.log('include',doc._id)
                id = doc._id
            }
        })
        return id;
    }).then(univId => {
        console.log('univID', univId)
        Programme.find({universityID: univId}, (errP, programs) => {
            if(!programs) {
                req.flash('error', 'Cannot load Programme List, ' + err)
                return res.render("university/univRecordProgramme", {
                    title: "University Admin Home | Student Application System",
                    page: 'admin-program',
                    programmeList: [],
                    idAdmin: idAdmin,
                    idUniv: univId
                });
            }
            if(programs.length === 0) {
                req.flash('error', 'Cannot load Programme List, ' + err)
                return res.render("university/univRecordProgramme", {
                    title: "University Admin Home | Student Application System",
                    page: 'admin-program',
                    programmeList: [],
                    idAdmin: idAdmin,
                    idUniv: univId
                });
            }
            let lists = [];
            let n = 0;
            console.log('program', programs)
            for(x = 0; x < programs.length; x++) {
                let _id = programs[x]._id;
                let programmeName = programs[x].programmeName;
                let description = programs[x].description;
                let closingDate = programs[x].closingDate;
                let universityID = programs[x].universityID
                Application.find({programID: _id}, (err, post) => {
                    console.log('post', post)
                    lists.push({
                        _id: _id,
                        programmeName: programmeName,
                        description: description,
                        closingDate: closingDate,
                        universityID: universityID,
                        countApplicant: post.length
                    });
                    console.log('lists', lists)
                    n++;
                    if(n === programs.length) {
                        res.render("university/univRecordProgramme", {
                            title: "University Admin Home | Student Application System",
                            page: 'admin-program',
                            programmeList: lists,
                            idAdmin: idAdmin,
                            idUniv: univId
                        });
                    }
                })
            }
        })
    }).catch(err => {
        console.log('err', err)
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("university/univRecordProgramme", {
            title: "University Admin Home | Student Application System",
            page: 'admin-program',
            programmeList: [],
            idAdmin: idAdmin,
            idUniv: univId
        });
    })
}

exports.addProgramme = (req, res, next) => {
    res.render("university/univAddProgramme", {
        title: "University Admin Record Programme | Student Application System",
        idAdmin: req.params.idAdmin,
        idUniv: req.params.idUniv,
        page: 'admin-program'
    });
}

exports.viewEditProgramme = (req, res, next) => {
    const id = req.params.idProgram;
    Programme.findById(id).then(post => {
        console.log('program', post)
        if(post) {
            res.render("university/univEditProgramme", {
                title: "University Admin Record Programme | Student Application System",
                idAdmin: req.params.idAdmin,
                programme: post,
                page: 'admin-program',
            });
        } else {
            res.redirect('/university/' + req.params.idAdmin + '/record');
        }
    }).catch(err => {
        res.redirect('/university/' + req.params.idAdmin + '/record');
    })
}

exports.reviewApplication = (req, res, next) => {
    const id = req.params.idProgram;
    Application.find({programID: id}, (errP, post) => {
        if(!post) {
            console.log(err)
            return res.redirect('/university/' + req.params.idAdmin + '/record');
        }
        if(post.length === 0) {
            return res.render("university/univReviewApplication", {
                title: "University Admin Review Application | Student Application System",
                idAdmin: req.params.idAdmin,
                applications: [],
                page: 'admin-program'
            });
        }
        let lists = [];
        let n = 0;
        for(x=0; x < post.length; x++) {
            let _id = post[x]._id;
            let applicationDate = post[x].applicationDate;
            let status = post[x].status;
            QualificationObt.findById(post[x].qualificationObt, (errQ, qualificationObt) => {
                User.findById(qualificationObt.applicantID, (errU, user) => {
                    lists.push({
                        _id: _id,
                        applicationDate: applicationDate,
                        status: status,
                        userName: user.name,
                        qualificationName: qualificationObt.qualificationName
                    });
                    n++;
                    if(n === post.length) {
                        res.render("university/univReviewApplication", {
                            title: "University Admin Review Application | Student Application System",
                            idAdmin: req.params.idAdmin,
                            idProgram: id,
                            applications: lists,
                            page: 'admin-program'
                        });
                    }
                })
            })
        }
    })
}

exports.detailApplicant = (req, res, next) => {
    const idProgram = req.params.idProgram;
    const idAdmin = req.params.idAdmin;
    const idApplication = req.params.idApplication
    Application.findOne({_id: idApplication}, (errP, post) => {
        if(!post) {
            console.log(err)
            return res.redirect('/university/' + req.params.idAdmin + '/review/' + req.params.idProgram);
        }
        if(post.length === 0) {
            return res.render("university/univDetailApplicant", {
                title: "University Admin Review Application | Student Application System",
                idAdmin: idAdmin,
                idProgram: idProgram,
                idApplication: idApplication,
                applications: [],
                page: 'admin-program'
            });
        }
        console.log('post', post)
        QualificationObt.findById(post.qualificationObt, (errQ, qualificationObt) => {
            Applicant.findOne({userID: post.applicantID}, (errA, applicant) => {
                User.findById(post.applicantID, (errU, user) => {
                    const lists = {
                        _id: post._id,
                        userName: user.name,
                        IDType: applicant.IDType,
                        IDNumber: applicant.IDNumber,
                        mobileNo: applicant.mobileNo,
                        dateOfBirth: applicant.dateOfBirth,
                        email: user.email,
                        qualificationName: qualificationObt.qualificationName,
                        subjectName: qualificationObt.subjectName,
                        grade: qualificationObt.grade,
                        score: qualificationObt.score,
                        status: post.status,
                    };
                    console.log('lists', lists)
                    res.render("university/univDetailApplicant", {
                        title: "University Admin Review Application | Student Application System",
                        idAdmin: idAdmin,
                        idProgram: idProgram,
                        idApplication: idApplication,
                        applications: lists,
                        page: 'admin-program'
                    });
                });
            });
        });
    });
}

exports.doEditApplication = (req, res, next) => {
    console.log('programme update', req.body)
    const idApplication = req.params.idApplication;
    const idProgram = req.params.idProgram;
    const idAdmin = req.params.idAdmin
    Application.updateOne({_id: idApplication}, {$set: {
        status: req.body.applicationStatus
    }}).then(result => {
        console.log('result', result);
        if(result.n > 0) {
            req.flash('success', 'Succesfully edit data');
            res.redirect('/university/' + idAdmin + '/review/' + idProgram);
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/university/' + idAdmin + '/' + idProgram + '/detail/' + idApplication);
        }
    }).catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/' + idAdmin + '/' + idProgram + '/detail/' + idApplication);
    });
}

exports.listApplication = (req, res, next) => {
    res.render("university/univListApplication", {
        title: "University Admin Review Application | Student Application System"
    });
}

exports.changeStatus = (req, res, next) => {
    res.render("university/univChangeStatus", {
        title: "University Admin Review Application | Student Application System"
    });
}

exports.doAddProgramme = (req, res, next) => {
    const programme = new Programme({
        programmeName: req.body.programmeName,
        description: req.body.description,
        closingDate: req.body.closingDate,
        universityID: req.params.idUniv
    });

    programme.save()
    .then(result => {
        req.flash('success', 'Succesfully add data');
        res.redirect('/university/' + req.params.idAdmin + '/record');
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/' + req.params.idAdmin + '/' + req.params.idUniv + '/program');
    })
}

exports.doEditPorgramme = (req, res, next) => {
    console.log('programme update', req.body)
    Programme.updateOne({_id: req.params.idProgram}, {$set: {
        programmeName: req.body.programmeName,
        description: req.body.description,
        closingDate: req.body.closingDate
    }}).then(result => {
        console.log('result', result);
        if(result.n > 0) {
            req.flash('success', 'Succesfully edit data');
            res.redirect('/university/' + req.params.idAdmin + '/record');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/university/' + req.params.idAdmin + '/edit/' + req.params.idProgram);
        }
    }).catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/' + req.params.idAdmin + '/edit/' + req.params.idProgram);
    });
}

exports.doDeletePorgramme = (req, res, next) => {
    Programme.deleteOne({_id: req.params.idProgram})
    .then(result => {
        if(result.deletedCount > 0) {
            req.flash('success', 'Succesfully delete data');
            res.redirect('/university/' + req.params.idAdmin + '/record');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/university/' + req.params.idAdmin + '/record');
        }
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/' + req.params.idAdmin + '/record');
    })
}