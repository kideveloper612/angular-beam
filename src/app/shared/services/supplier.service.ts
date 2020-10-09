import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSuppliers() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getSuppliers`, data)
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
