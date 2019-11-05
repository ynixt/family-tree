package com.unkapps.family.tree.dto.web;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.unkapps.family.tree.domain.Person;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PersonOidDto extends DtoWithoutNull implements Serializable {
	private static final long serialVersionUID = 8806676332846052443L;

	private Long id;

	public static PersonOidDto fromEntity(Person person) {
		if (person == null) {
			return null;
		}

		return new PersonOidDto(person.getId());
	}

	public static List<PersonOidDto> fromEntity(Collection<Person> persons) {
		if (persons != null) {
			return persons.stream().map(person -> fromEntity(person)).collect(Collectors.toList());
		}

		return null;
	}

}
