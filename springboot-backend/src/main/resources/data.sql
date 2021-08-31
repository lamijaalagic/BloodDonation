INSERT INTO ROLE (role_name) VALUES
       ('ADMIN'),
       ('EMPLOYEE'),
       ('USER'),
       ('pacijent');

INSERT INTO BLOOD_TYPE (blood_type, rh_factor) VALUES
       ('A',true),
       ('B',false),
       ('AB',true);

INSERT INTO USER (blood_type_id, role_id, username, password, first_name,last_name, email, birth_date,residence_place,address, phone_number, donation_needed, gender) VALUES
        (1, 1, 'LAMIJA', '$2a$12$YezSzscqKXziACxBPsDoweFmUli8nmx7Hv3ohhAZcgArXe8jLz4Wy', 'ADNA', 'ADNA', 'ADNA@bxuhsik', CAST('2019-09-05' AS datetime), 'travnik','travnik','123 456 789', 0, 'Z'),
        (2, 2, 'NOVI', '$2a$12$cbTG7owssCpOv0bYVPRCUe7psgCAvEhueeERIIMrA7jJ56dJEh6D.', 'ADNA', 'ADNA', 'ADNA@bxuhsik', CAST('2019-09-05' AS datetime), 'travnik','travnik','123 456 789', 1,'M');

INSERT INTO DONATIONS (user_id, donation_date, donation_place, blood_quantity) VALUES
        (1,  CAST('2019-09-05' AS datetime), 'novi', 1),
        (2, CAST('2019-09-05' AS datetime), 'negdje', 3);

INSERT INTO TRANSFUSION_TABLE (blood_type_id, user_id, place_of_needed_donation, publishing_date, emergency, blood_quantity_needed, details) VALUES
        (1,1,'sarajevo',  CAST('2019-09-05' AS datetime), 1, 2, ''),
        (2,2,'sarajevo',  CAST('2019-09-05' AS datetime), 0, 2, '');