const Joi = require('joi')

const answerSchema = Joi.object({
  content: Joi.string().required().messages({
    'string.empty': 'Le contenu de la réponse est requis',
    'any.required': 'Le contenu de la réponse est requis'
  }),
  isCorrect: Joi.boolean().required().messages({
    'any.required': 'L\'indicateur de réponse correcte/incorrecte est requis'
  }),
  questionId: Joi.number().integer().required().messages({
    'number.base': 'L\'ID de la question doit être un nombre',
    'any.required': 'L\'ID de la question est requis'
  })
})

const validateAnswer = (req, res, next) => {
  const { error } = answerSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Erreur de validation',
      details: error.details.map(err => err.message)
    })
  }
  next()
}

module.exports = validateAnswer
