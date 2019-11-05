import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { SearchPageRoutingModule } from './search-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchPageService } from './search-page.service';
import { PersonComponent } from './person/person.component';



@NgModule({
  declarations: [SearchPageComponent, PersonComponent],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    SharedModule
  ],
  providers: [
    SearchPageService
  ]
})
export class SearchPageModule { }
