import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(environment.apiUrl + path).pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: object = {}): Observable<T> {
    return this.http.post<T>(environment.apiUrl + path, JSON.stringify(body)).pipe(catchError(this.handleError));
  }

  put<T>(path: string, body: object = {}): Observable<T> {
    return this.http.put<T>(environment.apiUrl + path, JSON.stringify(body)).pipe(catchError(this.handleError));
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(environment.apiUrl + path).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => error.error);
  }
}
