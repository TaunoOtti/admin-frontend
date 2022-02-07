import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { LoanListPageComponent } from './loan-list-page/loan-list-page.component';
import { LoanAddPageComponent } from './loan-add-page/loan-add-page.component';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    LoanListPageComponent,
    LoanAddPageComponent
  ],
  imports: [
    CommonModule,
    LoanRoutingModule,
    CoreModule,
    MaterialModule,
  ]
})
export class LoanModule { }
