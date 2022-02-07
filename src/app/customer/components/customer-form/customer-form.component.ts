import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BackendError } from "src/app/core/models/backend-error.model";
import { CustomerRequestModel } from "../../models/customer-request.model";
import { CustomerModel } from "../../models/customer.model";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"],
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  errorMessages: string[] = [];
  maxDate = new Date();

  @Input() submitButtonText: string = "Submit";
  @Input() set customer(customerData: CustomerModel) {
    if (customerData) {
      this.customerForm.patchValue(customerData);
    }
  }
  @Input() set validationError(validationError: BackendError) {
    this.errorMessages = [];
    if (validationError) {
      if (validationError.message) {
        this.errorMessages.push(validationError.message);
      }
      if (validationError.fields && validationError.fields.length > 0) {
        validationError.fields.forEach((field) => {
          this.errorMessages.push(field.message);
          this.customerForm.get(field.name)?.setErrors({ invalid: true });
        });
      }
    }
  }

  @Output() submitClicked = new EventEmitter<CustomerRequestModel>();
  @Output() backClicked = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(255)]],
      lastName: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email]],
      dateOfBirth: [null, Validators.required],
      phoneNo: [null, [Validators.required, Validators.maxLength(50)]],
      address: [null, [Validators.required, Validators.maxLength(255)]],
    });
  }

  submitClick() {
    this.customerForm.markAllAsTouched();
    this.customerForm.updateValueAndValidity();
    if (this.customerForm.valid) {
      const customer: CustomerRequestModel = this.customerForm.getRawValue();
      this.submitClicked.emit(customer);
    }
  }
}
