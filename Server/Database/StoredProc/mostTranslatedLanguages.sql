CREATE OR ALTER PROCEDURE getTranslationStatistics
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Select target languages ordered by the count of translations
        SELECT 
            TargetLanguage,
            COUNT(*) AS TranslationCount
        FROM 
            TranslatedTextTable
        GROUP BY 
            TargetLanguage
        ORDER BY 
            TranslationCount DESC;
    END TRY
    BEGIN CATCH
        -- Handle errors
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO
