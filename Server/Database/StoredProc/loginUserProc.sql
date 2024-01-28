CREATE OR ALTER PROC loginUserProc
@email VARCHAR(100)
AS
BEGIN
SELECT * FROM usersTable WHERE email = @email 
END

SELECT * FROM usersTable

EXEC loginUserProc @email = 'ngatia@gmail.com', @password = '12345678';
