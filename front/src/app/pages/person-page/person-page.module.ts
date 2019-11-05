import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragScrollModule } from 'ngx-drag-scroll';

import { PersonPageRoutingModule } from './person-page-routing.module';
import { PersonPageComponent } from './person-page.component';
import { PersonComponent } from './person/person.component';


@NgModule({
  declarations: [PersonPageComponent, PersonComponent],
  imports: [
    CommonModule,
    DragScrollModule,
    PersonPageRoutingModule
  ]
})
export class PersonPageModule { }
