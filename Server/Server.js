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

// Route to handle translation requests
app.post('/saveLanguage', async (req, res) => {
    // Retrieve the user ID from the request body
    const {userId} = req.params;
  
    if (!userId) {
      // If user ID is not provided in the request body, return an error response
      return res.status(401).send('User ID not provided');
    }
  
    const { sourceText, targetLanguage, translatedText } = req.body;
  
    try {
      // Insert translation data into the database
      await database.insertTranslation(userId, sourceText, targetLanguage, translatedText);
      res.status(200).send('Translation saved successfully.');
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
});

  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
