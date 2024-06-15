USE Items


CREATE OR ALTER PROCEDURE getCategories
AS
BEGIN
    SELECT * FROM Category;
END
