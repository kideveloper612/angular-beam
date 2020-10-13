import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { marcoAnimations } from 'app/shared/animations/marco-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ProductsService } from 'app/shared/services/products.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss', '../suppliers.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: marcoAnimations
})
export class SupplierDetailComponent implements OnInit {
  public itemForm: FormGroup;
  public imgURL: any;
  public isNew: Boolean = true;
  private getProductsSub: Subscription;
  private getSupplierSub: Subscription;
  public productArray: any[];
  private user_id: any;
  public priceList: any[];
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;
  constructor(
    private fb: FormBuilder,
    private productSvc: ProductsService,
    private supplierSvc: SupplierService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.buildItemForm(null);
    let url = this.router.url;
    if (url.includes('create')) {
      this.isNew = true;
    } else {
      this.isNew = false;
      try {
        let ue_array = url.split('/');
        this.user_id = ue_array[ue_array.length - 1];

      } catch (err) {
      }
    }

    this.getProducts();
  }


  ngOnDestroy() {
    if (this.getProductsSub) {
      this.getProductsSub.unsubscribe()
    }
    if (this.getSupplierSub) {
      this.getSupplierSub.unsubscribe()
    }
  }
  getProducts() {
    this.loader.open();
    this.getProductsSub = this.productSvc.getProducts()
      .subscribe(response => {
        if (response.status == "success") {
          this.productArray = response.data;
          this.priceList = new Array(this.productArray.length).fill('0');
          if (!this.isNew && this.user_id) {
            this.getSupplier(this.user_id);
          } else {
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
  getSupplier(id) {
    this.getSupplierSub = this.supplierSvc.getSupplier(id)
      .subscribe(response => {
        if (response.status == "success") {
          let user = response.data;
          this.imgURL = user.imagePath;
          this.itemForm.setControl('name', new FormControl(user.name));
          this.itemForm.setControl('phoneNumber', new FormControl(user.phoneNumber))
          this.itemForm.setControl('postCode', new FormControl(user.postCode))
          this.itemForm.setControl('email', new FormControl(user.email))
          for (let i = 0; i < this.priceList.length; i++) {
            let product = this.productArray[i];
            for (let j = 0; j < user.products.length; j++) {
              let priceItem = user.products[j];
              if (product._id == priceItem.product) {
                this.priceList[i] = priceItem.price;
                break;
              }
            }
          }
        }

        this.loader.close();
      }, err => {
        this.productArray = [];
        this.loader.close();
      })
  }
  buildItemForm(item: any) {
    this.itemForm = this.fb.group({
      name: [item?.name || '', Validators.required],
      email: [item?.email || '', Validators.required],
      phoneNumber: [item?.phoneNumber || '', Validators.required],
      postCode: [item?.postCode || '', Validators.required],
    })
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
    this.router.navigateByUrl('/suppliers');
  }

  submit() {
    console.log(this.priceList, this.itemForm.value);
    let priceEle: any[] = new Array();
    for (let i = 0; i < this.priceList.length; i++) {
      let item: any = {
        product: this.productArray[i]._id,
        price: this.priceList[i]
      }
      priceEle.push(item);
    }
    let data: any = {
      ...this.itemForm.value,
      products: priceEle
    }
    this.loader.open();
    if (this.isNew) {
      this.supplierSvc.insertSupplier(data)
        .subscribe(data => {
          this.loader.close();
          if (data.status == 'success') {
            this.snack.open('Member Added!', 'OK', { duration: 4000 })
            this.goBack();
          }
          else
            this.snack.open(data.msg, 'OK', { duration: 4000 })
        }, err => {
          this.snack.open('Failed', 'OK', { duration: 4000 })
          this.loader.close();
        })
    } else {
      this.supplierSvc.updateSupplier(this.user_id, data)
        .subscribe(data => {
          console.log(data);
          this.loader.close();
          if (data.status == 'success') {
            this.snack.open('Member Updated!', 'OK', { duration: 4000 });
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
