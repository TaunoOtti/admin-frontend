import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError, timeout, TimeoutError } from "rxjs";
import { SnackBarMessageType } from "../models/snack-bar-message-type.enum";
import { SnackBarNotificationService } from "../services/snack-bar-notification.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private snackBarNotificationService: SnackBarNotificationService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    });

    return next.handle(request).pipe(
      timeout(10_000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          this.snackBarNotificationService.showMessage(err.message, SnackBarMessageType.ERROR);
        }
        return throwError(() => err);
      })
    );
  }
}
