const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.viewHome = (req, res, next) => {
    res.render("home/homePage", {
        title: "Home | Student Application System"
    });
}

exports.viewLogin = (req, res, next) => {
    res.render("home/loginPage", {
        title: "Sign In | Student Application System",
        page: 'signin'
    });
}

exports.doLogin = (req, res, next) => {
    console.log(req.body)
    let fetchUser;
    User.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                req.flash('error', 'Invalid authentication credentials!');
                return res.redirect('/signin');
            }
            fetchUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if(!result) {
                req.flash('error', 'Invalid authentication credentials!');
                return res.redirect('/signin');
            }
            const token = jwt.sign(
                { username: fetchUser.username, userId: fetchUser._id, level: fetchUser.level },
                "sEcreT_coDE",
                { expiresIn: "1h" }
            );
            req.session.idUser = fetchUser._id
            req.session.level = fetchUser.level
            console.log(req.session.level, fetchUser.level)
            const redirectTo = fetchUser.level === 0 ? '/applicant' : fetchUser.level === 1 ? '/university/' + fetchUser._id : '/sas';
            return res.redirect(redirectTo);
        })
        .catch(err => {
            req.flash('error', 'Invalid authentication credentials!');
            return res.redirect('/signin');
        });
}

exports.doLogout = (req, res, next) => {
    req.session.destroy(function(err) {
        console.log('errLogout', err)
        return res.redirect('/signin');
      })
}