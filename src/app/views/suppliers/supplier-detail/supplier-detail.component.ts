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
  public productArray: any[];
  private user_id: any;
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
        if (!this.user_id)
          return
      } catch (err) {
        return;
      }
    }

    this.getProducts();
  }


  ngOnDestroy() {
    if (this.getProductsSub) {
      this.getProductsSub.unsubscribe()
    }
  }
  getProducts() {
    this.loader.open();
    this.getProductsSub = this.productSvc.getProducts()
      .subscribe(response => {
        if (response.status == "success")
          this.productArray = response.data;
        else
          this.productArray = [];
        this.loader.close();
      }, err => {
        this.productArray = [];
        this.loader.close();
      })
  }
  getSupplier(id) {
    this.loader.open();
    this.getProductsSub = this.productSvc.getProducts()
      .subscribe(response => {
        if (response.status == "success")
          this.productArray = response.data;
        else
          this.productArray = [];
        this.loader.close();
      }, err => {
        this.productArray = [];
        this.loader.close();
      })
  }
  buildItemForm(item: any) {
    if (item)
      this.imgURL = item.imagePath;
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
    this.location.back();
  }
}
