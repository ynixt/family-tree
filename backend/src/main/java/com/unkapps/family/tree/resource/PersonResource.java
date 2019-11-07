package com.unkapps.family.tree.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.unkapps.family.tree.dto.web.PersonSonOfDto;
import com.unkapps.family.tree.service.PersonService;

@RestController
@RequestMapping("/api/p")
public class PersonResource {
	@Autowired
	private PersonService personService;
	
	@GetMapping(path = "/{name}", produces = "application/json")
	@Transactional(readOnly = true)
	public @ResponseBody List<PersonSonOfDto> get(@PathVariable(required = true) String name) {
		return this.personService.query(name);
	}
}
