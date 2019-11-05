package com.unkapps.family.tree.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import com.unkapps.family.tree.domain.Person;
import com.unkapps.family.tree.dto.web.PersonSonOfDto;

public interface PersonRepository extends Repository<Person, Long> {

	@Query("from Person p"
			+ " left join fetch p.childrens"
			+ " where p.family.id = :familyId"
			) Set<Person> getPersonFromFamily(@Param("familyId") Long familyId);
	
	@Query( "select new com.unkapps.family.tree.dto.web.PersonSonOfDto("
			+ " p.id, p.name,"
			+ " father.name,"
			+ " mother.name,"
			+ " family.id"
			+ ")"
			+ " from Person p"
			+ " join p.family family"
			+ " left join p.father father"
			+ " left join p.mother mother"
			+ " where lower(p.name) like %:name%"
			) List<PersonSonOfDto> query(@Param("name") String name);
}
