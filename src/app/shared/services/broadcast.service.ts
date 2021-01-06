import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  constructor(private http: HttpClient) { }

  getAllBroadcasts() {
    let data = new FormData();
    return this.http.post(`${environment.apiURL}/getAllBroadcasts`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  broadcast(msg: any) {
    const formdata = new FormData();
    if (msg._id)
      formdata.append('_id', msg._id);
    formdata.append('toList', JSON.stringify(msg.toList));
    formdata.append('subject', msg.subject);
    formdata.append('body', msg.body);
    return this.http.post(`${environment.apiURL}/broadcast`, formdata)
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
