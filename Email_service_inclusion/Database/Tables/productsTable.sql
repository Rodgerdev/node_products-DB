USE Items
CREATE TABLE Product(
 Id VARCHAR(255) PRIMARY KEY  , 
 Price INT,
CategoryId VARCHAR(255) FOREIGN KEY REFERENCES Category(Id)  ON DELETE CASCADE NOT NULL
) 