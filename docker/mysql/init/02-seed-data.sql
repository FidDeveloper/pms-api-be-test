USE pethub;

-- BCrypt hash for password: password
SET @bcrypt_password := '$2y$10$jq1EeppsMZaOlIevuAF/M.FPfdHY17n53kpLHpMajJU0q0uP/F12y';

INSERT INTO login (login_id, username, password_key, ic_number, fullname, email, DOB) VALUES
    (1, 'alice01', @bcrypt_password, '950101015522', 'Alice Tan', 'alice@pethub.local', '1995-01-01'),
    (2, 'bob88', @bcrypt_password, '900504105433', 'Bob Lim', 'bob@pethub.local', '1990-05-04'),
    (3, NULL, NULL, '020731145544', 'Carol Noor', 'carol@pethub.local', '2002-07-31'),
    (4, 'danny.pet', @bcrypt_password, '881212085588', 'Danny Lee', 'danny@pethub.local', '1988-12-12'),
    (5, 'emma.vet', @bcrypt_password, '970303035577', 'Emma Wong', 'emma@pethub.local', '1997-03-03')
ON DUPLICATE KEY UPDATE
    username = VALUES(username),
    password_key = VALUES(password_key),
    fullname = VALUES(fullname),
    email = VALUES(email),
    DOB = VALUES(DOB);

INSERT INTO constant_pet (id, type, type_name, breed, breed_name) VALUES
    (1, 'CAT', 'Cat', 'PERSIAN', 'Persian'),
    (2, 'CAT', 'Cat', 'SIAMESE', 'Siamese'),
    (3, 'CAT', 'Cat', 'BRITISH_SHORTHAIR', 'British Shorthair'),
    (4, 'DOG', 'Dog', 'HUSKY', 'Siberian Husky'),
    (5, 'DOG', 'Dog', 'SHIBA', 'Shiba Inu'),
    (6, 'DOG', 'Dog', 'GOLDEN_RETRIEVER', 'Golden Retriever'),
    (7, 'RABBIT', 'Rabbit', 'NETHERLAND_DWARF', 'Netherland Dwarf')
ON DUPLICATE KEY UPDATE
    type = VALUES(type),
    type_name = VALUES(type_name),
    breed = VALUES(breed),
    breed_name = VALUES(breed_name);

INSERT INTO pet_details (id, pet_type, pet_name, pet_breed, pet_gender, pet_dob, pet_owner_id, pet_type_desc, pet_breed_desc) VALUES
    (1, 'CAT', 'Milo', 'PERSIAN', 'MALE', '2023-01-10', 1, 'Cat', 'Persian'),
    (2, 'DOG', 'Luna', 'HUSKY', 'FEMALE', '2022-06-18', 1, 'Dog', 'Siberian Husky'),
    (3, 'DOG', 'Max', 'SHIBA', 'MALE', '2021-11-09', 2, 'Dog', 'Shiba Inu'),
    (4, 'CAT', 'Nala', 'SIAMESE', 'FEMALE', '2020-03-22', 4, 'Cat', 'Siamese'),
    (5, 'RABBIT', 'Snowy', 'NETHERLAND_DWARF', 'FEMALE', '2024-02-14', 5, 'Rabbit', 'Netherland Dwarf')
ON DUPLICATE KEY UPDATE
    pet_type = VALUES(pet_type),
    pet_name = VALUES(pet_name),
    pet_breed = VALUES(pet_breed),
    pet_gender = VALUES(pet_gender),
    pet_dob = VALUES(pet_dob),
    pet_owner_id = VALUES(pet_owner_id),
    pet_type_desc = VALUES(pet_type_desc),
    pet_breed_desc = VALUES(pet_breed_desc);

INSERT INTO pet_medical (history_id, history_activities, history_date, histry_location, owner_id, pet_id) VALUES
    (1, 'Core vaccination', '2025-01-15', 'PetHub Vet KL', 1, 1),
    (2, 'Deworming follow-up', '2025-03-20', 'PetHub Vet KL', 1, 1),
    (3, 'Skin allergy treatment', '2025-04-05', 'Happy Paws Clinic', 1, 2),
    (4, 'Annual checkup', '2025-02-11', 'North Animal Center', 2, 3),
    (5, 'Dental cleaning', '2025-04-30', 'North Animal Center', 2, 3),
    (6, 'Eye infection treatment', '2025-03-01', 'City Pet Hospital', 4, 4),
    (7, 'Neutering consultation', '2025-05-02', 'City Pet Hospital', 4, 4),
    (8, 'General wellness check', '2025-04-25', 'Rabbit Care Hub', 5, 5)
ON DUPLICATE KEY UPDATE
    history_activities = VALUES(history_activities),
    history_date = VALUES(history_date),
    histry_location = VALUES(histry_location),
    owner_id = VALUES(owner_id),
    pet_id = VALUES(pet_id);
