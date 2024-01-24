const mssql = require('mssql')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')
const { registerSchema } = require('../Validators/validators')
const { sqlConfig } = require('../Config/Config')

dotenv.config()

const registerUser = async(req, res)=>{
    try{
    const userId = v4()
    const {firstName, lastName, userName, email, password, phoneNumber} = req.body;
    if(!firstName|| !lastName || !userName || !email || !password || !phoneNumber){
        return res.status(400).json({
            error: 'Please input all values'
        })
    }

    // const {error} = registerSchema.validate(req.body)

    if(error){
        return res.status(422).json(error.details)
    }

    const pool = await mssql.connect(sqlConfig)
    const hashedPwd = await bcrypt.hash(password, 5)

    const result =  await pool
    .request
    .input('userId', userId)
    .input('firstName', firstName)
    .input('lastName', lastName)
    .input('email', email)
    .input('phoneNumber', phoneNumber)
    .input('password', hashedPwd)
    .execute('registerUserProc')

    if(result.rowsAffected[0]==1){
        return res.status(200).json({message: 'User registered susccessfully'})
    }else{
        return res.status(400).json({message: 'User registration failed'})
    }
} catch(error) {
    return res.status(500).json({error: error.message})
}}

module.exports={
    registerUser
}