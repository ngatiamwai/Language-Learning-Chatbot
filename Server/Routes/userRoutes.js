const { Router } = require("express")
const { registerUser } = require("../Controllers/authControllers")

const userRouter = Router()

userRouter.post('/register', registerUser)

module.exports = {
    userRouter
}