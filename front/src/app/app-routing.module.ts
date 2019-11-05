import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'f', loadChildren: () => import('./pages/person-page/person-page.module').then(m => m.PersonPageModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
