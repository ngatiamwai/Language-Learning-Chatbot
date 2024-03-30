const { Router } = require("express")
const { registerUser, userLogin } = require("../Controllers/authControllers")

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', userLogin)

module.exports = {
    userRouter,
}