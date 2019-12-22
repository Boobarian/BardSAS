module.exports = (req, res, next) => {
    const idUser = req.session.idUser;
    const idLevel = req.session.level;
    if(idUser && idLevel === 0){
        return next()
    }
    req.flash("error", "You are not Authenticate!")
    const redirectTo = idLevel === 0 ? '/applicant' : idLevel === 1 ? '/university/' + idUser : '/sas';
    res.redirect(redirectTo)
  };