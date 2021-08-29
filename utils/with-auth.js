module.exports = (req, res, next) => {
    if (!req.session.is_loggedin) {
        res.redirect('/login');
    } else {
        next();
    }
}
