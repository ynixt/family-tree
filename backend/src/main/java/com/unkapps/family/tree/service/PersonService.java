package com.unkapps.family.tree.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unkapps.family.tree.dto.web.PersonDto;
import com.unkapps.family.tree.repository.PersonRepository;

@Service
public class PersonService {
	@Autowired
	private PersonRepository personRepository;

	public List<PersonDto> getFamilyTreeOf(Long familyId) {
		return PersonDto.fromEntity(this.personRepository.getPersonFromFamily(familyId));
	}
}
