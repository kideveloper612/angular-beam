import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { marcoAnimations } from 'app/shared/animations/marco-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { OrderService } from 'app/shared/services/order.service';
import { ProductsService } from 'app/shared/services/products.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { UserService } from 'app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: [
    './order-detail.component.scss',
    '../order.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: marcoAnimations
})
export class OrderDetailComponent implements OnInit {
  public itemForm: FormGroup;
  public imgURL: any;
  public isNew: Boolean = true;
  private getProductsSub: Subscription;
  private getSuppliersSub: Subscription;
  private getUsersSub: Subscription;
  private getOrderSub: Subscription;
  public productArray: any[];
  public customerArray: any[];
  public supplierArray: any[];
  public filteredSupplierArray: any[];
  public userArray: any[];
  public statusList: String[] = [
    'Confirmed',
    'Delivery date given',
    'Completed'
  ];
  public floorList: String[] = [
    'timber',
    'concrete'
  ];
  public roofList: String[] = [
    'pitched',
    'flat'
  ];
  public paymentMethods: String[] = [
    'paypal',
    'card'
  ];
  private order_id: any;
  public priceList: any[];
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;
  constructor(
    private fb: FormBuilder,
    private productSvc: ProductsService,
    private supplierSvc: SupplierService,
    private orderSvc: OrderService,
    private userSvc: UserService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.buildItemForm(null);
    let url = this.router.url;
    if (url.includes('create')) {
      this.isNew = true;
    } else {
      this.isNew = false;
      try {
        let ue_array = url.split('/');
        this.order_id = ue_array[ue_array.length - 1];

      } catch (err) {
      }
    }

    this.getUsers();
  }

  public calcPrice() {
    return '5'
  }

  ngOnDestroy() {
    if (this.getProductsSub) {
      this.getProductsSub.unsubscribe()
    }
    if (this.getSuppliersSub) {
      this.getSuppliersSub.unsubscribe()
    }
    if (this.getUsersSub) {
      this.getUsersSub.unsubscribe()
    }
  }
  getProducts() {
    // this.loader.open();
    this.getProductsSub = this.productSvc.getProducts()
      .subscribe(response => {
        if (response.status == "success") {
          this.productArray = response.data;

          if (!this.isNew && this.order_id) {
            this.getOrder(this.order_id);
          } else {
            this.buildItemForm(null);
            this.loader.close();
          }
        }
        else {
          this.productArray = [];
          this.loader.close();
        }
      }, err => {
        this.productArray = [];
        this.loader.close();
      })
  }
  getSuppliers() {
    // this.loader.open();
    this.getSuppliersSub = this.supplierSvc.getSuppliers()
      .subscribe(response => {
        if (response.status == "success") {
          this.supplierArray = this.filteredSupplierArray = response.data;
          this.getProducts();
        }
        else {
          this.productArray = [];
          this.loader.close();
        }
      }, err => {
        this.productArray = [];
        this.loader.close();
      })
  }
  getOrder(id) {
    this.getOrderSub = this.orderSvc.getOrder(id)
      .subscribe(response => {
        if (response.status == "success") {
          let order = response.data;
          this.buildItemForm(order);
        }

        this.loader.close();
      }, err => {
        this.productArray = [];
        this.loader.close();
      })
  }
  getUsers() {
    this.loader.open();
    this.getUsersSub = this.userSvc.getAllUsers()
      .subscribe(response => {
        if (response.status == "success") {
          this.customerArray = response.data;
          this.getSuppliers();
        }
        else {
          this.productArray = [];
          this.loader.close();
        }
      }, err => {
        this.productArray = [];
        this.loader.close();
      })
  }

