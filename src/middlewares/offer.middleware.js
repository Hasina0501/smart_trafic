// Pour la validation des champs requis pour la création d'offre
const validateOffer = (req, res, next) => {
  const { title, description, publicationDate, deadlineDate, status, userId } = req.body

  if (!title || !description || !publicationDate || !deadlineDate || !status || !userId) {
    return res.status(400).json({ message: "Tous les champs sont requis" })
  }
  next()
}

module.exports = validateOffer
