import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarMessageType } from "../models/snack-bar-message-type.enum";

@Injectable({
  providedIn: "root",
})
export class SnackBarNotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showMessage(message: string, type?: SnackBarMessageType) {
    const snackClass = type && type == SnackBarMessageType.ERROR ? 'error-snack' : 'success-snack';

    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: [snackClass]
    });
  }
}
