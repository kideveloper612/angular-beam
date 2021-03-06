import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  constructor(
    private jwtAuthSvc: JwtAuthService,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  submitEmail() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate'; //determinate
    this.jwtAuthSvc.sendVerificationCode(this.userEmail)
      .subscribe(data => {
        if (data.status == 'success') {
          this.snack.open('Verification code has been sent!', 'OK', { duration: 4000 });
          this.router.navigateByUrl("sessions/verification");
        }
        else {
          this.snack.open(data.msg, 'OK', { duration: 4000 })
          this.submitButton.disabled = false;
          this.progressBar.mode = 'determinate'; //determinate
        }
      }, err => {
        this.snack.open('Failed', 'OK', { duration: 4000 })
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate'; //determinate
      })
  }
}
