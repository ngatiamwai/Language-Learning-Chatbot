const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import your existing user router or any other routers you may have
const { userRouter } = require('./Routes/userRoutes');
app.use('/user', userRouter);

// Add the translation endpoint
app.post('/translate', async (req, res) => {
    const { text, to } = req.body;

    try {
        const translationResult = await translateText(text, to[0]); // Assuming to is an array with a single language code
        res.json({ translation: translationResult });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
