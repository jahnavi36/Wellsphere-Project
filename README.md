### Setting up the application

1. Ensure you run `npm install` from both the main `wellsphere` folder, as well as the `/API` subfolder
2. Prior to running the app, ensure that xampp is running, and that all the databases are set up as per the instructions below
3. Use the `npm start` command to initialize the API server and the app simultaneously.


### database set up

create database emrproject

use emrproject

CREATE TABLE IF NOT EXISTS `careProvider` (
  `userId` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `phoneNumber` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `hospital` varchar(100) NOT NULL,
  `permissions` varchar(100) NOT NULL,
  primary key (`userId`)
  
)

CREATE TABLE IF NOT EXISTS `labresults` (
  `healthCardNumber` varchar(50) NOT NULL,
  `labNumber` int(10) NOT null,
  `testDate` date NOT NULL,
  `orderedBy` varchar(50) NOT NULL,
  `testResult` text NOT NULL,
  `labTestImages` varchar(100) 
)

CREATE TABLE IF NOT EXISTS `medication` (
  `healthCardNumber` varchar(50) NOT NULL,
  `drugIDNumber` int NOT null,
  `drugName` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `datePrescribed` date NOT NULL
)

CREATE TABLE IF NOT EXISTS `billing` (
  `invoiceNumber` int(100) NOT null auto_increment,
	`healthCardNumber` varchar(50) NOT NULL,
  `invoiceFrom` varchar(255) NOT null,
  `description` varchar(255) NOT NULL,
  `amount` double(100,2) NOT NULL,
  `invoiceDate` date NOT null,
  primary key (`invoiceNumber`)
)

CREATE TABLE IF NOT EXISTS `notes` (
  `healthCardNumber` varchar(50) NOT NULL,
  `userID` varchar(255) NOT null,
  `note` text NOT NULL,
  `date` timestamp NOT null default current_timestamp on update current_timestamp
)

CREATE TABLE IF NOT EXISTS `patient` (
  `healthCardNumber` varchar(50) NOT NULL,
  `address` varchar(255) NOT null,
  `city` varchar(255) NOT NULL,
  `province` varchar(2) NOT NULL,
  `birthDate` date NOT NULL,
  `phone` varchar(50) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  primary key (`healthCardNumber`)
)

create table if not exists `log` (
   `healthCardNumber` varchar(50) NOT NULL,
   `attribute` varchar(50) NOT NULL,
   `userID` varchar(255) NOT null,
   `date` timestamp NOT null default current_timestamp on update current_timestamp
)

insert into careprovider (userID, password, firstName, lastName, phoneNumber, email, hospital, permissions) 
VALUES (
1,
'123',
'Super',
'Admin',
'4165555555',
'admin@wellsphere.com',
'None',
'admin')

