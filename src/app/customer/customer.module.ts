import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerAddPageComponent } from './customer-add-page/customer-add-page.component';
import { CustomerListPageComponent } from './customer-list-page/customer-list-page.component';
import { CustomerModifyPageComponent } from './customer-modify-page/customer-modify-page.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';

@NgModule({
  declarations: [
    CustomerListPageComponent,
    CustomerAddPageComponent,
    CustomerModifyPageComponent,
    CustomerFormComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    CustomerRoutingModule,
    MaterialModule
  ]
})
export class CustomerModule { }
