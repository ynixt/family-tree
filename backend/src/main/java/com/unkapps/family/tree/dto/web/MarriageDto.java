//package com.unkapps.family.tree.dto.web;
//
//import java.io.Serializable;
//
//import com.unkapps.family.tree.domain.Marriage;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//
//@Getter
//@AllArgsConstructor
//public class MarriageDto extends DtoWithoutNull implements Serializable {
//	private static final long serialVersionUID = 8806676332846052443L;
//
//	private Long id;
//
//	private Long personTwoId;
//
//	public static MarriageDto fromEntity(Marriage marriage) {
//		if (marriage == null) {
//			return null;
//		}
//
//		return new MarriageDto(marriage.getId(), marriage.getPersonTwoId());
//	}
//
//}
