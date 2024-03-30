BEGIN TRY
CREATE TABLE TranslatedTextTable (
    TranslationId VARCHAR(200) PRIMARY KEY,
    userId VARCHAR(200),
    SourceText NVARCHAR(MAX),
    TargetLanguage NVARCHAR(10),
    TranslatedText NVARCHAR(MAX),
    TranslationDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES usersTable(userId)
);
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;



SELECT * FROM TranslatedTextTable

DROP TABLE TranslatedTextTable