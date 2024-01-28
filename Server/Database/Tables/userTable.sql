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

SELECT * FROM usersTable

DROP TABLE userTable