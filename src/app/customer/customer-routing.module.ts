import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAddPageComponent } from './customer-add-page/customer-add-page.component';
import { CustomerListPageComponent } from './customer-list-page/customer-list-page.component';
import { CustomerModifyPageComponent } from './customer-modify-page/customer-modify-page.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListPageComponent,
  },
  {
    path: 'add',
    component: CustomerAddPageComponent
  },
  {
    path: ':id',
    component: CustomerModifyPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
