const Joi = require('joi')

const resultSchema = Joi.object({
  candidateId: Joi.number().integer().required().messages({
    'number.base': 'L\'ID du candidat doit être un nombre',
    'any.required': 'L\'ID du candidat est requis'
  }),
  testId: Joi.number().integer().required().messages({
    'number.base': 'L\'ID du test doit être un nombre',
    'any.required': 'L\'ID du test est requis'
  }),
  answers: Joi.array().items(
    Joi.object({
      questionId: Joi.number().integer().required(),
      answerId: Joi.number().integer().required()
    })
  ).required().messages({
    'array.base': 'Les réponses doivent être un tableau',
    'any.required': 'Les réponses sont requises'
  })
})

const validateResult = (req, res, next) => {
  const { error } = resultSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Erreur de validation',
      details: error.details.map(err => err.message)
    })
  }
  next()
}

module.exports = validateResult
