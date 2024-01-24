const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { userRouter } = require('./Routes/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/user', userRouter)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})

app.listen(3003, ()=>{
    console.log('Server running on port 3003');
})