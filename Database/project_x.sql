-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: localhost    Database: project_x
-- ------------------------------------------------------
-- Server version	5.7.32-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Area_Details`
--

DROP TABLE IF EXISTS `Area_Details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Area_Details` (
  `area_id` int(11) NOT NULL AUTO_INCREMENT,
  `area_name` varchar(20) DEFAULT NULL,
  `thana` varchar(20) DEFAULT NULL,
  `upazilla` varchar(20) DEFAULT NULL,
  `district` varchar(20) DEFAULT NULL,
  `lati` float DEFAULT NULL,
  `longi` float DEFAULT NULL,
  PRIMARY KEY (`area_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Area_Details`
--

LOCK TABLES `Area_Details` WRITE;
/*!40000 ALTER TABLE `Area_Details` DISABLE KEYS */;
INSERT INTO `Area_Details` VALUES (1,'Zindabazar','Sylhet Sadar','Sylhet','Sylhet',10.1,12.2),(2,'Amberkhana','Sylhet Sadar','Sylhet','Sylhet',10.2,12.3),(3,'Akhalia','Sylhet Sadar','Sylhet','Sylhet',11,13.3),(4,'Tilagorh','Sylhet Sadar','Sylhet','Sylhet',15,13.3);
/*!40000 ALTER TABLE `Area_Details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer_Address`
--

DROP TABLE IF EXISTS `Customer_Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer_Address` (
  `customer_add_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `road_no` varchar(30) DEFAULT NULL,
  `house_no` varchar(20) DEFAULT NULL,
  `area_id` int(11) NOT NULL,
  `further_description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`customer_add_id`),
  KEY `customer_id` (`customer_id`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `Customer_Address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer_Credential` (`customer_id`),
  CONSTRAINT `Customer_Address_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `Area_Details` (`area_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer_Address`
--

LOCK TABLES `Customer_Address` WRITE;
/*!40000 ALTER TABLE `Customer_Address` DISABLE KEYS */;
INSERT INTO `Customer_Address` VALUES (1,1,'station_road-12','132',4,NULL),(2,2,'123','5',3,NULL),(3,3,'Niloy-5','sd-5',2,NULL),(4,4,'Niloy-564','ssdfd-5',1,NULL),(5,5,'Niloy-564','ssdfd-5',3,NULL),(6,1,'54/A','23-D',1,NULL);
/*!40000 ALTER TABLE `Customer_Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer_Credential`
--

DROP TABLE IF EXISTS `Customer_Credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer_Credential` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(20) DEFAULT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer_Credential`
--

LOCK TABLES `Customer_Credential` WRITE;
/*!40000 ALTER TABLE `Customer_Credential` DISABLE KEYS */;
INSERT INTO `Customer_Credential` VALUES (1,'ABC','01521000','123456'),(2,'ABC','01521000','123456'),(3,'ABCDE','0152142000','123456'),(4,'XYZ','0521000','123456'),(5,'XYZA','01000','123456'),(6,'toha','01534717221',NULL),(7,'toha','01534717221',NULL),(8,'toha','01534717221',NULL),(9,'toha','01534717221',NULL),(10,'toha','01534717221',NULL),(11,'toha','01534717222',NULL),(12,'toha','01534716222',NULL),(13,'toha','01534771222',NULL),(14,'tohaaaaa','01534771225',NULL),(15,'tohaaaaa','01534771325',NULL),(16,'tohaaaaa','01534771328',NULL);
/*!40000 ALTER TABLE `Customer_Credential` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `employee_name` varchar(30) DEFAULT NULL,
  `phone_number` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `Service_Credential` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES (1,1,'sldkfj','3548'),(2,1,'lkbnefj','3552848'),(3,1,'pweoi','35548'),(4,2,'pweoi','385548'),(5,2,'pweoksui','38510548'),(6,3,'xclmv','385140548');
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order_details`
--

DROP TABLE IF EXISTS `Order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Order_details` (
  `order_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` varchar(30) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`order_details_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `Order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`),
  CONSTRAINT `Order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Universal_Product_List` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order_details`
--

LOCK TABLES `Order_details` WRITE;
/*!40000 ALTER TABLE `Order_details` DISABLE KEYS */;
INSERT INTO `Order_details` VALUES (1,1,1,'5 kg',500),(2,1,2,'5 kg',600),(3,1,3,'5 kg',700),(4,1,4,'5 kg',800),(5,1,1,'5 kg',500),(6,1,2,'5 kg',600),(7,1,3,'5 kg',700),(8,1,4,'5 kg',800);
/*!40000 ALTER TABLE `Order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `delivered` int(1) DEFAULT NULL,
  `order_time` datetime DEFAULT NULL,
  `customer_address_id` int(11) NOT NULL,
  `payment` float DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer_Credential` (`customer_id`),
  CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `Service_Credential` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1,1,1,NULL,NULL,NULL,1,500);
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_Area`
--

DROP TABLE IF EXISTS `Service_Area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_Area` (
  `service_area_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  PRIMARY KEY (`service_area_id`),
  KEY `service_id` (`service_id`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `Service_Area_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `Service_Credential` (`service_id`),
  CONSTRAINT `Service_Area_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `Area_Details` (`area_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_Area`
--

LOCK TABLES `Service_Area` WRITE;
/*!40000 ALTER TABLE `Service_Area` DISABLE KEYS */;
INSERT INTO `Service_Area` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,2,1),(6,2,2),(7,2,3),(8,2,4),(9,3,1),(10,3,3),(11,3,4);
/*!40000 ALTER TABLE `Service_Area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_Credential`
--

DROP TABLE IF EXISTS `Service_Credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_Credential` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(30) NOT NULL,
  `company_name` varchar(30) DEFAULT NULL,
  `phone_1` varchar(20) DEFAULT NULL,
  `phone_2` varchar(20) DEFAULT NULL,
  `nid` varchar(20) DEFAULT NULL,
  `trade_license` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `nid_photo` varchar(1000) DEFAULT NULL,
  `profile_picture` varchar(1000) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `service_type` varchar(30) DEFAULT NULL,
  `delivery_charge` float DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_Credential`
--

LOCK TABLES `Service_Credential` WRITE;
/*!40000 ALTER TABLE `Service_Credential` DISABLE KEYS */;
INSERT INTO `Service_Credential` VALUES (1,'ABC Service','ABC','01245152',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'ABCD Service','ABCD','0124513453252',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'XYZ Service','XYZ','01245134532',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'toto service','toto',NULL,NULL,'12345678','12345678','Sylhet',NULL,NULL,NULL,'demo','Food',60),(5,'toto service','toto','01534771222',NULL,'12345678','12345678','Sylhet',NULL,NULL,NULL,'demo','Food',60);
/*!40000 ALTER TABLE `Service_Credential` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_Inventory`
--

DROP TABLE IF EXISTS `Service_Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_Inventory` (
  `inventory_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `delivery_limit` varchar(30) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `service_id` (`service_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `Service_Inventory_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `Service_Credential` (`service_id`),
  CONSTRAINT `Service_Inventory_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Universal_Product_List` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_Inventory`
--

LOCK TABLES `Service_Inventory` WRITE;
/*!40000 ALTER TABLE `Service_Inventory` DISABLE KEYS */;
INSERT INTO `Service_Inventory` VALUES (1,1,1,'2kg',50),(2,1,2,'',20),(3,1,3,'',20),(4,1,4,'',20),(5,2,1,'',55),(6,2,2,'',19),(7,2,3,'',20),(8,2,4,'',21),(9,3,4,'',21);
/*!40000 ALTER TABLE `Service_Inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Universal_Product_List`
--

DROP TABLE IF EXISTS `Universal_Product_List`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Universal_Product_List` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `vat` float DEFAULT NULL,
  `qty` float DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Universal_Product_List`
--

LOCK TABLES `Universal_Product_List` WRITE;
/*!40000 ALTER TABLE `Universal_Product_List` DISABLE KEYS */;
INSERT INTO `Universal_Product_List` VALUES (1,'Chaal','Bashmati',10,1,'Kg'),(2,'Daal','slkdjfi',15,1,'Kg'),(3,'Pepsi','Pepsi',1,250,'ml'),(4,'Coca-cola','Coca-cola',1,500,'ml'),(5,'Mojo','skdfj',1,1,'litre');
/*!40000 ALTER TABLE `Universal_Product_List` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-25  0:37:31
