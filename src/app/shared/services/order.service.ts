import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getOrders`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getOrder(id) {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getOrder/${id}`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  insertOrder(data: any) {
    let form_data = new FormData();
    let orderContent: any = {
      supportFloor: data.supportFloor,
      floorType: data.floorType,
      floorSpanSide1: data.floorSpanSide1,
      floorSpanSide2: data.floorSpanSide2,
      supportRoof: data.supportRoof,
      roofType: data.roofType,
      roofSpanSide1: data.roofSpanSide1,
      roofSpanSide2: data.roofSpanSide2,
      supportWall: data.supportWall,
      thickness: data.thickness,
      height: data.height,
      openingSpan: data.openingSpan
    }
    form_data.append('postCode', data.postCode);
    form_data.append('cid', data.cid);
    form_data.append('sid', data.sid);
    form_data.append('pid', data.pid);
    form_data.append('amount', data.amount);
    form_data.append('tid', data.tid);
    form_data.append('pby', data.pby);
    form_data.append('status', data.status);
    form_data.append('orderContent', JSON.stringify(orderContent))
    return this.http.post(`${environment.apiURL}/insertOrder`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  updateOrder(id, data: any) {
    let form_data = new FormData();
    let orderContent: any = {
      supportFloor: data.supportFloor,
      floorType: data.floorType,
      floorSpanSide1: data.floorSpanSide1,
      floorSpanSide2: data.floorSpanSide2,
      supportRoof: data.supportRoof,
      roofType: data.roofType,
      roofSpanSide1: data.roofSpanSide1,
      roofSpanSide2: data.roofSpanSide2,
      supportWall: data.supportWall,
      thickness: data.thickness,
      height: data.height,
      openingSpan: data.openingSpan
    }
    form_data.append('postCode', data.postCode);
    form_data.append('cid', data.cid);
    form_data.append('sid', data.sid);
    form_data.append('pid', data.pid);
    form_data.append('amount', data.amount);
    form_data.append('tid', data.tid);
    form_data.append('pby', data.pby);
    form_data.append('status', data.status);
    form_data.append('orderContent', JSON.stringify(orderContent))
    return this.http.post(`${environment.apiURL}/updateOrder/${id}`, form_data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  removeOrder(id) {
    return this.http.delete(`${environment.apiURL}/removeOrder/${id}`)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }



  getNumberOfOrders() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getNumberOfOrders`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getTotalAmount() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getTotalAmount`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );

  }
  getRecentOrders() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getRecentOrders`, data)
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
