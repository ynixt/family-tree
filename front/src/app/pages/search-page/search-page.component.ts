import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Search from 'src/app/shared/components/search/search';
import { SearchPageService } from './search-page.service';
import Person from './person';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public search: Search = {};
  public persons: Person[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SearchPageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if (param.has('name')) {
        this.search.name = param.get('name');
        this.getResults(this.search.name);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  private async getResults(name: string) {
    try {
      this.persons = await this.service.query(name);
    } catch (err) {
      this.persons = [];
      alert('Um erro aconteceu. Tente novamente mais tarde.');
    }
  }
}
