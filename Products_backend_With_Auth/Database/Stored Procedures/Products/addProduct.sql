
USE Items

CREATE OR ALTER PROCEDURE addProduct
    @Id VARCHAR(255),
    @Price INT,
    @CategoryId VARCHAR(255)
AS
BEGIN
    INSERT INTO Product (Id, Price, CategoryId) VALUES (@Id, @Price, @CategoryId);
END
