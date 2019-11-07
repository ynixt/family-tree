import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Person from 'src/app/pages/person-page/person';
import { PersonPageService } from '../person-page.service';
import ActionAdd from './action-buttons/action-add';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() person: Person;
  @Output() removed = new EventEmitter<Person>();
  @Output() parentAdded = new EventEmitter<Person>();

  public actionAdd: ActionAdd = {
    newParent: this.newParent.bind(this),
    newChildren: this.newChildren.bind(this),
    newSpouse: this.newSpouse.bind(this),
    newBrother: this.newBrother.bind(this),
  };

  constructor(
    private service: PersonPageService
  ) { }

  ngOnInit() {
  }

  public remove(includeChildrens) {
    if (!this.person.father.ghost && (this.person.father.childrens.length < 2 ||
      this.person.childrens && this.person.childrens.length > 0 && !includeChildrens)) {
      if (includeChildrens) {
        this.service.removePersons(this.person.childrens, true);
      }

      this.service.resetPerson(this.person, includeChildrens);
    } else {
      if (this.person.father.ghost && this.person.spouse) {
        this.person.father.childrens.push(this.person.spouse);
        this.removeChildren(this.person.father, this.person);
        this.person.spouse.childrens = this.person.childrens;
        this.parentAdded.emit(this.person.spouse);
      }
      this.service.removePerson(this.person, true);
      this.removed.emit(this.person);
    }
  }

  public removeSpouse() {
    this.service.removePerson(this.person.spouse);

    this.person.spouse = null;
    this.person.spouseId = null;

    if (this.person.childrens != null) {
      this.person.childrens.forEach(children => children.mother = this.person.spouse);
    }
  }

  public childrenRemoved(children: Person) {
    this.removeChildren(this.person, children);
  }

  private removeChildren(person: Person, children: Person) {
    for (let i = 0; i < person.childrens.length; i++) {
      if (person.childrens[i].tempId === children.tempId) {
        person.childrens.splice(i, 1);
        break;
      }
    }
  }

  private newParent(person = this.person) {
    if (person.father.ghost) {
      this.newFather(person);
    } else {
      this.newMother(person);
    }
  }

  private newFather(person = this.person) {
    person.father.ghost = false;
    person.father.mother = this.service.newGhostPerson(true, undefined);
    person.father.father = this.service.newGhostPerson(true, person.father.mother);
    person.father.father.childrens = [person.father];

    this.parentAdded.emit(person.father);
  }

  private newMother(person = this.person) {
    person.mother = this.service.newPerson(undefined, undefined, false);
    person.father.spouse = person.mother;
  }

  private newChildren(person = this.person) {
    if (person.childrens == null) {
      person.childrens = [];
    }
    person.childrens.push(this.service.newPerson(person, person.spouse ? person.spouse : {}, true));
  }
  private newSpouse(person = this.person) {
    person.spouse = this.service.newPerson(undefined, undefined, false);
    if (person.childrens != null) {
      person.childrens.forEach(children => children.mother = person.spouse);
    }
  }

  private newBrother() {
    this.newChildren(this.person.father);
  }

}
