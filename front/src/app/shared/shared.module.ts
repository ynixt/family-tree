import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    CollapseModule,
    ModalModule,
    NavbarComponent
  ]
})
export class SharedModule { }
