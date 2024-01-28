CREATE OR ALTER PROCEDURE registerUserProc
    @userId VARCHAR(200),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @userName VARCHAR(50),
    @email VARCHAR(100),
    @password VARCHAR(255),
    @phoneNumber VARCHAR(20)
AS
BEGIN
    INSERT INTO usersTable (userId, firstName, lastName, userName, email, password, phoneNumber)
    VALUES (@userId, @firstName, @lastName, @userName, @email, @password, @phoneNumber);
END;


