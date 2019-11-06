import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Person from 'src/app/pages/person-page/person';
import { PersonPageService } from '../person-page.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() person: Person;
  @Output() removed = new EventEmitter<Person>();

  constructor(
    private service: PersonPageService
  ) { }

  ngOnInit() {
  }

  public remove() {
	 this.removed.emit(this.person);
  }

  public removeSpouse() {
    this.person.spouse = null;
    this.person.spouseId = null;
  }

  public childrenRemoved(children: Person) {
    for (let i = 0; i < this.person.childrens.length; i++) {
      if (this.person.childrens[i].tempId === children.tempId) {
        if (this.person.ghost && this.person.childrens.length < 2) {
          this.person.childrens[i] = this.service.newPerson({}, {});
        } else {
          this.person.childrens.splice(i, 1);
        }
        break;
      }
    }
  }

}
