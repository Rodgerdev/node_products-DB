USE Items
GO
CREATE OR ALTER PROCEDURE updateProduct (
    @Id VARCHAR(255),
    @Price INT,
    @CategoryId VARCHAR(255)
)
AS
BEGIN
    UPDATE Product SET Price = @Price, CategoryId = @CategoryId WHERE Id = @Id;
END
