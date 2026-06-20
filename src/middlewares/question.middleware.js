const Joi = require('joi')

const questionSchema = Joi.object({
  content: Joi.string().required().messages({
    'string.empty': 'Le contenu de la question est requis',
    'any.required': 'Le contenu de la question est requis'
  }),
  questionType: Joi.string().required().messages({
    'string.empty': 'Le type de question est requis',
    'any.required': 'Le type de question est requis'
  }),
  points: Joi.number().integer().min(0).required().messages({
    'number.base': 'Les points doivent être un nombre',
    'number.min': 'Les points ne peuvent pas être négatifs',
    'any.required': 'Les points sont requis'
  }),
  testId: Joi.number().integer().required().messages({
    'number.base': 'L\'ID du test doit être un nombre',
    'any.required': 'L\'ID du test est requis'
  })
})

const validateQuestion = (req, res, next) => {
  const { error } = questionSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Erreur de validation',
      details: error.details.map(err => err.message)
    })
  }
  next()
}

module.exports = validateQuestion
