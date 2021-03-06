import { Injectable } from '@angular/core';
import { JwtAuthService } from './auth/jwt-auth.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, delay } from "rxjs/operators";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getUsers`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getAllUsers() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getAllUsers`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getRecentCustomers() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getRecentCustomers`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getNumberOfCustomers() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getNumberOfCustomers`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  insertUser(data: any) {
    let form_data = new FormData();
    form_data.append('name', data.name);
    form_data.append('email', data.email);
    form_data.append('phoneNumber', data.phoneNumber);
    form_data.append('role', data.role);
    if (data.verified)
      form_data.append('verified', data.verified);
    form_data.append('pma', data.pma);
    form_data.append('imgFile', data.imgFile)
    return this.http.post(`${environment.apiURL}/insertUser`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  updateUser(id, data: any) {
    let form_data = new FormData();
    form_data.append('name', data.name);
    form_data.append('email', data.email);
    form_data.append('phoneNumber', data.phoneNumber);
    form_data.append('role', data.role);
    if (data.verified)
      form_data.append('verified', data.verified);
    // else
    // form_data.append('verified', null);
    form_data.append('postCode', data.postCode);
    form_data.append('imgFile', data.imgFile);
    return this.http.post(`${environment.apiURL}/updateUser/${id}`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  updateMyProfile(id, data: any) {
    let form_data = new FormData();
    form_data.append('name', data.name);
    form_data.append('phoneNumber', data.phoneNumber);
    form_data.append('imgFile', data.imgFile);
    return this.http.post(`${environment.apiURL}/updateUser/${id}`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  removeUser(id) {
    return this.http.delete(`${environment.apiURL}/removeUser/${id}`)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
}
