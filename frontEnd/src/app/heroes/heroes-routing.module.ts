import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroesFormComponent } from './heroes-form/heroes-form.component';


const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
  },
  {
    path: ':id',
    component: HeroesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
