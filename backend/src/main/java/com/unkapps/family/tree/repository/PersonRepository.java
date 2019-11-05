package com.unkapps.family.tree.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import com.unkapps.family.tree.domain.Person;

public interface PersonRepository extends Repository<Person, Long> {

	@Query("from Person p"
			+ " left join fetch p.childrens"
			+ " where p.family.id = :familyId"
			) Set<Person> getPersonFromFamily(@Param("familyId") Long familyId);
}
