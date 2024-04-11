const joi = require('joi')

const loginSchema = joi.object({
    userName:joi.string().required().min(5).max(20).messages({
        'username.empty':'Please Input Your userName with length 5 to 20'
    }),
    userPassword:joi.string().required()
})

// const registerSchema = joi.object({
//     // firstName, lastName, email, password, phone_number 
//     firstName: joi.string().min(0).required(),
//     lastName: joi.string().min(0).required(),
//     userName: joi.string().min(0).required(),
//     email: joi.string().email().required(),
//     password: joi.string().min(8).required(),
//     phoneNumber: joi.string().required()
// })

const registerSchema = joi.object({
    firstName:joi.string().required().min(5).max(20).messages({
        'firstName.empty':'Please Input Your first name with length 5 to 20' }),
    lastName:joi.string().required().min(5).max(20).messages({
        'lastName.empty':'Please Input Your lastName with length 5 to 20' }),
    userName:joi.string().required().min(5).max(20).messages({
        'userName.empty':'Please Input Your userName with length 5 to 20' }),
    phoneNumber:joi.number().required(),
   email:joi.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
    'email':'Email already exists in the system'
   }),
    // role:joi.string(),
    password:joi.string().required()

})

module.exports = {
    registerSchema,
    loginSchema
}