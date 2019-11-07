package com.unkapps.family.tree.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
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
	private Long version;
	
	@OneToMany(mappedBy = "family", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Person> persons;

	public Family(Long id, Long version, Set<Person> persons) {
		setId(id);
		this.version = version;
		this.persons = persons;
	}
}
