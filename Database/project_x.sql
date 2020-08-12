-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 12, 2020 at 04:39 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_x`
--

-- --------------------------------------------------------

--
-- Table structure for table `Area_Details`
--

CREATE TABLE `Area_Details` (
  `area_id` int(11) NOT NULL,
  `area_name` varchar(20) DEFAULT NULL,
  `thana` varchar(20) DEFAULT NULL,
  `upazilla` varchar(20) DEFAULT NULL,
  `district` varchar(20) DEFAULT NULL,
  `lati` float DEFAULT NULL,
  `longi` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Area_Details`
--

INSERT INTO `Area_Details` (`area_id`, `area_name`, `thana`, `upazilla`, `district`, `lati`, `longi`) VALUES
(1, 'Zindabazar', 'Sylhet Sadar', 'Sylhet', 'Sylhet', 10.1, 12.2),
(2, 'Amberkhana', 'Sylhet Sadar', 'Sylhet', 'Sylhet', 10.2, 12.3),
(3, 'Akhalia', 'Sylhet Sadar', 'Sylhet', 'Sylhet', 11, 13.3),
(4, 'Tilagorh', 'Sylhet Sadar', 'Sylhet', 'Sylhet', 15, 13.3),
(5, 'Rajshahi University', 'Rajshahi Sadar', 'Rajshahi', 'Rajshahi', 15, 13.3),
(6, 'Gazipur', 'Gazipur', 'Dhaka', 'Dhaka', 15, 13.3);

-- --------------------------------------------------------

--
-- Table structure for table `Customer_Address`
--

CREATE TABLE `Customer_Address` (
  `customer_add_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `road_no` varchar(30) DEFAULT NULL,
  `house_no` varchar(20) DEFAULT NULL,
  `area_id` int(11) NOT NULL,
  `further_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Customer_Address`
--

INSERT INTO `Customer_Address` (`customer_add_id`, `customer_id`, `road_no`, `house_no`, `area_id`, `further_description`) VALUES
(1, 1, 'station_road-12', '132', 4, NULL),
(2, 2, '123', '5', 3, NULL),
(3, 3, 'Niloy-5', 'sd-5', 2, NULL),
(4, 4, 'Niloy-564', 'ssdfd-5', 1, NULL),
(5, 5, 'Niloy-564', 'ssdfd-5', 3, NULL),
(6, 1, '54/A', '23-D', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Customer_Credential`
--

CREATE TABLE `Customer_Credential` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(20) DEFAULT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Customer_Credential`
--

INSERT INTO `Customer_Credential` (`customer_id`, `customer_name`, `customer_phone`, `password`) VALUES
(1, 'ABC', '01521000', '123456'),
(2, 'ABC', '01521000', '123456'),
(3, 'ABCDE', '0152142000', '123456'),
(4, 'XYZ', '0521000', '123456'),
(5, 'XYZA', '01000', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `employee_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `employee_name` varchar(30) DEFAULT NULL,
  `phone_number` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`employee_id`, `service_id`, `employee_name`, `phone_number`) VALUES
(1, 1, 'sldkfj', '3548'),
(2, 1, 'lkbnefj', '3552848'),
(3, 1, 'pweoi', '35548'),
(4, 2, 'pweoi', '385548'),
(5, 2, 'pweoksui', '38510548'),
(6, 3, 'xclmv', '385140548');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `delivered` int(1) DEFAULT NULL,
  `order_time` datetime DEFAULT NULL,
  `customer_address_id` int(11) NOT NULL,
  `payment` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`order_id`, `customer_id`, `service_id`, `employee_id`, `delivered`, `order_time`, `customer_address_id`, `payment`) VALUES
(1, 1, 1, NULL, NULL, NULL, 1, 500);

-- --------------------------------------------------------

--
-- Table structure for table `Order_details`
--

