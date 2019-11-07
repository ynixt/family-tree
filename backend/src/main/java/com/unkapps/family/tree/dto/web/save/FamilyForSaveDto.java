package com.unkapps.family.tree.dto.web.save;

import java.io.Serializable;
import java.util.List;

import com.unkapps.family.tree.domain.Family;
import com.unkapps.family.tree.dto.web.DtoWithoutNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FamilyForSaveDto extends DtoWithoutNull implements Serializable {

	private static final long serialVersionUID = -8127583560128692432L;
	
	private Long id;
	
	private Long version;
	
	private List<PersonForSaveDto> persons;
	
	public static Family toDomain(FamilyForSaveDto dto) {
		return new Family(dto.id, dto.version, PersonForSaveDto.toDomain(dto.getPersons()));
	}

}
