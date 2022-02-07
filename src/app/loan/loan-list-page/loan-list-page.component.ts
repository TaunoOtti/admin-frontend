import { AfterViewInit, Component, OnInit } from "@angular/core";
import { LoanService } from "../services/loan.service";

@Component({
  selector: "app-loan-list-page",
  templateUrl: "./loan-list-page.component.html",
  styleUrls: ["./loan-list-page.component.scss"],
})
export class LoanListPageComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    "loanId",
    "loanApplicationName",
    "startDate",
    "loanPeriodInMonths",
    "amount",
    "customerId",
    "createdDtime",
    "modifiedDtime",
  ];

  dataSource: any;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe({
      next: (result) => {
        this.dataSource = result;
      },
    });
  }
}
