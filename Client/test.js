async function fetchSupportedLanguages() {
    // Replace 'YOUR_TRANSLATOR_API_KEY' with your actual Translator API key
    const key = 'ddb8e6a7afc3445f97f9506794776e52';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/languages';

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


//Function to read translated text
function readTranslatedText() {
    const TranslatedText = document.getElementById('translatedText').value;
    const utterance = new SpeechSynthesisUtterance(TranslatedText);
    // Set voice to your desired voice
    utterance.voice = speechSynthesis.getVoices().filter(voice => voice.name === 'Your Desired Voice')[0];
    speechSynthesis.speak(utterance);
}

// Function to map language initials to language names
function getLanguageName(initials) {
    // Define your mapping here
    const languageMap = {
        'af': 'Afrikaans',
        'sq': 'Albanian',
        'am': 'Amharic',
        'ar': 'Arabic',
        'hy': 'Armenian',
        'az': 'Azerbaijani',
        'eu': 'Basque',
        'be': 'Belarusian',
        'bn': 'Bengali',
        'bs': 'Bosnian',
        'bg': 'Bulgarian',
        'ca': 'Catalan',
        'ceb': 'Cebuano',
        'ny': 'Chichewa',
        'zh-Hans': 'Chinese (Simplified)',
        'zh-Hant': 'Chinese (Traditional)',
        'co': 'Corsican',
        'hr': 'Croatian',
        'cs': 'Czech',
        'da': 'Danish',
        'nl': 'Dutch',
        'en': 'English',
        'eo': 'Esperanto',
        'et': 'Estonian',
        'tl': 'Filipino',
        'fi': 'Finnish',
        'fr': 'French',
        'fy': 'Frisian',
        'gl': 'Galician',
        'ka': 'Georgian',
        'de': 'German',
        'el': 'Greek',
        'gu': 'Gujarati',
        'ht': 'Haitian Creole',
        'ha': 'Hausa',
        'haw': 'Hawaiian',
        'iw': 'Hebrew',
        'hi': 'Hindi',
        'hmn': 'Hmong',
        'hu': 'Hungarian',
        'is': 'Icelandic',
        'ig': 'Igbo',
        'id': 'Indonesian',
        'ga': 'Irish',
        'it': 'Italian',
        'ja': 'Japanese',
        'jw': 'Javanese',
        'kn': 'Kannada',
        'kk': 'Kazakh',
        'km': 'Khmer',
        'rw': 'Kinyarwanda',
        'ko': 'Korean',
        'ku': 'Kurdish (Kurmanji)',
        'ky': 'Kyrgyz',
        'lo': 'Lao',
        'la': 'Latin',
        'lv': 'Latvian',
        'lt': 'Lithuanian',
        'lb': 'Luxembourgish',
        'mk': 'Macedonian',
        'mg': 'Malagasy',
        'ms': 'Malay',
        'ml': 'Malayalam',
        'mt': 'Maltese',
        'mi': 'Maori',
        'mr': 'Marathi',
        'mn': 'Mongolian',
        'my': 'Myanmar (Burmese)',
        'ne': 'Nepali',
        'no': 'Norwegian',
        'ps': 'Pashto',
        'fa': 'Persian',
        'pl': 'Polish',
        'pt': 'Portuguese',
        'pa': 'Punjabi',
        'ro': 'Romanian',
        'ru': 'Russian',
        'sm': 'Samoan',
        'gd': 'Scots Gaelic',
        'sr': 'Serbian',
        'st': 'Sesotho',
        'sn': 'Shona',
        'sd': 'Sindhi',
        'si': 'Sinhala',
        'sk': 'Slovak',
        'sl': 'Slovenian',
        'so': 'Somali',
        'es': 'Spanish',
        'su': 'Sundanese',
        'sw': 'Swahili',
        'sv': 'Swedish',
        'tg': 'Tajik',
        'ta': 'Tamil',
        'te': 'Telugu',
        'th': 'Thai',
        'tr': 'Turkish',
        'uk': 'Ukrainian',
        'ur': 'Urdu',
        'ug': 'Uyghur',
        'uz': 'Uzbek',
        'vi': 'Vietnamese',
        'cy': 'Welsh',
        'xh': 'Xhosa',
        'yi': 'Yiddish',
        'yo': 'Yoruba',
        'zu': 'Zulu'
    };
    
    return languageMap[initials] || initials; // Return the language name if found, otherwise return the initials
}


async function translateText() {
    const SourceText = document.getElementById('sourceText').value;
    const TargetLanguageInitials = document.getElementById('targetLanguage').value;
    const userId = localStorage.userId; // Retrieve user ID

    // Get the language name from initials
    const TargetLanguage = getLanguageName(TargetLanguageInitials);

    // Replace 'YOUR_TRANSLATOR_API_KEY' with your actual Translator API key
    const key = 'ddb8e6a7afc3445f97f9506794776e52';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/translate';
    const token = localStorage.token

    try {
        // Translate text
        const response = await axios.post(`${endpoint}?api-version=3.0`, [{ text: SourceText }], {
            params: {
                to: TargetLanguageInitials // Pass initials for translation
            },
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': 'westeurope', // Replace with your Azure region
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString(),
                'token': token
            }
        });

        const TranslatedText = response.data[0].translations[0].text;
        document.getElementById('translatedText').value = TranslatedText;

        // Save translated text with language name
        const saveResponse = await axios.post('http://localhost:3003/translate/saveLanguage', {
            userId: userId,
            SourceText: SourceText,
            TargetLanguage: TargetLanguage, // Pass language name instead of initials
            TranslatedText: TranslatedText,
        });

        console.log('Translation saved successfully:', saveResponse.data);
    } catch (error) {
        console.error('Translation error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data.error.message);
        }
    }
}

// Call the function to fetch supported languages when the page loads
fetchSupportedLanguages();


// Make API call to fetch translated texts for the current user
async function fetchTranslatedTexts() {
    try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3003/translate/translatedtextsbyuserid/${userId}`);

        console.log('API Response:', response.data); // Log API response to inspect its structure

        const translationList = document.getElementById('translationList');
        if (!translationList) {
            console.error('Translation list element not found.'); // Log an error if the translationList element is not found
            return;
        }

        response.data.TranslatedMessages.forEach(chat => {
            const listItem = document.createElement('li');
            listItem.textContent = chat.TranslatedText; // Assuming TranslatedText is the property containing the translated text
            listItem.addEventListener('click', () => {
                navigateToChatDetails(userId, chat.TranslationId);
            });
            translationList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching translated texts:', error);
    }
}

async function navigateToChatDetails(userId, TranslationId) {
    try {
        // Fetch chat details from the backend using userId and TranslationId
        const response = await axios.get(`http://localhost:3003/translate/transtatedtextsbyuseridandtranslationid/${userId}/${TranslationId}`);
        const chatDetails = response.data;

        // Redirect to chat details page with userId and TranslationId as query parameters
        window.location.href = `chatDetails.html?userId=${userId}&TranslationId=${TranslationId}`;
    } catch (error) {
        console.error('Error navigating to chat details:', error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

window.addEventListener('DOMContentLoaded', fetchTranslatedTexts);
