CREATE OR ALTER PROCEDURE getTranslatedTextByUserIdAndTranslationId
    @userId VARCHAR(200),
    @translationId VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TranslationId, SourceText, TargetLanguage, TranslatedText, TranslationDate
    FROM TranslatedTextTable
    WHERE userId = @userId
    AND TranslationId = @translationId;
END;
