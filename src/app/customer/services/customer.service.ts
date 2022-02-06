import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../core/services/api.service";
import { CustomerRequestModel } from "../models/customer-request.model";
import { CustomerModel } from "../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private basePath: string = "/customers";

  constructor(private apiService: ApiService) {}

  getCustomers(): Observable<CustomerModel[]> {
    return this.apiService.get<CustomerModel[]>(this.basePath);
  }

  getCustomerById(customerId: number): Observable<CustomerModel> {
    return this.apiService.get<CustomerModel>(this.basePath + "/" + customerId);
  }

  createCustomer(request: CustomerRequestModel): Observable<CustomerModel> {
    return this.apiService.post<CustomerModel>(this.basePath, request);
  }

  modifyCustomer(request: CustomerRequestModel, customerId: number): Observable<CustomerModel> {
    return this.apiService.put<CustomerModel>(this.basePath + "/" + customerId, request);
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.apiService.delete<void>(this.basePath + "/" + customerId);
  }
}
