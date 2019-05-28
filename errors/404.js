module.exports = (req, res, next) => {
  res.status(404).render("errors/404.ejs", {
    pageTitle: "Page not found",
  });
};
