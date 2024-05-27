const { Router } = require("express")
const { registerUser, userLogin, getAllUsers } = require("../Controllers/authControllers")

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', userLogin)
userRouter.get('/getallusers', getAllUsers)

module.exports = {
    userRouter,
}