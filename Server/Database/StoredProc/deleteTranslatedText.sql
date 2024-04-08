CREATE OR ALTER PROCEDURE DeleteTranslatedText
    @TranslationId VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DELETE FROM TranslatedTextTable WHERE TranslationId = @TranslationId;
        SELECT 'Translation deleted successfully.' AS Result;
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH;
END;
