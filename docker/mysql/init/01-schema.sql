CREATE DATABASE IF NOT EXISTS pethub;
USE pethub;

CREATE TABLE IF NOT EXISTS login (
    login_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NULL,
    password_key VARCHAR(255) NULL,
    ic_number VARCHAR(20) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    DOB DATE NULL,
    UNIQUE KEY uq_login_username (username),
    UNIQUE KEY uq_login_email (email),
    UNIQUE KEY uq_login_ic_number (ic_number)
);

CREATE TABLE IF NOT EXISTS constant_pet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(30) NOT NULL,
    type_name VARCHAR(80) NOT NULL,
    breed VARCHAR(40) NOT NULL,
    breed_name VARCHAR(120) NOT NULL
);

CREATE TABLE IF NOT EXISTS pet_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_type VARCHAR(30) NOT NULL,
    pet_name VARCHAR(120) NOT NULL,
    pet_breed VARCHAR(40) NOT NULL,
    pet_gender VARCHAR(20) NOT NULL,
    pet_dob DATE NULL,
    pet_owner_id INT NOT NULL,
    pet_type_desc VARCHAR(80) NULL,
    pet_breed_desc VARCHAR(120) NULL,
    KEY idx_pet_owner_id (pet_owner_id),
    CONSTRAINT fk_pet_owner FOREIGN KEY (pet_owner_id) REFERENCES login (login_id)
);

CREATE TABLE IF NOT EXISTS pet_medical (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    history_activities VARCHAR(255) NOT NULL,
    history_date DATE NOT NULL,
    histry_location VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    pet_id INT NOT NULL,
    KEY idx_medical_owner_id (owner_id),
    KEY idx_medical_pet_id (pet_id),
    CONSTRAINT fk_medical_owner FOREIGN KEY (owner_id) REFERENCES login (login_id),
    CONSTRAINT fk_medical_pet FOREIGN KEY (pet_id) REFERENCES pet_details (id)
);
