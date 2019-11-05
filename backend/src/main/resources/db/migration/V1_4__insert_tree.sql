insert into family(id,version) values (1,1);

insert into person (id, family_id, male) values (1, 1, true);
insert into person (id, family_id, male) values (2, 1, false);
update person set spouse_id = 2 where id = 1;

-- insert into marriage (person_one_id, person_two_id) values (1, 2);
-- insert into marriage (person_one_id, person_two_id) values (2, 1);

insert into person (id, family_id, name, birth, death, male, father_id, mother_id) values (5, 1, 'Jurandir Colosso', '1850-12-05 10:00:00', '1900-01-02 10:00:00', true, 1, 2);
insert into person (id, family_id, name, birth, death, male, father_id, mother_id) values (6, 1, 'Pedro Colosso', '1865-12-05 10:00:00', '1915-01-02 10:00:00', true, 1, 2);
insert into person (id, family_id, name, birth, death, male, father_id, mother_id) values (7, 1, 'Maria Colosso', '1867-12-05 10:00:00', '1915-01-02 10:00:00', false, 1, 2);
insert into person (id, family_id, name, birth, death, male, father_id, mother_id) values (8, 1, 'João Colosso', '1900-12-05 10:00:00', '1935-01-02 10:00:00', true, 1, 2);

insert into person (id, family_id, male) values (9, 1, false);

update person set spouse_id = 9 where id = 8;
-- insert into marriage (person_one_id, person_two_id) values (8, 9);
-- insert into marriage (person_one_id, person_two_id) values (9, 8);

insert into person (id, family_id, name, birth, death, male, father_id, mother_id) values (10, 1, 'Andressa P', '1930-12-05 10:00:00', '2000-01-02 10:00:00', false, 8, 9);

insert into person (id, family_id, male,) values (11, 1, true);
insert into person (id, family_id, male) values (12, 1, false);
update person set spouse_id = 12 where id = 11;
-- insert into marriage (person_one_id, person_two_id) values (11, 12);
-- insert into marriage (person_one_id, person_two_id) values (12, 11);

insert into person (id, family_id, name, birth, death, male, father_id, mother_id) values (13, 1, 'Andriel P', '1935-12-05 10:00:00', '2010-01-02 10:00:00', true, 11, 12);

-- insert into marriage (person_one_id, person_two_id) values (10, 13);
-- insert into marriage (person_one_id, person_two_id) values (13, 10);
update person set spouse_id = 13 where id = 10;

insert into person (id, family_id, name, birth, death, male, father_id, mother_id) values (14, 1, 'Gabriela P', '1990-12-05 10:00:00', '2001-01-02 10:00:00', false, 10, 13);
insert into person (id, family_id, name, birth, male, father_id, mother_id) values (15, 1, 'Maria P', '1989-12-05 10:00:00', false, 10, 13);
insert into person (id, family_id, name, birth, male, father_id, mother_id) values (16, 1, 'Luiza P', '1991-12-05 10:00:00', false, 10, 13);
insert into person (id, family_id, name, birth, male, father_id, mother_id) values (17, 1, 'João P', '1993-12-05 10:00:00', true, 10, 13);