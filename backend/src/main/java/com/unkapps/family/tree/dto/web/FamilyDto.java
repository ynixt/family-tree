package com.unkapps.family.tree.dto.web;

import java.util.List;

import com.unkapps.family.tree.domain.Family;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FamilyDto {
	private Long id;
	private Long version;
	private List<PersonDto> persons;
	
	public static FamilyDto fromEntity(Family family) {
		return new FamilyDto(family.getId(), family.getVersion(), PersonDto.fromEntity(family.getPersons()));
	}
}
