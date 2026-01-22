-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema art
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema art
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `art` DEFAULT CHARACTER SET utf8 ;
USE `art` ;

-- -----------------------------------------------------
-- Table `art`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `art`.`artist` (
  `artist_id` INT NOT NULL,
  `fname` VARCHAR(50) NULL,
  `mname` VARCHAR(50) NULL,
  `lname` VARCHAR(50) NULL,
  `dob` INT NULL,
  `dod` INT NULL,
  `country` VARCHAR(50) NULL,
  `local` CHAR(1) NULL,
  PRIMARY KEY (`artist_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `art`.`keyword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `art`.`keyword` (
  `keyword_id` INT NOT NULL,
  `keyword` VARCHAR(50) NULL,
  PRIMARY KEY (`keyword_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `art`.`artwork`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `art`.`artwork` (
  `artwork_id` INT NOT NULL,
  `title` VARCHAR(100) NULL,
  `year` INT NULL,
  `period` VARCHAR(50) NULL,
  `type` VARCHAR(50) NULL,
  `file` VARCHAR(50) NULL,
  `artist_id` INT NOT NULL,
  PRIMARY KEY (`artwork_id`),
  CONSTRAINT `fk_artwork_artist1`
    FOREIGN KEY (`artist_id`)
    REFERENCES `art`.`artist` (`artist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `art`.`artwork_keyword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `art`.`artwork_keyword` (
  `artwork_id` INT NOT NULL,
  `keyword_id` INT NOT NULL,
  PRIMARY KEY (`artwork_id`, `keyword_id`),
  CONSTRAINT `fk_artwork_has_keyword_artwork1`
    FOREIGN KEY (`artwork_id`)
    REFERENCES `art`.`artwork` (`artwork_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_artwork_has_keyword_keyword1`
    FOREIGN KEY (`keyword_id`)
    REFERENCES `art`.`keyword` (`keyword_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
