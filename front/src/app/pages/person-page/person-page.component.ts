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

  /**
   * Carrega a pessoa inicial da árvore.
   * Caso a página atual seja a página de "criar nova árvore" então essa pessoa será uma pessoa com valores default.
   * Caso contrário uma requisição será efetuada para obter a pessoa através de sua família.
   */
  private async loadPerson() {
    this.personLoaded$ = false;

    this.route.data.subscribe(data => {
      if (data.new === true) {
        this.service.clearPersonsByTempId();
        this.person$ = this.service.newPerson(null, null, true);
        this.personLoaded$ = true;
      } else {
        this.loadPersonByFamilyIdOnParams();
      }
    });
  }

  private async loadPersonByFamilyIdOnParams() {
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

  /**
   * Callback disparado quando a primeira pessoa da árvore é trocada
   * @param person 
   */
  public firstForTreeChanged(person) {
    this.person$ = person;
  }

  public async save() {
    try {
      this.person$ = this.service.getFirstForTree(await this.service.save());
      alert("Salvo com sucesso");
    } catch (err) {
      console.log(err);
      alert('Um erro aconteceu. Tente novamente mais tarde.');
    }
  }
}