  buildItemForm(item: any) {
    // console.log(item);
    this.itemForm = this.fb.group({
      postCode: [item?.postCode || '', Validators.required],
      cid: [item?.customer || '', Validators.required],
      sid: [item?.supplier || '', Validators.required],
      pid: [item?.product || '', Validators.required],
      amount: [item?.amount || '', Validators.required],
      tid: [item?.tid || '', Validators.required],
      pby: [item?.pby || '', Validators.required],
      status: [item?.status || '', Validators.required],
      supportFloor: [item?.orderContent?.supportFloor || false, Validators.required],
      floorType: [item?.orderContent?.floorType || '', item?.orderContent?.supportFloor ? Validators.required : null],
      floorSpanSide1: [item?.orderContent?.floorSpanSide1 || '', item?.orderContent?.supportFloor ? Validators.required : null],
      floorSpanSide2: [item?.orderContent?.floorSpanSide2 || '', item?.orderContent?.supportFloor ? Validators.required : null],
      supportRoof: [item?.orderContent?.supportRoof || false, Validators.required],
      roofType: [item?.orderContent?.roofType || '', item?.orderContent?.supportRoof ? Validators.required : null],
      roofSpanSide1: [item?.orderContent?.roofSpanSide1 || '', item?.orderContent?.supportRoof ? Validators.required : null],
      roofSpanSide2: [item?.orderContent?.roofSpanSide2 || '', item?.orderContent?.supportRoof ? Validators.required : null],
      supportWall: [item?.orderContent?.supportWall || false, Validators.required],
      thickness: [item?.orderContent?.thickness || '', item?.orderContent?.supportWall ? Validators.required : null],
      height: [item?.orderContent?.height || '', item?.orderContent?.supportWall ? Validators.required : null],
      openingSpan: [item?.orderContent?.openingSpan || '', Validators.required],
    })
  }
  inputPostCode(evt: any) {
    let postCode: String = evt?.target?.value;
    try {
      let areaCode = postCode.substring(0, 2);
      this.filteredSupplierArray = new Array();
      for (let i = 0; i < this.supplierArray.length; i++) {
        let item = this.supplierArray[i];
        let supplierAreaCode = item.postCode.substring(0, 2);
        if (supplierAreaCode.includes(areaCode)) {
          this.filteredSupplierArray.push(item);
        }
      }
    } catch (error) {

    }
  }
  checkSupportFloor() {
    setTimeout(() => {
      this.itemForm.controls["floorType"].setValidators(this.itemForm.value.supportFloor ? [Validators.required] : null);
      this.itemForm.controls["floorSpanSide1"].setValidators(this.itemForm.value.supportFloor ? Validators.required : null);
      this.itemForm.controls["floorSpanSide2"].setValidators(this.itemForm.value.supportFloor ? Validators.required : null);
      this.itemForm.get("floorType").updateValueAndValidity();
      this.itemForm.get("floorSpanSide1").updateValueAndValidity();
      this.itemForm.get("floorSpanSide2").updateValueAndValidity();
    }, 100);
  }
  checkSupportRoof() {
    setTimeout(() => {
      this.itemForm.controls["roofType"].setValidators(this.itemForm.value.supportRoof ? Validators.required : null);
      this.itemForm.controls["roofSpanSide1"].setValidators(this.itemForm.value.supportRoof ? Validators.required : null);
      this.itemForm.controls["roofSpanSide2"].setValidators(this.itemForm.value.supportRoof ? Validators.required : null);
      this.itemForm.get("roofType").updateValueAndValidity();
      this.itemForm.get("roofSpanSide1").updateValueAndValidity();
      this.itemForm.get("roofSpanSide2").updateValueAndValidity();
    }, 100);
  }
  checkSupportWall() {
    setTimeout(() => {
      this.itemForm.controls["thickness"].setValidators(this.itemForm.value.supportWall ? Validators.required : null);
      this.itemForm.controls["height"].setValidators(this.itemForm.value.supportWall ? Validators.required : null);
      this.itemForm.get("thickness").updateValueAndValidity();
      this.itemForm.get("height").updateValueAndValidity();
    }, 100);
  }
  onSelectFile(evt) {
    if (!evt.target.files)
      return;
    let file: any = evt.target.files[0]
    var mimeType = file.type;
    if (mimeType && mimeType.match(/image\/*/) == null) {
      this.snack.open('Only images are supported.', 'OK', { duration: 4000 })
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    this.itemForm.addControl('imgFile', new FormControl(file));
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  openFileDialog() {
    const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    e.click();
  }
  public goBack() {
    this.router.navigateByUrl('/orders');
  }

  submit() {
    // console.log(this.itemForm.value);

    let data = this.itemForm.value;
    this.loader.open();
    if (this.isNew) {
      this.orderSvc.insertOrder(data)
        .subscribe(data => {
          this.loader.close();
          if (data.status == 'success') {
            this.snack.open('Order Added!', 'OK', { duration: 4000 })
            this.goBack();
          }
          else
            this.snack.open(data.msg, 'OK', { duration: 4000 })
        }, err => {
          this.snack.open('Failed', 'OK', { duration: 4000 })
          this.loader.close();
        })
    } else {
      this.orderSvc.updateOrder(this.order_id, data)
        .subscribe(data => {
          // console.log(data);
          this.loader.close();
          if (data.status == 'success') {
            this.snack.open('Order Updated!', 'OK', { duration: 4000 });
            this.goBack();
          }
          else
            this.snack.open(data.msg, 'OK', { duration: 4000 })
        }, err => {
          this.snack.open('Failed', 'OK', { duration: 4000 })
          this.loader.close();
        })
    }
  }

  public isInvalidPrice() {
    if (!this.priceList)
      return true;
    for (let i = 0; i < this.priceList.length; i++) {
      if (!this.priceList[i])
        return true;
    }
    return false
  }

}
