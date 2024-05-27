async function fetchTranslationStats() {
    try {
        const response = await axios.get('http://localhost:3003/translate/mosttranslatedlanguages');
        console.log('Response data:', response.data.TranslatedLanguages);
        return response.data.TranslatedLanguages;
    } catch (error) {
        console.error('Error fetching translation statistics:', error);
        return [];
    }
}

function renderChart(TranslatedLanguages) {
    if (!Array.isArray(TranslatedLanguages)) {
        console.error('Data is not an array:', TranslatedLanguages);
        return;
    }
    
    const ctx = document.getElementById('translationChart').getContext('2d');
    const labels = TranslatedLanguages.map(item => item.TargetLanguage);
    const counts = TranslatedLanguages.map(item => item.TranslationCount);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Translated Languages Report',
                data: counts,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function init() {
    const data = await fetchTranslationStats();
    renderChart(data);
}

document.addEventListener('DOMContentLoaded', init);
