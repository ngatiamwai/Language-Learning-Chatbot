const sql = require('mssql')

async function insertTranslation(userId, sourceText, targetLanguage, translatedText) {
    try {
      // Connect to the database
      await sql.connect(config);
  
      // Create a new request object
      const request = new sql.Request();
  
      // Log the userId before executing the query
      console.log('User ID:', userId);
      
      // SQL query to insert translation data
      const query = `
        INSERT INTO TranslatedText (userId, SourceText, TargetLanguage, TranslatedText)
        VALUES (@userId, @sourceText, @targetLanguage, @translatedText);
      `;
  
      // Bind parameters and execute the query
      await request.input('userId', sql.Int, userId)
                  .input('sourceText', sql.NVarChar(sql.MAX), sourceText)
                  .input('targetLanguage', sql.NVarChar(10), targetLanguage)
                  .input('translatedText', sql.NVarChar(sql.MAX), translatedText)
                  .query(query);
  
      console.log('Translation inserted successfully.');
    } catch (error) {
      console.error('Error inserting translation:', error.message);
    } finally {
      // Close the database connection
      await sql.close();
    }
  }

  module.exports = { insertTranslation };
