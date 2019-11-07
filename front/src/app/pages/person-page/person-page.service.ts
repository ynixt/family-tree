import { Injectable, NgZone } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import Person from 'src/app/pages/person-page/person';
import Family from './family';
import { DatePipe } from '@angular/common';

export const defaultPersonName = 'Desconhecido';

@Injectable({
  providedIn: 'root'
})
export class PersonPageService {
  private url = `${environment.serverUrl}f/`;
  private personsByTempId: Map<Date, Person>;
  private family: Family;

  constructor(
    private http: HttpClient,
    public zone: NgZone,
    private datePipe: DatePipe
  ) {
  }

  public clearPersonsByTempId() {
    this.personsByTempId = new Map();
  }

  public async getPersonsOfFamily(idFamily: number): Promise<Person[]> {
    this.family = await this.http.get<Family>(`${this.url}${idFamily}`).toPromise();

    if (this.family == null) {
      throw new Error('not found');
    }

    for (const person of this.family.persons) {
      person.tempId = new Date();
      this.dateForShow(person);
    }

    return this.family.persons;
  }

  public getFirstForTree(persons: Person[]): Person {
    this.buildPersonsMap(persons);

    const personsById = new Map(
      persons.map(p => [p.id, p] as [number, Person])
    );

    this.fixReferences(persons, personsById);

    return this.getFirstGhost(persons);
  }

  private fixReferences(persons: Person[], personsById: Map<number, Person>) {
    for (const person of persons) {
      if (person.name == null) {
        person.name = defaultPersonName;
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

    return ghost;
  }

  private getHeightOfPerson(person: Person) {
    let height = 1;

    if (person.childrens && person.childrens.length > 0) {
      height += Math.max(...person.childrens.map(c => this.getHeightOfPerson(c)));
    }

    return height;
  }

  /**
   * Cria uma nova pessoa
   * @param father Caso null será criado um pai ghost. Caso undefined ficará sem pai
   * @param mother Caso null será criado um mãe ghost. Caso undefined ficará sem mãe
   * @param male Caso true será masculino. Caso false será feminino
   * @param spouse Esposa
   * @param ghost Caso true a pessoa não aparecerá na árvore
   */
  public newPerson(father: Person, mother: Person, male: boolean, spouse?: Person, ghost?: boolean): Person {
    if (mother === null) {
      mother = this.newPerson(undefined, undefined, true, undefined, true);
      this.addPerson(mother);
    }
    if (father === null) {
      father = this.newPerson(undefined, undefined, true, mother, true);
      this.addPerson(father);
    }

    const person: Person = {
      name: defaultPersonName,
      father,
      mother,
      spouse,
      male,
      ghost,
      tempId: new Date(),
    };

    if (father) {
      if (father.childrens == null) {
        father.childrens = [];
      }
      father.childrens.push(person);
    }

    this.addPerson(person);

    return person;
  }

  public newGhostPerson(male: boolean, spouse?: Person): Person {
    return this.newPerson(undefined, undefined, male, spouse, true);
  }

  public resetPerson(person: Person, removeChildrens = false) {
    person.birth = null;
    person.death = null;
    person.name = defaultPersonName;
    person.male = true;

    if (removeChildrens) {
      person.childrens = [];
    }
  }

  public buildPersonsMap(persons: Person[]) {
    this.personsByTempId = new Map();

    for (const person of persons) {
      this.addPerson(person);
    }
  }

  public addPerson(p: Person) {
    this.personsByTempId.set(p.tempId, p);
  }

  public removePerson(p: Person, removeChildrens = false) {
    this.personsByTempId.delete(p.tempId);

    if (p.spouse && !p.father.ghost) {
      this.removePerson(p.spouse);
    }

    if (removeChildrens) {
      this.removePersons(p.childrens, true);
    }

    if (p.father && !p.father.ghost && p.father.childrens.length < 2) {
      this.personsByTempId.delete(p.father.tempId);
      if (p.father.spouse != null) {
        this.personsByTempId.delete(p.father.spouse.tempId);
      }
    }
  }

  public removePersons(persons: Person[], removeChildrens = false) {
    if (persons == null) {
      return;
    }

    persons.forEach(p => this.removePerson(p, removeChildrens));
  }

  public async save(): Promise<Person[]> {
    const personsForSave: Person[] = Array.from(this.personsByTempId.values()).filter(p => p.father == null && p.mother == null);

    const familyForSave = { ... this.family };
    familyForSave.persons = this.removeCircularReferenceForSave(personsForSave);

    this.family = await this.http.post<Family>(this.url, familyForSave).toPromise();

    this.family.persons.forEach(p => this.dateForShow(p));

    return this.family.persons;
  }

  private removeCircularReferenceForSave(persons: Person[]) {
    const copy = [];

    if (persons == null) {
      return;
    }

    persons.forEach(p => {
      p = { ...p };
      delete p.father;
      delete p.mother;
      delete p.fatherId;
      delete p.motherId;
      delete p.tempId;


      p.birth = this.dateForSave(p.birth);
      p.death = this.dateForSave(p.death);

      if (p.spouse) {
        p.spouse.birth = this.dateForSave(p.spouse.birth);
        p.spouse.death = this.dateForSave(p.spouse.death);
      }

      copy.push(p);
      p.childrens = this.removeCircularReferenceForSave(p.childrens);
    });

    return copy;
  }

  private dateForShow(person: Person) {
    if (person.birth) {
      person.birth = new Date(person.birth);
    }
    if (person.death) {
      person.death = new Date(person.death);
    }
  }

  private dateForSave(date): string {
    if (date == null) {
      return null;
    }

    return this.datePipe.transform(date, `yyyy-MM-dd'T'HH:mm:ss.SSSZ`);
  }
}
