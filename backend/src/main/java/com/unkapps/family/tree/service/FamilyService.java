package com.unkapps.family.tree.service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unkapps.family.tree.domain.Family;
import com.unkapps.family.tree.domain.Person;
import com.unkapps.family.tree.dto.web.FamilyDto;
import com.unkapps.family.tree.dto.web.save.FamilyForSaveDto;
import com.unkapps.family.tree.repository.FamilyRepository;

@Service
public class FamilyService {
	@Autowired
	private FamilyRepository familyRepository;

	@PersistenceContext
	private EntityManager entityManager;

	public FamilyDto save(FamilyForSaveDto dto) {
		final Family f = FamilyForSaveDto.toDomain(dto);

		f.getPersons().forEach(p -> fixReferencesForSave(p, f, null));
		
		Set<Person> allPersonsForSave = getPersonsForSave(f.getPersons());
		
		f.getPersons().clear();
		f.getPersons().addAll(allPersonsForSave);

		return get(this.familyRepository.save(f).getId());
	}

	public FamilyDto get(Long familyId) {
		return FamilyDto.fromEntity(this.familyRepository.get(familyId));
	}

	private void fixReferencesForSave(Person p, Family f, Person father) {
		p.setFamily(f);

		if (father != null) {
			p.setMother(father.getSpouse());
			if(father.getSpouse() != null) {
				father.getSpouse().setFamily(f);
			}
			p.setFather(father);
		}

		if (p.getChildrens() != null) {
			p.getChildrens().forEach(c -> {
				fixReferencesForSave(c, f, p);
			});
		}
	}

	private Set<Person> getPersonsForSave(Collection<Person> topPersons) {
		Set<Person> persons = new HashSet<>();

		topPersons.forEach(person -> {
			persons.add(person);

			if (person.getFather() != null) {
				persons.add(person.getFather());
			}

			if (person.getMother() != null) {
				persons.add(person.getMother());
			}

			if (person.getSpouse() != null) {
				persons.add(person.getSpouse());
			}

			if (person.getChildrens() != null) {
				persons.addAll(getPersonsForSave(person.getChildrens()));
			}
		});

		return persons;
	}
}
