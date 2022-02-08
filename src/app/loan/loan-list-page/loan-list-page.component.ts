import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/core/components/confirm-dialog/confirm-dialog.component";
import { BackendError } from "src/app/core/models/backend-error.model";
import { SnackBarMessageType } from "src/app/core/models/snack-bar-message-type.enum";
import { SnackBarNotificationService } from "src/app/core/services/snack-bar-notification.service";
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
    "actions",
  ];

  dataSource: any;

  constructor(
    private loanService: LoanService,
    private dialog: MatDialog,
    private snackBarNotificationService: SnackBarNotificationService
  ) {}

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

  deleteLoan(loanId: number, customerId: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: "Delete loan with id:" + loanId + "?",
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.loanService.deleteLoan(customerId, loanId).subscribe({
            next: () => {
              this.snackBarNotificationService.showMessage("Loan with id: " + loanId + " deleted successfully");
              this.loadLoans();
            },
            error: (error: BackendError) => {
              this.snackBarNotificationService.showMessage(error.message, SnackBarMessageType.ERROR);
            },
          });
        }
      });
  }
}
