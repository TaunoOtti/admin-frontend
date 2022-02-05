import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../services/api.service";
import { CustomerModel } from "../models/customer.model";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private basePath: string = '/customers'

    constructor(private apiService: ApiService) {
    }

    getCustomers(): Observable<CustomerModel[]> {
        return this.apiService.get<CustomerModel[]>(this.basePath);
    }

    getCustomerById(customerId: number): Observable<CustomerModel> {
        return this.apiService.get<CustomerModel>(this.basePath + '/' + customerId);
    }

    deleteCustomer(customerId: number): Observable<void> {
        return this.apiService.delete<void>(this.basePath + '/' + customerId);
    }

}