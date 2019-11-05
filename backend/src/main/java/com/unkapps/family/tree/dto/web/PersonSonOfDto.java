package com.unkapps.family.tree.dto.web;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PersonSonOfDto extends DtoWithoutNull implements Serializable {
	private static final long serialVersionUID = 8475995982262931325L;

	private Long oid;
	private String name;
	private String father;
	private String mother;
	private Long familyId;
}
