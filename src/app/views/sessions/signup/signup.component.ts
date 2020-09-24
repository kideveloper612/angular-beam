import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CustomValidators } from 'ngx-custom-validators';
import { ErrorStateMatcher } from '@angular/material/core';
import { Validators, FormGroup, NgForm, FormGroupDirective, FormControl, AbstractControl, ValidationErrors } from "@angular/forms";
import { FormBuilder } from "@angular/forms";



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = this.fb.group(
      {
        firstName: ["",Validators.required],
        email: ["",[Validators.required,Validators.email]],
        password: password,
        confirmPassword: confirmPassword,
        agreed: [false,Validators.required]
      }
    );
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.signupForm.value);
    }
  }
}
