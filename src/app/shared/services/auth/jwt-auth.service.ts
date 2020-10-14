import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";

// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  user: User;
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "MYONLINEBEAM_USER";


  EMAIL_RESET_PASSWORD = "EMAIL_RESET_PASSWORD";
  email;
  VERIFICATION_CODE = "VERIFICATION_CODE";
  verificationCode;
  EMAIL_VERIFIED = "EMAIL_VERIFIED";
  isEmailVerified: Boolean = false;
  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  public signin(email, password) {
    this.signingIn = true;
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    return this.http.post(`${environment.apiURL}/login`, data)
      .pipe(
        map((res: any) => {
          this.setUserAndToken(res.data.token, res.data, !!res);
          this.signingIn = false;
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    let data = new FormData();
    let token = this.getJwtToken();
    data.append('token', token);
    return this.http.post(`${environment.apiURL}/validateToken`, data)
      .pipe(
        map((res: any) => {
          this.setUserAndToken(res.data.token, res.data, !!res);
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  public signout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("sessions/signin");
  }

  public sendVerificationCode(email) {
    this.setEmailForResetPassword(email);
    let data = new FormData();
    data.append('email', email);
    this.setVerificationCode(this.generateVerificationCode());
    data.append('verificationCode', this.verificationCode);
    return this.http.post(`${environment.apiURL}/sendCode`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  public resetPassword(newPassword) {
    let data = new FormData();
    data.append('email', this.getEmailForResetPassword());
    data.append('password', newPassword);
    return this.http.post(`${environment.apiURL}/resetPassword`, data)
      .pipe(
        map((res: any) => {
          if (res.status == 'success') {
            this.setEmailForResetPassword(null);
            this.setEmailVerified(false);
            this.setVerificationCode(null);
          }
          return res;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
  setEmailForResetPassword(email) {
    this.email = email;
    this.ls.setItem(this.EMAIL_RESET_PASSWORD, email);
  }
  setEmailVerified(flag: Boolean) {
    this.isEmailVerified = flag;
    this.ls.setItem(this.EMAIL_VERIFIED, flag);
  }
  setVerificationCode(code) {
    this.verificationCode = code;
    this.ls.setItem(this.VERIFICATION_CODE, code);
  }
  getVerificationCode() {
    return this.ls.getItem(this.VERIFICATION_CODE);
  }

  getEmailForResetPassword() {
    return this.ls.getItem(this.EMAIL_RESET_PASSWORD);
  }

  getEmailVerified() {
    return !!this.ls.getItem(this.EMAIL_VERIFIED);
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }

  generateVerificationCode() {
    let x = Math.floor((Math.random() * 100000));
    let str = "00000" + x.toString();
    let verificationCode = str.substring(str.length - 5, str.length);
    return verificationCode;
  }
}
