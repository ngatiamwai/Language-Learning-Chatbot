async function translateText() {
    const inputText = document.getElementById('inputText').value;
    const targetLanguage = document.getElementById('targetLanguage').value;

    try {
        const response = await axios.post('http://localhost:3003/translate', {
            text: inputText,
            to: [targetLanguage],
        });

        const translationResult = response.data.translation;
        document.getElementById('translationResult').innerText = `Translation: ${translationResult}`;
    } catch (error) {
        console.error('Translation error:', error);
        document.getElementById('translationResult').innerText = 'Translation error';
    }
}