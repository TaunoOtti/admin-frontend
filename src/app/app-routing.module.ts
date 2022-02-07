import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customer/customer.module').then(c => c.CustomerModule)
  },
  {
    path: 'loans',
    loadChildren: () => import('./loan/loan.module').then(c => c.LoanModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
