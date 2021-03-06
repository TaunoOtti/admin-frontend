import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmDialogComponent } from "src/app/core/components/confirm-dialog/confirm-dialog.component";
import { BackendError } from "src/app/core/models/backend-error.model";
import { SnackBarMessageType } from "src/app/core/models/snack-bar-message-type.enum";
import { SnackBarNotificationService } from "src/app/core/services/snack-bar-notification.service";
import { CustomerDetailsComponent } from "../components/customer-details/customer-details.component";
import { Details } from "../models/customer-detail.model";
import { CustomerModel } from "../models/customer.model";
import { CustomerService } from "../services/customer.service";

@Component({
  selector: "app-customer-list-page",
  templateUrl: "./customer-list-page.component.html",
  styleUrls: ["./customer-list-page.component.scss"],
})
export class CustomerListPageComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    "customerId",
    "firstName",
    "lastName",
    "email",
    "phoneNo",
    "dateOfBirth",
    "address",
    "createdDtime",
    "modifiedDtime",
    "actions",
  ];

  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBarNotificationService: SnackBarNotificationService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Element, filter: string) => {
          const searchDataSource = data["customerId"] + data["firstName"] + data["lastName"] + data["email"];
          return searchDataSource.trim().toLowerCase().indexOf(filter) != -1;
        };
      },
    });
  }

  search(inputEvent: any) {
    const searchValue = inputEvent.target.value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  deleteCustomer(customerId: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: "Delete customer with id: " + customerId + "?",
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.customerService.deleteCustomer(customerId).subscribe({
            next: () => {
              this.snackBarNotificationService.showMessage("Customer with id: " + customerId + " deleted successfully");
              this.loadCustomers();
            }, 
            error: (error: BackendError) => {
              this.snackBarNotificationService.showMessage(error.message, SnackBarMessageType.ERROR);
            },
          });
        }
      });
  }

  navigateToDetails(customer: CustomerModel) {
    this.dialog.open(CustomerDetailsComponent, {
      data: {
        customerDetails: this.mapToDetailsData(customer),
      },
    });
  }

  mapToDetailsData(customer: CustomerModel) {
    return [
      new Details('Customer id', customer.customerId.toString()),
      new Details('First name', customer.firstName),
      new Details('Last name', customer.lastName),
      new Details('Email', customer.email),
      new Details('Phone no', customer.phoneNo),
      new Details('Date of Birth', customer.dateOfBirth),
      new Details('Address', customer.address),
      new Details('Created Dtime', customer.createdDtime),
      new Details('Modified Dtime', customer.modifiedDtime)
    ];
  }
}
