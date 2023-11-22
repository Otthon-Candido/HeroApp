import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperPowersComponent } from './super-powers.component';
import { SuperPowersRoutingModule } from './super-powers-routing.module';
import { SuperPowerService } from './super-powers.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SuperPowersFormComponent } from './super-powers-form/super-powers-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SuperPowersComponent,
    SuperPowersFormComponent
  ],
  imports: [
    CommonModule,
    SuperPowersRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    SuperPowerService,
  ]
})
export class SuperPowersModule { }
