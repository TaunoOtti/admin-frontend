import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../core/services/api.service";
import { LoanRequest } from "../models/loan-request.model";
import { Loan } from "../models/loan.model";

@Injectable({
  providedIn: "root",
})
export class LoanService {
  constructor(private apiService: ApiService) {}

  getLoans(): Observable<Loan[]> {
    return this.apiService.get<Loan[]>("/loans");
  }

  getCustomerLoans(customerId: number): Observable<Loan[]> {
    return this.apiService.get<Loan[]>("/customers/" + customerId + "/loans");
  }

  createLoan(request: LoanRequest, customerId: number): Observable<Loan> {
    return this.apiService.post<Loan>("/customers/" + customerId + "/loans", request);
  }

  deleteLoan(customerId: number, loanId: number): Observable<void> {
    return this.apiService.delete<void>("/customers/" + customerId + "/loans/" + loanId);
  }
}
