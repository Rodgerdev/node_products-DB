USE Items

GO
CREATE OR ALTER PROCEDURE addCategory
    @Id VARCHAR(255),
    @Name VARCHAR(255)
AS
BEGIN
    INSERT INTO Category (Id, Name) VALUES (@Id, @Name);
END
