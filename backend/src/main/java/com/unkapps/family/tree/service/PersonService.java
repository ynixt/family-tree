package com.unkapps.family.tree.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unkapps.family.tree.dto.web.PersonSonOfDto;
import com.unkapps.family.tree.repository.PersonRepository;

@Service
public class PersonService {
	@Autowired
	private PersonRepository personRepository;

	public List<PersonSonOfDto> query(String name) {
		return this.personRepository.query(name);
	}
}
