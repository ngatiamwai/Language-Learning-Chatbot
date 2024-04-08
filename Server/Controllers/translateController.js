const mssql = require('mssql');
const { v4 } = require('uuid');
const { sqlConfig } = require('../Config/Config');

const insertTranslation = async (req, res) => {
  try {
    const { userId, SourceText, TargetLanguage, TranslatedText } = req.body;
    const TranslationId = v4();

    // Connect to the database
    const pool = await mssql.connect(sqlConfig);

    // Execute the stored procedure
    const result = await pool.request()
      .input("TranslationId", TranslationId)
      .input("userId", userId)
      .input("SourceText", SourceText)
      .input("TargetLanguage", TargetLanguage)
      .input("TranslatedText", TranslatedText)
      .execute("TranslatedTextProc");

      console.log(result);

    // Check the result of the stored procedure execution
    if (result.rowsAffected[0] === 1) {
      // If the stored procedure executed successfully
      return res.json({
        message: "Translated Text created successfully",
      });
    } else {
      // If the stored procedure did not execute successfully
      return res.status(500).json({ error: "Translated Text creation failed" });
    }
  } catch (error) {
    // If an error occurred during execution
    return res.status(500).json({ error: error.message });
  }
};


const translatedTextByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Access userId from req.params
    console.log(userId);
    const pool = await mssql.connect(sqlConfig);

    const allTextsByUserId = (
      await pool
        .request()
        .input("userId", userId)
        .execute("getTranslatedTextsByUserId")
    ).recordset;

    res.json({ TranslatedMessages: allTextsByUserId });
    console.log(allTextsByUserId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTranslatedTextByUserIdAndTranslationId = async (req, res)=>{
  try {
    const userId = req.params.userId; // Access userId from req.params
    const TranslationId = req.params.TranslationId; // Access translationId from req.params
    console.log(userId, TranslationId);

    const pool = await mssql.connect(sqlConfig);

    const allTextsByUserIdAndTranslationId = (
      await pool
        .request()
        .input("userId", userId)
        .input("TranslationId", TranslationId)
        .execute("getTranslatedTextByUserIdAndTranslationId")
    ).recordset;

    res.json({ TranslatedMessages: allTextsByUserIdAndTranslationId });
    console.log(allTextsByUserIdAndTranslationId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
const deleteTranslatedText = async (req, res) => {
  try {
    const TranslationId = req.params.TranslationId;
    // const userId = req.params.userId;

    console.log(TranslationId);

    const pool = await mssql.connect(sqlConfig);

    const deleteText = (
      await pool.request()
      .input("TranslationId", TranslationId)
      // .input("userId", userId)
      .execute("DeleteTranslatedText")
    ).recordset;

    res.json({ DeletedTexts: deleteText });

  } catch (error) {
    return res.status(500).json({ Error: error.message }); // Use error.message to get the error message
  }
};



module.exports = {
  insertTranslation,
  translatedTextByUserId,
  getTranslatedTextByUserIdAndTranslationId,
  deleteTranslatedText
};
