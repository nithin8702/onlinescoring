-- phpMyAdmin SQL Dump
-- version 3.3.2deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 21, 2010 at 12:55 PM
-- Server version: 5.1.41
-- PHP Version: 5.3.2-1ubuntu4.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `onlinescoring`
--

-- --------------------------------------------------------

--
-- Table structure for table `Acl`
--

DROP TABLE IF EXISTS `Acl`;
CREATE TABLE IF NOT EXISTS `Acl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `fkRoleID` int(10) unsigned DEFAULT NULL,
  `enabled` bit(1) NOT NULL DEFAULT b'0',
  `requested` bit(1) DEFAULT b'1',
  `datetimeCreated` datetime NOT NULL,
  `datetimeModified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_username` (`username`),
  UNIQUE KEY `id_uniq` (`id`),
  KEY `fk_role_id` (`fkRoleID`),
  KEY `deleted` (`deleted`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=48 ;

-- --------------------------------------------------------

--
-- Table structure for table `final_forms`
--

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CREATE TABLE IF NOT EXISTS `final_forms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fkAclID` int(10) unsigned NOT NULL,
  `subjectLabel` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `datetimeModified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `locked` tinyint(3) unsigned NOT NULL,
  `diff` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `subjectLabel` (`subjectLabel`),
  KEY `fkAclID` (`fkAclID`,`locked`),
  KEY `diff` (`diff`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=252788 ;

-- --------------------------------------------------------

--
-- Table structure for table `Forms`
--

DROP TABLE IF EXISTS `Forms`;
CREATE TABLE IF NOT EXISTS `Forms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `schemaName` varchar(255) NOT NULL,
  `fkSessionID` int(10) unsigned NOT NULL,
  `data` text NOT NULL,
  `datetimeAdded` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_qid_sid` (`schemaName`,`fkSessionID`),
  KEY `fk_sid` (`fkSessionID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4621 ;

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE IF NOT EXISTS `Roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `clearance` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq__id` (`id`),
  UNIQUE KEY `uniq_name` (`name`)
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

-- --------------------------------------------------------

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
CREATE TABLE IF NOT EXISTS `Sessions` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `fkAclID` int(10) unsigned NOT NULL,
  `subjectLabel` varchar(255) NOT NULL,
  `datetimeCreated` datetime NOT NULL,
  `timestampModified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_id` (`id`) USING BTREE,
  UNIQUE KEY `uniq_label` (`label`) USING BTREE,
  KEY `fk_acl_id` (`fkAclID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=1055 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Acl`
--
ALTER TABLE `Acl`
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`fkRoleID`) REFERENCES `Roles` (`id`);

--
-- Constraints for table `Forms`
--
ALTER TABLE `Forms`
  ADD CONSTRAINT `fk_sid` FOREIGN KEY (`fkSessionID`) REFERENCES `Sessions` (`id`);

--
-- Constraints for table `Sessions`
--
ALTER TABLE `Sessions`
  ADD CONSTRAINT `fk_acl_id` FOREIGN KEY (`fkAclID`) REFERENCES `Acl` (`id`);
