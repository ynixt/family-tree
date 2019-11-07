package com.unkapps.family.tree.dto.web.save;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.unkapps.family.tree.domain.Person;
import com.unkapps.family.tree.dto.web.DtoWithoutNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PersonForSaveDto extends DtoWithoutNull implements Serializable {
	private static final long serialVersionUID = 8806676332846052443L;

	private Long id;

	private boolean male;

	private String name;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
	private ZonedDateTime birth;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
	private ZonedDateTime death;

	private List<PersonForSaveDto> childrens;

	private PersonForSaveDto spouse;

	public static Person toDomain(PersonForSaveDto dto) {
		if (dto == null) {
			return null;
		}

		return new Person(dto.id, dto.male, dto.name, dto.birth, dto.death, PersonForSaveDto.toDomain(dto.childrens),
				PersonForSaveDto.toDomain(dto.spouse));
	}

	public static Set<Person> toDomain(Collection<PersonForSaveDto> dtos) {
		if (dtos == null) {
			return new HashSet<>();
		}

		return dtos.stream().map(p -> PersonForSaveDto.toDomain(p)).collect(Collectors.toSet());
	}
}
