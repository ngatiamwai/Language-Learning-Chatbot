const { Router } = require("express")
const { insertTranslation, translatedTextByUserId, getTranslatedTextByUserIdAndTranslationId,  } = require("../Controllers/translateController")

const translate = Router()

translate.post('/saveLanguage', insertTranslation)
translate.get('/translatedtextsbyuserid/:userId', translatedTextByUserId)
translate.get('/transtatedtextsbyuseridandtranslationid/:userId/:TranslationId', getTranslatedTextByUserIdAndTranslationId)

module.exports = {
    translate
}