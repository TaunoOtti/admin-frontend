import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerAddPageComponent } from './customer-add-page/customer-add-page.component';
import { CustomerListPageComponent } from './customer-list-page/customer-list-page.component';
import { SearchPipe } from './customer-list-page/search.pipe';
import { CustomerModifyPageComponent } from './customer-modify-page/customer-modify-page.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    CustomerListPageComponent,
    CustomerAddPageComponent,
    CustomerModifyPageComponent,
    CustomerFormComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class CustomerModule { }
