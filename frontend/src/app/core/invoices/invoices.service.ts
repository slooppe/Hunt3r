import { Injectable,Inject  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InvoiceSettingsData,InvoiceDataUpdate,InvoiceData } from './invoices';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {baseUrl } from "../../../environments/environment";
import {  NbAuthService, NbAuthToken, NB_AUTH_OPTIONS } from '@nebular/auth';
@Injectable({
  providedIn: 'root',
})
export class InvoicesService  {
  // Base url
  baseurl = baseUrl;
  token: any;


  constructor(private http: HttpClient, authService: NbAuthService,@Inject(NB_AUTH_OPTIONS) protected options = {})  {
    authService.onTokenChange()
    .subscribe((token: NbAuthToken) => {
      this.token = null;
      if (token && token.isValid()) {
        this.token = token;
      }
    });
  }


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // POST
  getInvoiceSettings(): Observable<InvoiceSettingsData> {

    return this.http
      .get<InvoiceSettingsData>(
        this.baseurl + '/admin/platforms/intigriti/invoice',
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  postInvoiceSettings(settings:InvoiceDataUpdate): Observable<InvoiceSettingsData> {

    return this.http
      .post<InvoiceSettingsData>(
        this.baseurl + '/admin/platforms/intigriti/invoice',
        settings,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  getInvoice(from:any,to:any,invoice_id:any): Observable<InvoiceData> {

    return this.http
      .get<InvoiceData>(
        this.baseurl + '/admin/platforms/intigriti/invoice/generate?from='+from+'&to='+to+'&invoice_id='+invoice_id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
 


  
  errorHandl(error : any) {
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = {"status" : "", "error":"",'message':error.message};
    } else {
      // Get server-side error
      console.log(error)
      errorMessage = {"status" : error.status, "error":error.error.errors,'message':error.error.message};
    }
    console.log(errorMessage);
    return throwError(() => { 
      return errorMessage;
    });
  }
}