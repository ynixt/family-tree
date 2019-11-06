import { Component, OnInit, Input } from '@angular/core';
import ActionAdd from './action-add';
import Person from '../../person';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  @Input() showAdd = true;
  @Input() canRemoveChildrens = true;
  @Input() removeFunction: () => void;
  @Input() actionAdd: ActionAdd;
  @Input() person: Person;

    constructor() { }

  ngOnInit() {
  }

}
