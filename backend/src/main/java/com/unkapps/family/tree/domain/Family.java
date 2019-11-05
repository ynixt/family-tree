package com.unkapps.family.tree.domain;

import javax.persistence.Entity;
import javax.persistence.Version;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Family extends Domain {
	@Version
	private long version;
}
