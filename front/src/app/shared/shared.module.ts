import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CollapseModule,
    ModalModule,
    NavbarComponent,
    SearchComponent,
  ]
})
export class SharedModule { }
