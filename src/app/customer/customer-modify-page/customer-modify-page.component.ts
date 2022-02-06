import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BackendError } from "src/app/core/models/backend-error.model";
import { ErrorCode } from "src/app/core/models/error-code.enum";
import { SnackBarMessageType } from "src/app/core/models/snack-bar-message-type.enum";
import { SnackBarNotificationService } from "src/app/core/services/snack-bar-notification.service";
import { CustomerRequestModel } from "../models/customer-request.model";
import { CustomerModel } from "../models/customer.model";
import { CustomerService } from "../services/customer.service";

@Component({
  selector: "app-customer-modify-page",
  templateUrl: "./customer-modify-page.component.html",
  styleUrls: ["./customer-modify-page.component.scss"],
})
export class CustomerModifyPageComponent implements OnInit {
  customer: CustomerModel;
  validationError: BackendError;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBarNotificationService: SnackBarNotificationService
  ) {}

  ngOnInit(): void {
    this.getCustomerData();
  }

  getCustomerData(): void {
    const customerId = Number(this.route.snapshot.paramMap.get("id"));
    if (customerId) {
      this.customerService.getCustomerById(customerId).subscribe({
        next: (response: CustomerModel) => {
          this.customer = response;
        },
        error: (error: BackendError) => {
          this.snackBarNotificationService.showMessage(error.message, SnackBarMessageType.ERROR);
        },
      });
    }
  }

  modifyCustomer(request: CustomerRequestModel) {
    this.customerService.modifyCustomer(request, this.customer.customerId).subscribe({
      next: (response: CustomerModel) => {
        this.snackBarNotificationService.showMessage('Customer data saved');
        this.navigateToList();
      },
      error: (error) => {
        this.handleError(error);
      }
    })
  }

  handleError(backendError: BackendError) {
    if (backendError.code === ErrorCode.VALIDATION_ERROR) {
      this.validationError = backendError;
    }
  }

  navigateToList() {
    this.router.navigate(["/customers"]);
  }
}