CREATE TABLE `Order_details` (
  `order_details_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` varchar(30) DEFAULT NULL,
  `price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Order_details`
--

INSERT INTO `Order_details` (`order_details_id`, `order_id`, `product_id`, `qty`, `price`) VALUES
(1, 1, 1, '5 kg', 500),
(2, 1, 2, '5 kg', 600),
(3, 1, 3, '5 kg', 700),
(4, 1, 4, '5 kg', 800),
(5, 1, 1, '5 kg', 500),
(6, 1, 2, '5 kg', 600),
(7, 1, 3, '5 kg', 700),
(8, 1, 4, '5 kg', 800);

-- --------------------------------------------------------

--
-- Table structure for table `Service_Area`
--

CREATE TABLE `Service_Area` (
  `service_area_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Service_Area`
--

INSERT INTO `Service_Area` (`service_area_id`, `service_id`, `area_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 1),
(6, 2, 2),
(7, 2, 3),
(8, 2, 4),
(9, 3, 1),
(10, 3, 3),
(11, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Service_Credential`
--

CREATE TABLE `Service_Credential` (
  `service_id` int(11) NOT NULL,
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
  `delivery_charge` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Service_Credential`
--

INSERT INTO `Service_Credential` (`service_id`, `service_name`, `company_name`, `phone_1`, `phone_2`, `nid`, `trade_license`, `address`, `password`, `nid_photo`, `profile_picture`, `description`, `service_type`, `delivery_charge`) VALUES
(1, 'ABC Service', 'ABC', '01245152', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi aperiam tempore consectetur eius. Expedita earum placeat at ipsum iure est blanditiis porro possimus quaerat enim. Corporis ducimus reiciendis dolores minima.', NULL, NULL),
(2, 'ABCD Service', 'ABCD', '0124513453252', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL),
(3, 'XYZ Service', 'XYZ', '01245134532', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi aperiam tempore consectetur eius. Expedita earum placeat at ipsum iure est blanditiis porro possimus quaerat enim. Corporis ducimus reiciendis dolores minima.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Service_Inventory`
--

CREATE TABLE `Service_Inventory` (
  `inventory_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `delivery_limit` varchar(30) DEFAULT NULL,
  `price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Service_Inventory`
--

INSERT INTO `Service_Inventory` (`inventory_id`, `service_id`, `product_id`, `delivery_limit`, `price`) VALUES
(1, 1, 1, '2kg', 50),
(2, 1, 2, '', 20),
(3, 1, 3, '', 20),
(4, 1, 4, '', 20),
(5, 2, 1, '', 55),
(6, 2, 2, '', 19),
(7, 2, 3, '', 20),
(8, 2, 5, '', 21),
(9, 3, 4, '', 21);

-- --------------------------------------------------------

--
-- Table structure for table `Universal_Product_List`
--

CREATE TABLE `Universal_Product_List` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `measure` varchar(20) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `vat` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Universal_Product_List`
--

INSERT INTO `Universal_Product_List` (`product_id`, `product_name`, `measure`, `company_name`, `vat`) VALUES
(1, 'Chaal', '1kg', 'Bashmati', 10),
(2, 'Daal', '1kg', 'slkdjfi', 15),
(3, 'Pepsi', '250 ml', 'Pepsi', 1),
(4, 'Coca-cola', '250 ml', 'Coca-cola', 1),
(5, 'Mojo', '250 ml', 'skdfj', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Area_Details`
--
ALTER TABLE `Area_Details`
  ADD PRIMARY KEY (`area_id`);

--
-- Indexes for table `Customer_Address`
--
ALTER TABLE `Customer_Address`
  ADD PRIMARY KEY (`customer_add_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `area_id` (`area_id`);

--
-- Indexes for table `Customer_Credential`
--
ALTER TABLE `Customer_Credential`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `Order_details`
--
ALTER TABLE `Order_details`
  ADD PRIMARY KEY (`order_details_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Service_Area`
--
ALTER TABLE `Service_Area`
  ADD PRIMARY KEY (`service_area_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `area_id` (`area_id`);

--
-- Indexes for table `Service_Credential`
--
ALTER TABLE `Service_Credential`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `Service_Inventory`
--
ALTER TABLE `Service_Inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Universal_Product_List`
--
ALTER TABLE `Universal_Product_List`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Area_Details`
--
ALTER TABLE `Area_Details`
  MODIFY `area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Customer_Address`
--
ALTER TABLE `Customer_Address`
  MODIFY `customer_add_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Customer_Credential`
--
ALTER TABLE `Customer_Credential`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Employee`
--
ALTER TABLE `Employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Order_details`
--
ALTER TABLE `Order_details`
  MODIFY `order_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Service_Area`
--
ALTER TABLE `Service_Area`
  MODIFY `service_area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Service_Credential`
--
ALTER TABLE `Service_Credential`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Service_Inventory`
--
ALTER TABLE `Service_Inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Universal_Product_List`
--
ALTER TABLE `Universal_Product_List`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Customer_Address`
--
ALTER TABLE `Customer_Address`
  ADD CONSTRAINT `Customer_Address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer_Credential` (`customer_id`),
  ADD CONSTRAINT `Customer_Address_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `Area_Details` (`area_id`);

--
-- Constraints for table `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `Service_Credential` (`service_id`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer_Credential` (`customer_id`),
  ADD CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `Service_Credential` (`service_id`);

--
-- Constraints for table `Order_details`
--
ALTER TABLE `Order_details`
  ADD CONSTRAINT `Order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`),
  ADD CONSTRAINT `Order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Universal_Product_List` (`product_id`);

--
-- Constraints for table `Service_Area`
--
ALTER TABLE `Service_Area`
  ADD CONSTRAINT `Service_Area_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `Service_Credential` (`service_id`),
  ADD CONSTRAINT `Service_Area_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `Area_Details` (`area_id`);

--
-- Constraints for table `Service_Inventory`
--
ALTER TABLE `Service_Inventory`
  ADD CONSTRAINT `Service_Inventory_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `Service_Credential` (`service_id`),
  ADD CONSTRAINT `Service_Inventory_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Universal_Product_List` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
