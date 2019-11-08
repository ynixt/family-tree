import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Error404PageComponent } from './pages/erros/error404-page/error404-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'f', loadChildren: () => import('./pages/person-page/person-page.module').then(m => m.PersonPageModule) },
  { path: 's', loadChildren: () => import('./pages/search-page/search-page.module').then(m => m.SearchPageModule) },
  { path: '**', component: Error404PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
