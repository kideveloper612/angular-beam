import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  userEmail;
  newPassword;
  confirmNewPassword;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  constructor(
    private jwtAuthSvc: JwtAuthService,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.jwtAuthSvc.getEmailForResetPassword() || !this.jwtAuthSvc.getEmailVerified()) {
      this.router.navigateByUrl('sessions/forgot-password');
    }
  }
  submitEmail() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate'; //determinate
    this.jwtAuthSvc.resetPassword(this.newPassword)
      .subscribe(data => {
        if (data.status == 'success') {
          this.snack.open('Password has been changed successfully!', 'OK', { duration: 4000 });
          this.router.navigateByUrl("sessions/signin");
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
