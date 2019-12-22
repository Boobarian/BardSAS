const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Applicant = require('../models/applicant');

exports.viewRegister = (req, res, next) => {
    res.render("student/registerPage", {
        title: "Sign Up | Student Application System",
        page: 'signup'
    });
}

exports.doRegister = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash,
                name: req.body.name,
                email: req.body.email,
                level: 0
            });

            User.create(user, function(err, user) {
                if(err) {
                    console.log('Error Tambah Admin 1', err)
                    req.flash('error', 'Something went wrong, ' + err);
                    res.redirect('/student/signup');
                } else {
                    const applicant = new Applicant({
                        IDType: req.body.idType,
                        IDNumber: req.body.idNumber,
                        mobileNo: req.body.mobileNo,
                        dateOfBirth: req.body.birthdate,
                        userID: user._id
                    });
                    applicant.save()
                    req.flash('success', 'Congratulation, you successfuly register to SAS');
                    res.redirect('/signin');
                }
            });
        });
}
