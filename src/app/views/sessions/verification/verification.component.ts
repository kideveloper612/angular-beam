import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  userEmail;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  @ViewChild('resendBtn') resendButton: MatButton;
  constructor(
    public jwtAuthSvc: JwtAuthService,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  submitEmail() {
    let verificationCode = this.jwtAuthSvc.getVerificationCode();
    if (verificationCode == this.userEmail) {
      this.jwtAuthSvc.setEmailVerified(true);
      this.router.navigateByUrl("sessions/reset-password");
    } else {
      this.jwtAuthSvc.setEmailVerified(false);
      this.snack.open('Verification code is invalid!', 'OK', { duration: 4000 });
    }
  }
  resendCode() {
    let email = this.jwtAuthSvc.getEmailForResetPassword();
    // this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate'; //determinate
    this.jwtAuthSvc.sendVerificationCode(email)
      .subscribe(data => {
        if (data.status == 'success') {
          this.snack.open('Verification code has been resent!', 'OK', { duration: 4000 });
          // this.submitButton.disabled = false;
          // this.router.navigateByUrl("sessions/verification");
        }
        else {
          this.snack.open(data.msg, 'OK', { duration: 4000 })
        }
        this.progressBar.mode = 'determinate'; //determinate
      }, err => {
        this.snack.open('Failed', 'OK', { duration: 4000 })
        // this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate'; //determinate
      })
  }
}
