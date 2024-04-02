async function fetchSupportedLanguages() {
    // Replace 'YOUR_TRANSLATOR_API_KEY' with your actual Translator API key
    const key = '<YOUR KEY>';
    const endpoint = '<YOUR ENDPOINT>';

    try {
        const response = await axios.get(endpoint, {
            params: {
                'api-version': '3.0',
                'scope': 'translation'
            },
            headers: {
                'Ocp-Apim-Subscription-Key': key
            }
        });

        const languages = response.data.translation;
        const targetLanguageDropdown = document.getElementById('targetLanguage');

        for (const languageCode in languages) {
            if (languages.hasOwnProperty(languageCode)) {
                const languageName = languages[languageCode].name;
                const option = document.createElement('option');
                option.value = languageCode;
                option.text = languageName;
                targetLanguageDropdown.add(option);
            }
        }
    } catch (error) {
        console.error('Error fetching supported languages:', error);
    }
}

// Call the function to fetch supported languages when the page loads
fetchSupportedLanguages();

function translateText() {
    const sourceText = document.getElementById('sourceText').value;
    const targetLanguage = document.getElementById('targetLanguage').value;

    // Replace 'YOUR_TRANSLATOR_API_KEY' with your actual Translator API key
    const key = '<YOUR KEY>';
    const endpoint = '<YOUR ENDPOINT>';

    axios.post(`${endpoint}?api-version=3.0`, [{ text: sourceText }], {
        params: {
            to: targetLanguage
        },
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': 'westeurope', // Replace with your Azure region
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        }
    }).then(function(response) {
        const translatedText = response.data[0].translations[0].text;
        document.getElementById('translatedText').value = translatedText;
    }).catch(function(error) {
        console.error('Translation error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data.error.message);
        }
    });
}

function startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        document.getElementById('sourceText').value = result;
    }

    recognition.start();
}

function readTranslatedText() {
    const translatedText = document.getElementById('translatedText').value;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    // Set voice to your desired voice
    utterance.voice = speechSynthesis.getVoices().filter(voice => voice.name === 'Your Desired Voice')[0];
    speechSynthesis.speak(utterance);
}

function redirectToRegister() {
    // Replace '/path-to-register-page' with the actual path to your register page
    window.location.href = '/Client/register.html';
}
