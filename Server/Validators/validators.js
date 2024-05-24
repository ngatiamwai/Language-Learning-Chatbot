const joi = require('joi')

const loginSchema = joi.object({
    email:joi.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
        'email':'Email does not exist in the system'
    }),
    password:joi.string().required()
})


const registerSchema = joi.object({
    firstName:joi.string().required().min(4).max(20).messages({
        'firstName.empty':'Please Input Your first name with length 4 to 20' }),
    lastName:joi.string().required().min(4).max(20).messages({
        'lastName.empty':'Please Input Your lastName with length 4 to 20' }),
    userName:joi.string().required().min(4).max(20).messages({
        'userName.empty':'Please Input Your userName with length 4 to 20' }),
    phoneNumber:joi.number().required(),
   email:joi.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
    'email':'Email already exists in the system'
   }),
    // role:joi.string(),
    password:joi.string().required().min(8).messages({
        'password':'password must be 8 characters longcd '
    })

})

module.exports = {
    registerSchema,
    loginSchema
}