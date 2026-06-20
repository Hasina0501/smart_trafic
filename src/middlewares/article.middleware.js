// Pour la validation des champs requis pour la création d'article
const validateArticle = (req, res, next) => {
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({ message: "Les champs 'title' et 'content' sont requis" })
  }
  next()
}

module.exports = validateArticle
