package com.unkapps.family.tree.domain;

import java.time.ZonedDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Person extends Domain {

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Family family;

	@Column
	private boolean male;

	@Column
	@Size(max = 120)
	private String name;

	@Column
	private ZonedDateTime birth;

	@Column
	private ZonedDateTime death;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "father_id")
	private Person father;

	@Column(name = "father_id", insertable = false, updatable = false)
	private Long fatherId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mother_id")
	private Person mother;

	@Column(name = "mother_id", insertable = false, updatable = false)
	private Long motherId;

	@OneToMany(mappedBy = "father")
	private Set<Person> childrens;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "spouse_id")
	private Person spouse;

	@Column(name = "spouse_id", insertable = false, updatable = false)
	private Long spouseId;
}
