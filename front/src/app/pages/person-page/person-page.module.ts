import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DragScrollModule } from 'ngx-drag-scroll';

import { PersonPageRoutingModule } from './person-page-routing.module';
import { PersonPageComponent } from './person-page.component';
import { PersonComponent } from './person/person.component';
import { ActionButtonsComponent } from './person/action-buttons/action-buttons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonPageService } from './person-page.service';


@NgModule({
  declarations: [PersonPageComponent, PersonComponent, ActionButtonsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DragScrollModule,
    PersonPageRoutingModule,
  ],
  providers: [
    PersonPageService,
    DatePipe
  ]
})
export class PersonPageModule { }
