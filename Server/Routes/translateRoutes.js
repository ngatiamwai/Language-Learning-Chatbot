const { Router } = require("express")
const { insertTranslation, translatedTextByUserId, getTranslatedTextByUserIdAndTranslationId, deleteTranslatedText,  } = require("../Controllers/translateController")

const translate = Router()

translate.post('/saveLanguage', insertTranslation)
translate.get('/translatedtextsbyuserid/:userId', translatedTextByUserId)
translate.get('/transtatedtextsbyuseridandtranslationid/:userId/:TranslationId', getTranslatedTextByUserIdAndTranslationId)
translate.delete('/deletetext/:userId/:TranslationId', deleteTranslatedText)

module.exports = {
    translate
}