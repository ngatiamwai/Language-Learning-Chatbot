const mssql = require("mssql");
// const { sqlConfig } = require("../../config/config");

const createUsersTable = async () => {
  try {
    const table = `
    BEGIN TRY
    CREATE TABLE usersTable (
        userId VARCHAR(200) PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL ,
        lastName VARCHAR(50) NOT NULL ,
        userName VARCHAR(50) NOT NULL ,
        email VARCHAR(100) NOT NULL UNIQUE,   
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user', 
        phoneNumber INT, -- Remove (20)
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME,
        resetToken VARCHAR(200), -- Add this column for reset tokens
        resetTokenExpiry DATETIME, -- Add this column for reset token expiry
        deleted_at DATETIME -- Add this column for soft delete
    );
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;
        `;

    const pool = await mssql.connect(sqlConfig);

    await pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log(err.message);
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error };
  }
};

const createTranslatedTextTable = async () => {
  try {
    const table = `
    BEGIN TRY
    CREATE TABLE TranslatedText (
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
    `;

    const pool = await mssql.connect(sqlConfig);

    await pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log({ Error: err.message });
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error };
  }
};

module.exports = {
    createUsersTable,
    createTranslatedTextTable
}