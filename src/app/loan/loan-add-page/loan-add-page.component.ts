import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BackendError } from "src/app/core/models/backend-error.model";
import { ErrorCode } from "src/app/core/models/error-code.enum";
import { SnackBarNotificationService } from "src/app/core/services/snack-bar-notification.service";
import { LoanRequest } from "../models/loan-request.model";
import { Loan } from "../models/loan.model";
import { LoanService } from "../services/loan.service";

@Component({
  selector: "app-loan-add-page",
  templateUrl: "./loan-add-page.component.html",
  styleUrls: ["./loan-add-page.component.scss"],
})
export class LoanAddPageComponent implements OnInit {
  minDate = new Date();
  loanForm: FormGroup;
  errorMessages: string[];

  constructor(
    private router: Router,
    private loanService: LoanService,
    private snackBarNotificationService: SnackBarNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanApplicationName: [null, [Validators.required, Validators.maxLength(255)]],
      startDate: [null, [Validators.required]],
      loanPeriodInMonths: [null, [Validators.required]],
      amount: [null, Validators.required],
      customerId: [null, [Validators.required]],
    });
  }

  handleError(backendError: BackendError) {
    if (backendError.code === ErrorCode.VALIDATION_ERROR) {
      this.errorMessages = [];
      if (backendError) {
        if (backendError.message) {
          this.errorMessages.push(backendError.message);
        }
        if (backendError.fields && backendError.fields.length > 0) {
          backendError.fields.forEach((field) => {
            this.errorMessages.push(field.message);
            this.loanForm.get(field.name)?.setErrors({ invalid: true });
          });
        }
      }
    }
  }

  navigateToList() {
    this.router.navigate(["/loans"]);
  }

  submitClicked() {
    this.loanForm.markAllAsTouched();
    this.loanForm.updateValueAndValidity();
    if (this.loanForm.valid) {
      const loanRequest: LoanRequest = this.loanForm.getRawValue();
      this.loanService.createLoan(loanRequest, loanRequest.customerId).subscribe({
        next: (response: Loan) => {
          this.snackBarNotificationService.showMessage("New loan with id: " + response.loanId + " created");
          this.navigateToList();
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    }
  }

  backClicked() {
    this.navigateToList();
  }
}
