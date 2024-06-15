USE Items;
GO


CREATE OR ALTER PROCEDURE getUser
    @Email VARCHAR(255)
AS
BEGIN
    SELECT * FROM [User] WHERE Email = @Email;
END

