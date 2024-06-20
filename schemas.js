import Joi from 'joi'

export const superplaceSchema = Joi.object({
  superplace: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(1),
    description: Joi.string().required(),
    location: Joi.string().required(),
    imageUri: Joi.string()
      .required()
      .regex(
        new RegExp(
          '[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)'
        )
      ),
  }).required(),
})
