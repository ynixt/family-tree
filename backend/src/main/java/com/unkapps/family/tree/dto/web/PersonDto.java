package com.unkapps.family.tree.dto.web;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.unkapps.family.tree.domain.Person;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PersonDto extends DtoWithoutNull implements Serializable {
	private static final long serialVersionUID = 8806676332846052443L;

	private Long id;

	private boolean male;

	private String name;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
	private ZonedDateTime birth;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
	private ZonedDateTime death;

	private List<PersonOidDto> childrens;

	private Long spouseId;

	private Long fatherId;

	private Long motherId;

	public static PersonDto fromEntity(Person person) {
		if (person == null) {
			return null;
		}

		return new PersonDto(person.getId(), person.isMale(), person.getName(), person.getBirth(), person.getDeath(),
				PersonOidDto.fromEntity(person.getChildrens()), person.getSpouseId(), person.getFatherId(),
				person.getMotherId());
	}

	public static List<PersonDto> fromEntity(Collection<Person> persons) {
		if (persons != null) {
			return persons.stream().map(person -> fromEntity(person)).collect(Collectors.toList());
		}

		return null;
	}

}
