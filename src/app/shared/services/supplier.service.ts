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

  getSupplier(id) {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getSupplier/${id}`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  insertSupplier(data: any) {
    let form_data = new FormData();
    form_data.append('name', data.name);
    form_data.append('email', data.email);
    form_data.append('phoneNumber', data.phoneNumber);
    form_data.append('postCode', data.postCode);
    form_data.append('imgFile', data.imgFile);
    form_data.append('products', JSON.stringify(data.products))
    return this.http.post(`${environment.apiURL}/insertSupplier`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  updateSupplier(id, data: any) {
    let form_data = new FormData();
    form_data.append('name', data.name);
    form_data.append('email', data.email);
    form_data.append('phoneNumber', data.phoneNumber);
    form_data.append('postCode', data.postCode);
    form_data.append('products', JSON.stringify(data.products))
    form_data.append('imgFile', data.imgFile);
    return this.http.post(`${environment.apiURL}/updateSupplier/${id}`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  removeSupplier(id) {
    return this.http.delete(`${environment.apiURL}/removeSupplier/${id}`)
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
