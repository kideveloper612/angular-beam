import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ProductsService } from 'app/shared/services/products.service';


@Component({
  selector: 'app-beam-wizard',
  templateUrl: './beam-wizard.component.html',
  styleUrls: ['./beam-wizard.component.scss']
})
export class BeamWizardComponent implements OnInit {

  floorSupportFormGroup: FormGroup;
  roofSupportFormGroup: FormGroup;
  wallSupportFormGroup: FormGroup;
  wallSupportSpanFormGroup: FormGroup;
  postcodeFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  floorSupportTypeFormGroup: FormGroup;
  floorSupportSpanFormGroup: FormGroup;
  roofSupportTypeFormGroup: FormGroup;
  roofSupportSpanFormGroup: FormGroup;
  wallSupportDimsFormGroup: FormGroup;

  supportFloor: Boolean = false;
  supportRoof: Boolean = false;
  supportWall: Boolean = false;
  onlyDesign: Boolean = false;

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private productSvc: ProductsService
  ) { }


  ngOnInit() {
    this.floorSupportFormGroup = this.fb.group({});
    this.floorSupportTypeFormGroup = this.fb.group({
      floorTypeCtrl: []
    });
    this.floorSupportSpanFormGroup = this.fb.group({
      floorSpanSideOneCtrl: [],
      floorSpanSideTwoCtrl: []
    });
    this.roofSupportFormGroup = this.fb.group({});
    this.roofSupportTypeFormGroup = this.fb.group({
      roofTypeCtrl: []
    });
    this.roofSupportSpanFormGroup = this.fb.group({
      roofSpanSideOneCtrl: [],
      roofSpanSideTwoCtrl: []
    });
    this.wallSupportFormGroup = this.fb.group({});
    this.wallSupportDimsFormGroup = this.fb.group({
      wallThicknessCtrl: [],
      wallHeightCtrl: []
    });
    this.wallSupportSpanFormGroup = this.fb.group({
      wallSpanCtrl: ['', Validators.required]
    });
    this.postcodeFormGroup = this.fb.group({
      postcodeCtrl: []
    });
    this.addressFormGroup = this.fb.group({
      addressCtrl: ['', Validators.required]
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
        if (this.supportFloor) this.backAction(index);
        else this.backAction(1)
        break;

      case 1:
        if (this.supportRoof) this.backAction(index);
        else this.backAction(1)
        break;

      case 2:
        if (this.supportWall) this.backAction(index);
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
          this.supportFloor = false;

          this.floorSupportSpanFormGroup.controls['floorSpanSideOneCtrl'].setValidators([Validators.required]);
          this.floorSupportSpanFormGroup.controls['floorSpanSideOneCtrl'].updateValueAndValidity();

          this.floorSupportSpanFormGroup.controls['floorSpanSideTwoCtrl'].setValidators([Validators.required]);
          this.floorSupportSpanFormGroup.controls['floorSpanSideTwoCtrl'].updateValueAndValidity();
        }
        else {
          this.supportFloor = true;

          this.floorSupportSpanFormGroup.controls['floorSpanSideOneCtrl'].clearValidators();
          this.floorSupportSpanFormGroup.controls['floorSpanSideOneCtrl'].updateValueAndValidity();

          this.floorSupportSpanFormGroup.controls['floorSpanSideTwoCtrl'].clearValidators();
          this.floorSupportSpanFormGroup.controls['floorSpanSideTwoCtrl'].updateValueAndValidity();
        }
        break;

      case 1:
        if (index === 1) {
          this.supportRoof = false;

          this.roofSupportSpanFormGroup.controls['roofSpanSideOneCtrl'].setValidators([Validators.required]);
          this.roofSupportSpanFormGroup.controls['roofSpanSideOneCtrl'].updateValueAndValidity();

          this.roofSupportSpanFormGroup.controls['roofSpanSideTwoCtrl'].setValidators([Validators.required]);
          this.roofSupportSpanFormGroup.controls['roofSpanSideTwoCtrl'].updateValueAndValidity();
        }
        else {
          this.supportRoof = true;

          this.roofSupportSpanFormGroup.get['roofSpanSideOneCtrl']?.clearValidators();
          this.roofSupportSpanFormGroup.get['roofSpanSideOneCtrl']?.updateValueAndValidity();

          this.roofSupportSpanFormGroup.get['roofSpanSideTwoCtrl']?.clearValidators();
          this.roofSupportSpanFormGroup.get['roofSpanSideTwoCtrl']?.updateValueAndValidity();
        }
        break;

      case 2:
        if (index === 1) {
          this.supportWall = false;

          this.wallSupportDimsFormGroup.controls['wallThicknessCtrl'].setValidators([Validators.required]);
          this.wallSupportDimsFormGroup.controls['wallThicknessCtrl'].updateValueAndValidity();

          this.wallSupportDimsFormGroup.controls['wallHeightCtrl'].setValidators([Validators.required]);
          this.wallSupportDimsFormGroup.controls['wallHeightCtrl'].updateValueAndValidity();
        }
        else {
          this.supportWall = true;

          this.wallSupportDimsFormGroup.get['wallThicknessCtrl']?.clearValidators();
          this.wallSupportDimsFormGroup.get['wallThicknessCtrl']?.updateValueAndValidity();

          this.wallSupportDimsFormGroup.get['wallHeightCtrl']?.clearValidators();
          this.wallSupportDimsFormGroup.get['wallHeightCtrl']?.updateValueAndValidity();
        }
        break;

      case 3:
        if (index === 1) {
          this.onlyDesign = false;

          this.wallSupportSpanFormGroup.controls['wallSpanCtrl'].setValidators([Validators.required]);
          this.wallSupportSpanFormGroup.controls['wallSpanCtrl'].updateValueAndValidity();
        }
        else {
          this.onlyDesign = true;

          this.wallSupportSpanFormGroup.get['wallSpanCtrl']?.clearValidators();
          this.wallSupportSpanFormGroup.get['wallSpanCtrl']?.updateValueAndValidity();
        }
        break;

      case 4:
        if (!this.onlyDesign) {
          this.postcodeFormGroup.controls['postcodeCtrl'].setValidators([Validators.required]);
          this.postcodeFormGroup.controls['postcodeCtrl'].updateValueAndValidity();
        }
        else {
          this.postcodeFormGroup.get['postcodeCtrl']?.clearValidators();
          this.postcodeFormGroup.get['postcodeCtrl']?.updateValueAndValidity();
        }

        const postCode = this.postcodeFormGroup.value.postcodeCtrl;
        const target = this.onlyDesign ? 'design' : 'beam';

        if (typeof postCode !== 'undefined' && postCode !== null) {
          let L1, L2, FD = 0, FD1, FD2, fl = 0, fl1, fl2, RD = 0, RD1, RD2, Fw = 0, Ftotal, M, Sx, Ix


          if (this.supportFloor) {
            const floorType = this.floorSupportTypeFormGroup.value.floorTypeCtrl;
            if (floorType == 'timber') {
              L1 = 0.5;
            }
            else {
              L1 = 2.5;
            }

            const preFloorSpanSide1 = this.floorSupportSpanFormGroup.value.floorSpanSideOneCtrl;
            const preFloorSpanSide2 = this.floorSupportSpanFormGroup.value.floorSpanSideTwoCtrl;

            const floorSpanSide1 = parseFloat(preFloorSpanSide1 === null ? 0 : preFloorSpanSide1);
            const floorSpanSide2 = parseFloat(preFloorSpanSide2 === null ? 0 : preFloorSpanSide2);

            FD1 = L1 * floorSpanSide1;
            FD2 = L1 * floorSpanSide2;
            FD = FD1 + FD2;

            fl1 = 2.5 * floorSpanSide1;
            fl2 = 2.5 * floorSpanSide2;
            fl = fl1 + fl2;
          }

          if (this.supportRoof) {
            const roofType = this.roofSupportTypeFormGroup.value.roofTypeCtrl;
            if (roofType == 'pitch')
              L2 = 1;
            else
              L2 = 0.5;

            const preRoofSpanSide1 = this.roofSupportSpanFormGroup.value.roofSpanSideOneCtrl;
            const preRoofSpanSide2 = this.roofSupportSpanFormGroup.value.roofSpanSideTwoCtrl;

            const roofSpanSide1 = parseFloat(preRoofSpanSide1 === null ? 0 : preRoofSpanSide1);
            const roofSpanSide2 = parseFloat(preRoofSpanSide2 === null ? 0 : preRoofSpanSide2);

            RD1 = L2 * roofSpanSide1;
            RD2 = L2 * roofSpanSide2;

            RD = RD1 + RD2;
          }

          if (this.supportWall) {
            const preThickness = this.wallSupportDimsFormGroup.value.wallThicknessCtrl;
            const preHeight = this.wallSupportDimsFormGroup.value.wallHeightCtrl;

            const thickness = parseFloat(preThickness === null ? 0 : preThickness);
            const height = parseFloat(preHeight === null ? 0 : preHeight);

            Fw = thickness * height * 20;
          }

          Ftotal = FD + fl + Fw + RD;
          const openingSpan = parseFloat(this.wallSupportSpanFormGroup.value.wallSpanCtrl);
          M = Ftotal * 1.5 * openingSpan * openingSpan / 8;
          Sx = M * 1000 / 265;
          Ix = 2.29 * Ftotal * openingSpan * openingSpan * openingSpan;

          let data = {
            Sx: Sx,
            Ix: Ix,
            postCode: postCode,
            target: target
          }

          console.log(data);

          this.productSvc.getProduct(data)
            .subscribe(response => {
              console.log(response);
              if (response && response.status == "success" && response.data) {
                // this.processResponse(response);
                // this.snack.open('New product Added!', 'OK', { duration: 4000 })
              } else {
                // this.snack.open('Failed!', 'OK', { duration: 4000 })
              }
              // this.loader.close();
            })


          // if (res && res.status == "success" && res.data) {
          //   yield put(productAction.getProductSuccess(res.data));
          // } else {
          //   yield put(productAction.getProductFailed(true));
          // }

          console.log(data);

          // let res = yield call(Api.getProduct, data)
          // console.log(res);
          // if (res && res.status == "success" && res.data) {
          //   yield put(productAction.getProductSuccess(res.data));
          // } else {
          //   yield put(productAction.getProductFailed(true));
          // }

        }
        break

      default:
        break;
    }

    this.forwardAction(index);
  }

  submit() {
    console.log(this.floorSupportFormGroup.value);
    console.log(this.roofSupportFormGroup.value);
    console.log(this.wallSupportFormGroup.value);
    console.log(this.wallSupportSpanFormGroup.value);
    console.log(this.postcodeFormGroup.value);
    console.log(this.addressFormGroup.value);
    console.log(this.floorSupportTypeFormGroup.value);
    console.log(this.floorSupportSpanFormGroup.value);
    console.log(this.roofSupportTypeFormGroup.value);
    console.log(this.roofSupportSpanFormGroup.value);
    console.log(this.wallSupportDimsFormGroup.value);
  }
}
