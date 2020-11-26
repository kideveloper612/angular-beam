import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from 'ngx-custom-validators';

import { Component, OnInit } from "@angular/core";
import { marcoAnimations } from "app/shared/animations/marco-animations";

@Component({
  selector: "app-signup3",
  templateUrl: "./signup3.component.html",
  styleUrls: ["./signup3.component.scss"],
  animations: marcoAnimations
})
export class Signup3Component implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    this.signupForm = this.fb.group(
      {
        firstName: ["",Validators.required],
        company: ["",Validators.required],
        username: ["",Validators.required],
        email: ["",[Validators.required,Validators.email]],
        password: password,
        confirmPassword: confirmPassword,
        agreed: [false,Validators.required]
      }
    );
  }
  onSubmit() {
    if (this.signupForm.valid) {
      // do what you want to do with your data
      // console.log(this.signupForm.value);
    }
  }
  }



