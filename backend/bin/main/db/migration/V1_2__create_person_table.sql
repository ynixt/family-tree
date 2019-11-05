create table person (
    id IDENTITY,
    name varchar(120),
    male boolean not null,
    birth TIMESTAMP WITH TIME ZONE, 
    death TIMESTAMP WITH TIME ZONE, 
    family_id bigint,
    father_id bigint,
    mother_id bigint,
    spouse_id bigint
);

alter table person add foreign key (family_id) references family (id);
alter table person add foreign key (father_id) references person (id);
alter table person add foreign key (mother_id) references person (id);
alter table person add foreign key (spouse_id) references person (id);

create index name on person (name);