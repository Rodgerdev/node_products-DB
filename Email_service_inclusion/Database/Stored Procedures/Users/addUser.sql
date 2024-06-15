USE Items;
GO

CREATE OR ALTER PROCEDURE addUser
    @Id VARCHAR(255),
    @Email VARCHAR(255),
    @Name VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
    INSERT INTO [User] (Id, Email, Name, Password) 
    VALUES (@Id, @Email, @Name, @Password);
END
