import { Injectable } from '@angular/core';
import { JwtAuthService } from './auth/jwt-auth.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, delay } from "rxjs/operators";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private jwtAuthSvc: JwtAuthService,
    private http: HttpClient) {

  }

  getProducts() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getProducts`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  insertProduct(data: any) {
    let form_data = new FormData();
    form_data.append('sodx', data.sodx);
    form_data.append('sody', data.sody);
    form_data.append('sodz', data.sodz);
    form_data.append('mpm', data.mpm);
    form_data.append('dos', data.dos);
    form_data.append('wos', data.wos);
    form_data.append('smoa', data.smoa);
    form_data.append('pma', data.pma);
    return this.http.post(`${environment.apiURL}/insertProduct`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
  updateProduct(id: String, data: any) {
    let form_data = new FormData();
    form_data.append('sodx', data.sodx);
    form_data.append('sody', data.sody);
    form_data.append('sodz', data.sodz);
    form_data.append('mpm', data.mpm);
    form_data.append('dos', data.dos);
    form_data.append('wos', data.wos);
    form_data.append('smoa', data.smoa);
    form_data.append('pma', data.pma);
    return this.http.post(`${environment.apiURL}/updateProduct/${id}`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
  removeProduct(id: String) {
    return this.http.delete(`${environment.apiURL}/removeProduct/${id}`)
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
