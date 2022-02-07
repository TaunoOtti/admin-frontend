import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanAddPageComponent } from './loan-add-page/loan-add-page.component';
import { LoanListPageComponent } from './loan-list-page/loan-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoanListPageComponent,
  },
  {
    path: 'add',
    component: LoanAddPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
