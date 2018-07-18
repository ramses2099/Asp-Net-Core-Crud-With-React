Use Stored;

CREATE TABLE dbo.Employee(
 EmployeeID int identity(1,1) not null primary key,
 FirstName varchar(150) not null,
 LastName varchar(150) not null,
 City varchar(50) not null,
 Department varchar(50) not null,
 Gender varchar(6) not null,
);

GO

CREATE TABLE dbo.Cities(
 CityID int identity(1,1) not null primary key,
 CityName varchar(50) not null
);
