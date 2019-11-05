//package com.unkapps.family.tree.domain;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.JoinColumn;
//import javax.persistence.OneToOne;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//public class Marriage extends Domain {
//	@OneToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "person_one_id")
//	private Person personOne;
//
//	@OneToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "person_two_id")
//	private Person personTwo;
//
//	@Column(name = "person_two_id", insertable = false, updatable = false)
//	private Long personTwoId;
//}
