CREATE OR ALTER PROCEDURE getTranslatedTextsByUserId
    @userId VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TranslationId, SourceText, TargetLanguage, TranslatedText, TranslationDate
    FROM TranslatedTextTable
    WHERE userId = @userId
    ORDER BY TranslationDate DESC; -- Order by TranslationDate in descending order
END;
