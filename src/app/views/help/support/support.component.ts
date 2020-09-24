import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  supportForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.supportForm = this.fb.group(
      {
        email: ["",[Validators.required,Validators.email]],
        password: password,
        agreed: [false,Validators.required]
      }
    );
  }

  onSubmit() {
    if (!this.supportForm.invalid) {
      // do what you wnat with your data
      console.log(this.supportForm.value);
    }
  }
}
