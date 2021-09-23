import { Injectable } from '@angular/core';
import { JwtAuthService } from './auth/jwt-auth.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, delay } from "rxjs/operators";
import { of, BehaviorSubject, throwError, Observable } from "rxjs";
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public purchaseTerm: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  public purchaseTerm$: Observable<Number> = this.purchaseTerm.asObservable();

  public target: BehaviorSubject<String> = new BehaviorSubject<String>('');
  public target$: Observable<String> = this.target.asObservable();

  public comment: BehaviorSubject<String> = new BehaviorSubject<String>('');
  public comment$: Observable<String> = this.comment.asObservable();

  public orderContent: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  public orderContent$: Observable<Object> = this.orderContent.asObservable();

  public optProduct: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  public optProduct$: Observable<Object> = this.optProduct.asObservable();

  public postCode: BehaviorSubject<String> = new BehaviorSubject<String>('');
  public postCode$: Observable<String> = this.postCode.asObservable();

  constructor(
    private http: HttpClient) {
  }

  updatePurchaseTerm(price: any) {
    this.purchaseTerm.next(price);
  }

  updateTarget(item: any) {
    this.target.next(item);
  }

  updateComment(comment: any) {
    this.comment.next(comment);
  }

  updateOrderContent(content: any) {
    this.orderContent.next(content);
  }

  updateOptProduct(content: any) {
    this.optProduct.next(content);
  }

  updatePostCode(code: any) {
    this.postCode.next(code);
  }

  getProduct(data: any) {
    const formdata = new FormData();

    formdata.append('postCode', data.postCode);
    formdata.append("target", data.target);
    formdata.append('Ix', data.Ix);
    formdata.append('Sx', data.Sx);

    return this.http.post(`${environment.apiURL}/getProduct`, formdata).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  orderByCard(data: any) {
    let formdata = new FormData();

    formdata.append('amount', data.amount);
    formdata.append('tokenId', data.tokenId);
    formdata.append('comment', data.comment);
    formdata.append('postCode', data.postCode);
    formdata.append('target', data.target);
    formdata.append('pid', data.pid);
    formdata.append('sid', data.sid);
    formdata.append('orderContent', data.orderContent);

    return fetch(`${environment.apiURL}/orderByCard`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${data.token}`
        },
        body: formdata
      })
      .then((response) => response.json())
      .then((responsJson) => {
        return responsJson;
      })
      .catch((error) => {
        console.log(error);
        return error
      });
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
