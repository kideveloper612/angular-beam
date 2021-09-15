import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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

  firstFormSubOneGroup: FormGroup;
  firstFormSubTwoGroup: FormGroup;

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.firstFormGroup = this.fb.group({});
    this.firstFormSubOneGroup = this.fb.group({
      firstSubOneCtrl: ['', Validators.required]
    });
    this.firstFormSubTwoGroup = this.fb.group({
      firstSubTwoCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({});
    this.thirdFormGroup = this.fb.group({});
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

  nextClick(index: number) {
    console.log(this.firstFormSubOneGroup.value);
    while (index > 0) {
      this.myStepper.next();
      index--;
    }
  }

  // nextClick(stepper: MatStepper) {
  //   stepper.next();

  //   console.log("=============")
  // }

  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.forthFormGroup.value);
    console.log(this.fifthFormGroup.value);
    console.log(this.sixthFormGroup.value);
  }

}
