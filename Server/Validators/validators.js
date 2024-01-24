const joi = require('joi')

const loginSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().required()
})

const registerSchema = joi.object({
    // firstName, lastName, email, password, phone_number 
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    userName: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    phoneNumber: joi.string().required()
})

module.exports = {
    registerSchema,
    loginSchema
}