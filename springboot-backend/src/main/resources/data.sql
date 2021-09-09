INSERT INTO ROLE (role_name) VALUES
       ('ADMIN'),
       ('EMPLOYEE_DOCTOR'),
       ('EMPLOYEE_MEDICAL_TECH'),
       ('EMPLOYEE_HOSPITAL_MANAG'),
       ('USER');

INSERT INTO BLOOD_TYPE (blood_type, rh_factor) VALUES
       ('A',true),
       ('A',false),
       ('B',true),
       ('B',false),
       ('AB',true),
       ('0', false);

INSERT INTO USER (blood_type_id, role_id, username, password, first_name,last_name, email, birth_date,residence_place,address, phone_number, donation_needed, gender) VALUES
        (1, 1, 'LAMIJA', '$2a$12$YezSzscqKXziACxBPsDoweFmUli8nmx7Hv3ohhAZcgArXe8jLz4Wy', 'Lamija', 'Alagić', 'lamija@etf.unsa.ba', CAST('2019-09-23' AS datetime), 'Travnik','Bosanska bb','123 456 789', 0, 'Z'),
        (2, 2, 'NOVI', '$2a$12$Y7Jz.cvMXBUroSb041T20ObUqmEmME7hf8uEOfVJd4en1R/rpCmmK', 'Adna', 'Čogić', 'adna_nova@gmail.com', CAST('2000-09-23' AS datetime), 'Sarajevo','Grbavicka','123 456 789', 1,'M'),
        (3, 3, 'AJNA', '$2a$12$ZNpsfmtsRcPTzhHKKCWv3.Epa5p.TgQJg/ZC6NVCPPtSltIEG3Mdy', 'Ajna', 'Tomašević', 'ajnica@outlock.com', CAST('2005-03-15' AS datetime), 'Tuzla','Tuzlanska 23','123 456 789', 1, 'Z'),
        (4, 4, 'MIKI', '$2a$12$f0.8hytkZrZgXtZd8KJ86.bLofhyH.t/8C1aR/vqIbFDz47ZDJqJu', 'Miki', 'Maus', 'miki_m@yahoo.com', CAST('1993-05-15' AS datetime), 'Zenica','Mostarska 1','123 456 789', 1,'M'),
        (1, 5, 'TESLA', '$2a$12$G4jySHCd.7LNFku1Yl.XBORkkc9JZCtQlc/HHqOnu4rmDsmA1KiWS', 'Tesla', 'Nikola', 'teslaN1@unsa.ba', CAST('2001-09-01' AS datetime), 'Mostar','Gradacacka','123 456 789', 1, 'Z'),
        (1, 5, 'TOMAS', '$2a$12$eEkTeXGaLFuMqSiTnxRBJ.b1wvw33a4CPVOFNyQZfHPX8VJzSjGOu', 'Tomas', 'Edison', 'strujaa@gmail.com', CAST('2000-07-25' AS datetime), 'Neum','Gradska 1','123 456 789', 1,'M'),
        (6, 5, 'NEREGISTROVAN', '$2a$12$eEkTeXGaLFuMqSiTnxRBJ.b1wvw33a4CPVOFNyQZfHPX8VJzSjGOu', 'Neregistrovan', 'Neregistrovan', 'dummy@stari.com', CAST('1001-01-01' AS datetime), 'Neregistrovan','Neregistrovan','111 111 111', 0,'M');

INSERT INTO DONATIONS (user_id, user_username, donation_date, donation_place, blood_quantity) VALUES
        (1, 7,  CAST('2019-09-23' AS datetime), 'Travnik', 1),
        (2, 7,  CAST('2020-04-23' AS datetime), 'Jajce', 3);

INSERT INTO TRANSFUSION_TABLE (blood_type_id, user_id, place_of_needed_donation, publishing_date, emergency, blood_quantity_needed, details) VALUES
        (1,1,'Sarajevo',  CAST('2019-09-05' AS datetime), 1, 2, ''),
        (2,2,'Tuzla',  CAST('2019-09-05' AS datetime), 0, 2, '');