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
    newFather: this.newFather.bind(this),
    newMother: this.newMother.bind(this),
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
    if (this.person.father.ghost && this.person.father.childrens.length < 2 || !includeChildrens) {
      this.service.resetPerson(this.person, includeChildrens);
    } else {
      this.removed.emit(this.person);
    }
  }

  public removeSpouse() {
    this.person.spouse = null;
    this.person.spouseId = null;

    if (this.person.childrens != null) {
      this.person.childrens.forEach(children => children.mother = this.person.spouse);
    }
  }

  public childrenRemoved(children: Person) {
    for (let i = 0; i < this.person.childrens.length; i++) {
      if (this.person.childrens[i].tempId === children.tempId) {
        this.person.childrens.splice(i, 1);
        break;
      }
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
    person.mother.ghost = false;
    if (person.father.ghost) {
      this.newFather(person);
    }
    person.mother.mother = this.service.newGhostPerson(true, undefined);
    person.mother.father = this.service.newGhostPerson(true, person.father.mother);
    person.mother.father.childrens = [person.father];
  }
  private newChildren(person = this.person) {
    if (person.childrens == null) {
      person.childrens = [];
    }
    person.childrens.push(this.service.newPerson(person, person.spouse ? person.spouse : {}, true));
  }
  private newSpouse(person = this.person) {
    person.spouse = this.service.newPerson({}, {}, false);
    if (person.childrens != null) {
      person.childrens.forEach(children => children.mother = person.spouse);
    }
  }

  private newBrother() {
    this.newChildren(this.person.father);
  }

}
