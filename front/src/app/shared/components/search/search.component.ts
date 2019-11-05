import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import Search from './search';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public formGroup: FormGroup;

  public attemptToSubmit: boolean;

  @Input() model: Search = {};

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.attemptToSubmit = false;
    this.formGroup = new FormGroup({
      name: new FormControl(this.model.name, [
        Validators.required,
        Validators.maxLength(120)
      ])
    });
  }

  public get nameControl(): AbstractControl {
    return this.formGroup.get('name');
  }

  public onSubmit() {
    this.attemptToSubmit = true;
    if (this.formGroup.invalid === false) {
      this.router.navigate([`/s/${this.formGroup.get('name').value}`]);
    }
  }

}
