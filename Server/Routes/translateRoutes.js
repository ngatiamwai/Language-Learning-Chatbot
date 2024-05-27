const { Router } = require("express")
const { insertTranslation, translatedTextByUserId, getTranslatedTextByUserIdAndTranslationId, deleteTranslatedText, mostTranslatedLanguages,  } = require("../Controllers/translateController")

const translate = Router()

translate.post('/saveLanguage', insertTranslation)
translate.get('/translatedtextsbyuserid/:userId', translatedTextByUserId)
translate.get('/transtatedtextsbyuseridandtranslationid/:userId/:TranslationId', getTranslatedTextByUserIdAndTranslationId)
translate.delete('/deletetext/:userId/:TranslationId', deleteTranslatedText)
translate.get('/mosttranslatedlanguages', mostTranslatedLanguages)

module.exports = {
    translate
}