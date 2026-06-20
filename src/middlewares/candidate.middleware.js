
// pour la validation (champ requis pour la création)

const validateCandidate = (req, res, next) => {
  const { name, email, offerId } = req.body

  if (!name || !email || !offerId) {
    return res.status(400).json({ message: "Ces champs sont requis" })
  }
  next()
}

module.exports = {validateCandidate}

