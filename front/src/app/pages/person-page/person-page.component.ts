import { Component, ViewEncapsulation, OnInit } from '@angular/core';

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

  get person(): Person {
    return this.person$;
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

    this.route.data.subscribe(data => {
      if (data.new === true) {
        this.service.clearPersonsByTempId();
        this.person$ = this.service.newPerson(null, null, true);
        this.personLoaded$ = true;
      } else {
        this.loadPersonByFamilyId();
      }
    });
  }

  private async loadPersonByFamilyId() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id) === false) {
      try {
        this.person$ = this.service.getFirstForTree(await this.service.getPersonsOfFamily(id));
        this.personLoaded$ = true;
      } catch (err) {
        alert('Um erro aconteceu. Tente novamente mais tarde.');
      }
    }
  }

  public firstForTreeChanged(person) {
    this.person$ = person;
  }

  public async save() {
    try {
      this.person$ = this.service.getFirstForTree(await this.service.save());
    } catch (err) {
      console.log(err);
      alert('Um erro aconteceu. Tente novamente mais tarde.');
    }
  }
}
