const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

require('dotenv').config(); // Load environment variables from .env file

let key = process.env.TRANSLATOR_KEY;
let endpoint = process.env.TRANSLATOR_ENDPOINT;
// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = process.env.TRANSLATOR_LOCATION;

axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
        'Ocp-Apim-Subscription-Key': key,
         // location required if you're using a multi-service or regional (not global) resource.
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    params: {
        'api-version': '3.0',
        'from': 'en',
        'to': ['fr', 'zu']
    },
    data: [{
        'text': 'I would really like to drive your car around the block a few times!'
    }],
    responseType: 'json'
}).then(function(response){
    console.log(JSON.stringify(response.data, null, 4));
})