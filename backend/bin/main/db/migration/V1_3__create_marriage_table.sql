create table marriage (
    id IDENTITY,
    person_one_id bigint,
    person_two_id bigint,
);

alter table marriage add foreign key (person_one_id) references person (id);
alter table marriage add foreign key (person_two_id) references person (id);
alter table marriage add foreign key (person_two_id) references person (id);

create unique index marriage on marriage (person_one_id, person_two_id);
