window.addEventListener('DOMContentLoaded', async () => {
    // Extract userId and TranslationId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const TranslationId = urlParams.get('TranslationId'); // Use capital "TranslationId"

    try {
        // Fetch chat details from the backend using userId and TranslationId
        const response = await axios.get(`http://localhost:3003/translate/transtatedtextsbyuseridandtranslationid/${userId}/${TranslationId}`);
        const TranslatedMessages = response.data.TranslatedMessages; // Access the array

        // Assuming you only expect one translation, access the first element of the array
        const translatedMessage = TranslatedMessages[0];
        
        console.log(translatedMessage);

        // Populate the chat details in the HTML elements
        document.getElementById('originalMessage').textContent = translatedMessage.SourceText;
        document.getElementById('targetLanguage').textContent = translatedMessage.TargetLanguage;
        document.getElementById('translatedMessage').textContent = translatedMessage.TranslatedText;
    } catch (error) {
        console.error('Error fetching chat details:', error);
        // Handle error gracefully, e.g., display an error message to the user
    }
});
