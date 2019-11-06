import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import Person from 'src/app/pages/person-page/person';

@Injectable({
  providedIn: 'root'
})
export class PersonPageService {
	private url = `${environment.serverUrl}p/`;

  constructor(
    private http: HttpClient,
  ) {
  }

	private async getPersonsOfFamily(idFamily: number): Promise<Person[]> {
		const persons = await this.http.get<Person[]>(`${this.url}fromFamily/${idFamily}`).toPromise();

		for (let person of persons) {
			person.tempId = new Date();
		}

		return persons;
	}

  async getFirstForTree(idFamily: number): Promise<Person> {
    const persons: Person[] = await this.getPersonsOfFamily(idFamily);

    if (persons.length === 0) {
      throw new Error('not found');
    }

    const personsById = new Map(
      persons.map(p => [p.id, p] as [number, Person])
    );

    this.fixReferences(persons, personsById);

    return this.getFirstGhost(persons);
  }

  private fixReferences(persons: Person[], personsById: Map<number, Person>) {
    for (const person of persons) {
      if (person.name == null) {
        person.name = 'Desconhecido';
      }

      if (person.fatherId != null) {
        person.father = personsById.get(person.fatherId);
      }
      if (person.motherId != null) {
        person.mother = personsById.get(person.motherId);
      }
      if (person.spouseId != null) {
        person.spouse = personsById.get(person.spouseId);
      }
      if (person.childrens) {
        for (let i = 0; i < person.childrens.length; i++) {
          person.childrens[i] = personsById.get(person.childrens[i].id);
        }
      }
    }
  }

  private getFirstGhost(persons: Person[]): Person {
    const ghost = persons.map(p => {
      return {
        height: this.getHeightOfPerson(p),
        person: p
      };
    }).sort((p1, p2) => p2.height - p1.height)[0].person;

    ghost.ghost = true;
    ghost.spouse.ghost = ghost.spouse.name == null;

    return ghost;
  }

  private getHeightOfPerson(person: Person) {
    let height = 1;

    if (person.childrens && person.childrens.length > 0) {
      height += Math.max(...person.childrens.map(c => this.getHeightOfPerson(c)));
    }

    return height;
	}
	
  public newPerson(father: Person, mother: Person, spouse?: Person): Person {
    return {
      name: 'Desconhecido',
      father: father,
      mother: mother,
	  spouse: spouse,
	  tempId: new Date()
    } as Person;
  }
}
