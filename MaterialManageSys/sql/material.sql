-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 10, 2017 at 07:53 PM
-- Server version: 5.5.54-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `material`
--

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `property` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Test table.';

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `name`, `model`, `property`, `description`, `quantity`) VALUES
(1, 'CPU', 'rtl8196d', '1.5Ghz', 'CPU芯片', 11),
(2, 'R', '贴片电阻', '12欧', 'resistance 电阻', 5),
(3, 'C', '磁片电容', '1f', 'capacitance 电容', 3),
(4, 'CPU', 'rtl8190', '2.5G', 'CPU芯片', 0),
(5, 'CPU', 'rtl8198', '2.5Ghz', 'CPU芯片', 4),
(6, 'R', '色环电阻', '0.1欧', '电阻', 200),
(7, 'CPU', 'intel i5 4core', '3.1Ghz', '台式机CPU', 10),
(8, 'R', '贴片电阻', '1K欧', '电阻', 90),
(9, 'LED', 'letv', '50英寸', '彩色LED显示屏', 5),
(10, '串口芯片', '5151', '8x8', '串口芯片', 1),
(11, '稳压芯片', '8931', '12V', '稳压芯片', 50),
(12, 'R', '贴片电阻', '100欧', '贴片电阻', 2000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
