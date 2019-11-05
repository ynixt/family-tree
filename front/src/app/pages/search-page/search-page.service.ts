import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import Person from './person';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {
  private url = `${environment.serverUrl}p`;

  constructor(
    private http: HttpClient,
  ) {
  }

  public query(name: string): Promise<Person[]> {
    return this.http.get<Person[]>(`${this.url}/${name}`).toPromise();
  }
}
