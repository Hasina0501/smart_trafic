const Joi = require('joi')

const testSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Le titre du test est requis',
    'any.required': 'Le titre du test est requis'
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Le type de test est requis',
    'any.required': 'Le type de test est requis'
  }),
  active: Joi.boolean().required().messages({
    'any.required': 'Le statut actif/inactif est requis'
  }),
  offerId: Joi.number().integer().required().messages({
    'number.base': 'L\'ID de l\'offre doit être un nombre',
    'any.required': 'L\'ID de l\'offre est requis'
  })
})

const validateTest = (req, res, next) => {
  const { error } = testSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Erreur de validation',
      details: error.details.map(err => err.message)
    })
  }
  next()
}

module.exports = validateTest
