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

  floorFlag: Boolean = false;
  roofFlag: Boolean = false;
  wallFlag: Boolean = false;

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.firstFormGroup = this.fb.group({});
    this.firstFormSubOneGroup = this.fb.group({
      firstSubOneCtrl: ['', Validators.required]
    });
    this.firstFormSubTwoGroup = this.fb.group({
      firstSubSideOneCtrl: ['', Validators.required],
      firstSubSideTwoCtrl: ['', Validators.required]
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

  backAction(step: number = 1) {
    while (step > 0) {
      this.myStepper.previous();
      step--;
    }
  }

  forwardAction(step: number = 1) {
    while (step > 0) {
      this.myStepper.next();
      step--;
    }
  }

  goBack(step: number = 0, index: number = 1) {
    console.log(step, index, this.floorFlag)
    switch (step) {
      case 0:
        if (this.floorFlag) this.backAction(index);
        else this.backAction(1)
        break;

      case 1:
        if (this.roofFlag) this.backAction(index);
        else this.backAction(1)
        break;

      case 2:
        if (this.wallFlag) this.backAction(index);
        else this.backAction(1)
        break;

      default:
        break;
    }
  }

  goForward(step: number = 0, index: number = 1) {
    switch (step) {
      case 0:
        if (index === 1) this.floorFlag = false;
        else this.floorFlag = true;
        break;

      case 1:
        if (index === 1) this.roofFlag = false;
        else this.roofFlag = true;
        break;

      case 2:
        if (index === 1) this.wallFlag = false;
        else this.wallFlag = true;
        break;

      default:
        break;
    }

    this.forwardAction(index);
  }

  floorSkip(index: number) {
    this.floorFlag = true;

    while (index > 0) {
      this.myStepper.next();
      index--;
    }
  }

  roofSkip(index: number) {
    this.roofFlag = true;

    while (index > 0) {
      this.myStepper.next();
      index--;
    }
  }

  wallSkip(index: number) {
    this.wallFlag = true;

    while (index > 0) {
      this.myStepper.next();
      index--;
    }
  }

  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.forthFormGroup.value);
    console.log(this.fifthFormGroup.value);
    console.log(this.sixthFormGroup.value);
  }

}
