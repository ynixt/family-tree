import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule, BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BsDropdownModule,
    CollapseModule,
    BsDatepickerModule,
    NavbarComponent,
    SearchComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
