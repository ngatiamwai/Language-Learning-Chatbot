const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import your existing user router or any other routers you may have
const { userRouter } = require('./Routes/userRoutes');
const { translate } = require('./Routes/translateRoutes');
app.use('/user', userRouter);
app.use('/translate', translate);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
