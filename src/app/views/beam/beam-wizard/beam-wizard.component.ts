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
  secondFormSubOneGroup: FormGroup;
  secondFormSubTwoGroup: FormGroup;
  thirdFormSubGroup: FormGroup;

  floorFlag: Boolean = false;
  roofFlag: Boolean = false;
  wallFlag: Boolean = false;
  onlyDesign: Boolean = false;

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.firstFormGroup = this.fb.group({});
    this.firstFormSubOneGroup = this.fb.group({
      firstSubOneCtrl: []
    });
    this.firstFormSubTwoGroup = this.fb.group({
      firstSubSideOneCtrl: [],
      firstSubSideTwoCtrl: []
    });
    this.secondFormGroup = this.fb.group({});
    this.secondFormSubOneGroup = this.fb.group({
      secondSubOneCtrl: []
    });
    this.secondFormSubTwoGroup = this.fb.group({
      secondSubSideOneCtrl: [],
      secondSubSideTwoCtrl: []
    });
    this.thirdFormGroup = this.fb.group({});
    this.thirdFormSubGroup = this.fb.group({
      thirdSubOneCtrl: [],
      thirdSubTwoCtrl: []
    });
    this.forthFormGroup = this.fb.group({
      forthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this.fb.group({
      fifthCtrl: []
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

      case 3:
        if (this.onlyDesign) this.backAction(index);
        else this.backAction(1)
        break;

      default:
        break;
    }
  }

  goForward(step: number = 0, index: number = 1) {
    switch (step) {
      case 0:
        if (index === 1) {
          this.floorFlag = false;

          if (this.firstFormSubTwoGroup.get('firstSubSideOneCtrl').value === null)
            this.firstFormSubTwoGroup.controls['firstSubSideOneCtrl'].setValidators([Validators.required]);

          this.firstFormSubTwoGroup.controls['firstSubSideOneCtrl'].updateValueAndValidity();

          if (this.firstFormSubTwoGroup.get('firstSubSideTwoCtrl').value === null)
            this.firstFormSubTwoGroup.controls['firstSubSideTwoCtrl'].setValidators([Validators.required]);

          this.firstFormSubTwoGroup.controls['firstSubSideTwoCtrl'].updateValueAndValidity();
        }
        else {
          this.floorFlag = true;

          this.firstFormSubTwoGroup.get['firstSubSideOneCtrl']?.clearValidators();
          this.firstFormSubTwoGroup.get['firstSubSideOneCtrl']?.updateValueAndValidity();

          this.firstFormSubTwoGroup.get['firstSubSideTwoCtrl']?.clearValidators();
          this.firstFormSubTwoGroup.get['firstSubSideTwoCtrl']?.updateValueAndValidity();
        }
        break;

      case 1:
        if (index === 1) {
          this.roofFlag = false;

          if (this.secondFormSubTwoGroup.get('secondSubSideOneCtrl').value === null)
            this.secondFormSubTwoGroup.controls['secondSubSideOneCtrl'].setValidators([Validators.required]);

          this.secondFormSubTwoGroup.controls['secondSubSideOneCtrl'].updateValueAndValidity();

          if (this.secondFormSubTwoGroup.get('secondSubSideTwoCtrl').value === null)
            this.secondFormSubTwoGroup.controls['secondSubSideTwoCtrl'].setValidators([Validators.required]);

          this.secondFormSubTwoGroup.controls['secondSubSideTwoCtrl'].updateValueAndValidity();
        }
        else {
          this.roofFlag = true;

          this.firstFormSubTwoGroup.get['secondSubSideOneCtrl']?.clearValidators();
          this.firstFormSubTwoGroup.get['secondSubSideOneCtrl']?.updateValueAndValidity();

          this.firstFormSubTwoGroup.get['secondSubSideTwoCtrl']?.clearValidators();
          this.firstFormSubTwoGroup.get['secondSubSideTwoCtrl']?.updateValueAndValidity();
        }
        break;

      case 2:
        if (index === 1) {
          this.wallFlag = false;

          if (this.thirdFormSubGroup.get('thirdSubOneCtrl').value === null)
            this.thirdFormSubGroup.controls['thirdSubOneCtrl'].setValidators([Validators.required]);

          this.thirdFormSubGroup.controls['thirdSubOneCtrl'].updateValueAndValidity();

          if (this.thirdFormSubGroup.get('thirdSubTwoCtrl').value === null)
            this.thirdFormSubGroup.controls['thirdSubTwoCtrl'].setValidators([Validators.required]);

          this.thirdFormSubGroup.controls['thirdSubTwoCtrl'].updateValueAndValidity();
        }
        else {
          this.wallFlag = true;

          this.firstFormSubTwoGroup.get['thirdSubOneCtrl']?.clearValidators();
          this.firstFormSubTwoGroup.get['thirdSubOneCtrl']?.updateValueAndValidity();

          this.firstFormSubTwoGroup.get['thirdSubTwoCtrl']?.clearValidators();
          this.firstFormSubTwoGroup.get['thirdSubTwoCtrl']?.updateValueAndValidity();
        }
        break;

      case 3:
        if (index === 1) {
          this.onlyDesign = false;

          if (this.fifthFormGroup.get('fifthCtrl').value === null)
            this.fifthFormGroup.controls['fifthCtrl'].setValidators([Validators.required]);

          this.fifthFormGroup.controls['fifthCtrl'].updateValueAndValidity();
        }
        else {
          this.onlyDesign = true;

          this.firstFormSubTwoGroup.get['fifthCtrl']?.clearValidators();
          this.firstFormSubTwoGroup.get['fifthCtrl']?.updateValueAndValidity();
        }
        break;

      case 4:
        console.log(step, index);
        break

      default:
        break;
    }

    this.forwardAction(index);
  }

  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.forthFormGroup.value);
    console.log(this.fifthFormGroup.value);
    console.log(this.sixthFormGroup.value);
    console.log(this.firstFormSubOneGroup.value);
    console.log(this.firstFormSubTwoGroup.value);
    console.log(this.secondFormSubOneGroup.value);
    console.log(this.secondFormSubTwoGroup.value);
    console.log(this.thirdFormSubGroup.value);
  }
}
