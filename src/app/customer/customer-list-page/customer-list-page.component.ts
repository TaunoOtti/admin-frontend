import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss']
})
export class CustomerListPageComponent implements OnInit, AfterViewInit {
  displayedColumns = ['customerId', 'firstName', 'lastName', 'email', 'phoneNo', 'dateOfBirth', 'address', 'createdDtime', 'modifiedDtime', 'actions' ];

  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerService: CustomerService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Element, filter: string) => {
          const searchDataSource = data['firstName']+data['lastName']+data['email']
          return searchDataSource.trim().toLowerCase().indexOf(filter) != -1;
        }
      }
    })
  }

  search(inputEvent: any) {
    const searchValue = inputEvent.target.value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  deleteCustomer(customerId: number) {
    this.dialog.open(ConfirmDialogComponent, { 
      data: {
        message: 'Delete customer with id: ' + customerId + '?'
      }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.customerService.deleteCustomer(customerId).subscribe({
          next: () => {
            this.showSuccessDeleteSnackBar(customerId);
            this.loadCustomers();
          }
        })
      }
    })
  }

  showSuccessDeleteSnackBar(customerId: number) {
    this.snackBar.open('Customer with id: ' + customerId + ' deleted successfully', 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      // panelClass: ['success-snack'] TODO custom success snack
    });
  }
}
