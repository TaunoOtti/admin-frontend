import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";
import { MaterialModule } from "../material/material.module";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { MessageComponent } from "./components/message/message.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HttpErrorInterceptor } from "./interceptors/http.error.interceptor";
import { HttpRequestInterceptor } from "./interceptors/http.interceptor";
import { ApiService } from "./services/api.service";
import { SnackBarNotificationService } from "./services/snack-bar-notification.service";

@NgModule({
  declarations: [NavigationComponent, ConfirmDialogComponent, MessageComponent],
  imports: [RouterModule, CommonModule, HttpClientModule, MaterialModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ApiService,
    SnackBarNotificationService,
  ],
  exports: [MessageComponent, ConfirmDialogComponent, NavigationComponent],
})
export class CoreModule {}
