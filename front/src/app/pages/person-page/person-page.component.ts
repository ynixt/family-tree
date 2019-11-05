import { Component, ViewEncapsulation , OnInit } from '@angular/core';

import Person from 'src/app/pages/person-page/person';
import { ActivatedRoute } from '@angular/router';
import { PersonPageService } from './person-page.service';


@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonPageComponent implements OnInit {

  private person$: Person;
  private personLoaded$ = false;
  private parent$: Person;

  get person(): Person {
    return this.person$;
  }

  get parent(): Person {
    return this.parent$;
  }

  get personLoaded(): boolean {
    return this.personLoaded$;
  }

  constructor(
    private route: ActivatedRoute,
    private service: PersonPageService
  ) { }

  ngOnInit() {
    this.loadPerson();
  }

  private async loadPerson() {
    this.personLoaded$ = false;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id) === false) {
      this.person$ = await this.service.getFirstForTree(id);
      this.parent$ = this.getParent(this.person$)
      this.personLoaded$ = true;
    }
  }

  private getParent(person: Person): Person {
    if (person != null) {

    }

    return null;
  }

}
