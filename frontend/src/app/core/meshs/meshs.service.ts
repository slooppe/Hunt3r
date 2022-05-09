import { Injectable,Inject  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeshData,CreateMesh,MeshResponse } from './meshs';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {baseUrl } from "../../../environments/environment";
import {  NbAuthService, NbAuthToken, NB_AUTH_OPTIONS } from '@nebular/auth';
@Injectable({
  providedIn: 'root',
})
export class MeshsService  {
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

  getMeshs(): Observable<MeshData> {

    return this.http
      .get<MeshData>(
        this.baseurl + '/admin/meshs',
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  createMeshs(data:CreateMesh): Observable<MeshData> {

    return this.http
      .post<MeshData>(
        this.baseurl + '/admin/meshs',
        data,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  updateMeshs(data:CreateMesh): Observable<MeshResponse> {

    return this.http
      .patch<MeshResponse>(
        this.baseurl + '/admin/meshs',
        data,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  deleteMeshs(id:number): Observable<MeshResponse> {

    return this.http
      .delete<MeshResponse>(
        this.baseurl + '/admin/meshs/'+id,
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
      errorMessage = {"status" : error.status, "error":error.error.errors,'message':error.error.message};
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}