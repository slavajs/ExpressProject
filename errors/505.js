module.exports = (err, req, res, next) => {
    res.status(500).render('500.ejs', {
        pageTitle: 'Error',
        errorMessage: err.message
    })
}