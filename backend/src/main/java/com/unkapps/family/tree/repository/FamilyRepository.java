package com.unkapps.family.tree.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import com.unkapps.family.tree.domain.Family;

public interface FamilyRepository extends Repository<Family, Long> {
	 Family save(Family entity);
	 

	@Query("from Family f"
			+ " join fetch f.persons p"
			+ " left join fetch p.childrens"
			+ " where f.id = :familyId"
			)
	Family get(@Param("familyId") Long familyId);
}
