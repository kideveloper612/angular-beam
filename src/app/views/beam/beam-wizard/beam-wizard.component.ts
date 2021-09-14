import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-beam-wizard',
  templateUrl: './beam-wizard.component.html',
  styleUrls: ['./beam-wizard.component.scss']
})
export class BeamWizardComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['No', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['No', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      thirdCtrl: ['No', Validators.required]
    });
    this.forthFormGroup = this.fb.group({
      forthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this.fb.group({
      fifthCtrl: ['', Validators.required]
    });
    this.sixthFormGroup = this.fb.group({
      sixthCtrl: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

}
