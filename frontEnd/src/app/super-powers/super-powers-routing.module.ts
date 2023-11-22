import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperPowersComponent } from './super-powers.component';
import { SuperPowersFormComponent } from './super-powers-form/super-powers-form.component';


const routes: Routes = [
  {
    path: '',
    component: SuperPowersComponent,
  },
  {
    path: ':id',
    component: SuperPowersFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperPowersRoutingModule { }
