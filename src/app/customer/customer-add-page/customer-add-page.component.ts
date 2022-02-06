import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendError } from 'src/app/core/models/backend-error.model';
import { ErrorCode } from 'src/app/core/models/error-code.enum';
import { SnackBarNotificationService } from 'src/app/core/services/snack-bar-notification.service';
import { CustomerRequestModel } from '../models/customer-request.model';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-add-page',
  templateUrl: './customer-add-page.component.html',
  styleUrls: ['./customer-add-page.component.scss']
})
export class CustomerAddPageComponent implements OnInit {

  validationError: BackendError;

  constructor(
    private router: Router, 
    private customerService: CustomerService,
    private snackBarNotificationService: SnackBarNotificationService) { }

  ngOnInit(): void {
  }

  createCustomer(request: CustomerRequestModel) {
    this.customerService.createCustomer(request).subscribe({
      next: (response: CustomerModel) => {
        this.snackBarNotificationService.showMessage('New user with id: ' + response.customerId + ' created');
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
    this.router.navigate(['/customers']);
  }

}
