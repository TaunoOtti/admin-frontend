import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { BackendError } from "../models/backend-error.model";
import { ErrorCode } from "../models/error-code.enum";
import { SnackBarMessageType } from "../models/snack-bar-message-type.enum";
import { SnackBarNotificationService } from "../services/snack-bar-notification.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBarNotificationService: SnackBarNotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const error: BackendError = err.error;
        if (error.code === ErrorCode.VALIDATION_ERROR) {
          // validation errors are handled inside component
        } else if (error.code === ErrorCode.NOT_FOUND) {
          this.snackBarNotificationService.showMessage(error.message, SnackBarMessageType.ERROR);
        } else {
          this.snackBarNotificationService.showMessage("Server error", SnackBarMessageType.ERROR);
        }
        return throwError(() => err);
      })
    );
  }
}
