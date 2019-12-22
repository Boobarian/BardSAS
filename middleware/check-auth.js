module.exports = (req, res, next) => {
    if(req.session.idUser){
        return next()
    }
    req.flash("error", "Please login first!")
    res.redirect('/signin')
  };