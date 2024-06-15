USE Items

CREATE OR ALTER PROCEDURE deleteProduct
    @Id VARCHAR(255)
AS
BEGIN
    DELETE FROM Product WHERE Id = @Id;
END
