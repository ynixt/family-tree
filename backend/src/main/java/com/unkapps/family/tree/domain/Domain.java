package com.unkapps.family.tree.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.proxy.HibernateProxyHelper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class Domain {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Override
	public int hashCode() {
		if (this.getId() == null) {
			return super.hashCode();
		}

		return this.getId().hashCode();
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		} else if (this == obj) {
			return true;
		}

		if (!HibernateProxyHelper.getClassWithoutInitializingProxy(obj).isAssignableFrom(this.getClass())
				&& HibernateProxyHelper.getClassWithoutInitializingProxy(this) != HibernateProxyHelper
						.getClassWithoutInitializingProxy(obj)) {
			return false;
		}

		Domain other = (Domain) obj;
		if (this.getId() == null && other.getId() != null) {
			return false;
		}

		return this.getId().equals(other.getId());
	}
}
