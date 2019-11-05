import { Component, OnInit, Input } from '@angular/core';
import Person from 'src/app/shared/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() person: Person;

  constructor() { }

  ngOnInit() {
  }

}
