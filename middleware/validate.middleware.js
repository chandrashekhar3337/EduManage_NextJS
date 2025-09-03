import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(2).required(),
  address: Joi.string().min(5).required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  contact: Joi.string().pattern(/^[0-9+\- ]{7,15}$/).required(),
  email_id: Joi.string().email().required(),
});

export const validateSchool = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, errors: error.details.map(e => e.message) });
  }
  next();
};
