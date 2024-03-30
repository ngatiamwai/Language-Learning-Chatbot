CREATE OR ALTER PROCEDURE TranslatedTextProc
    @TranslationId VARCHAR(200),
    @userId VARCHAR(200),
    @SourceText NVARCHAR(MAX),
    @TargetLanguage NVARCHAR(10),
    @TranslatedText NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO TranslatedTextTable (TranslationId, userId, SourceText, TargetLanguage, TranslatedText)
        VALUES (@TranslationId, @userId, @SourceText, @TargetLanguage, @TranslatedText);
    END TRY
    BEGIN CATCH
        -- You can customize the error handling as per your requirements
        THROW;
    END CATCH;
END;


DELETE FROM TranslatedTextTable WHERE TranslationId = '9c33ac22-014f-412b-8caf-ba4ea8a06347';
