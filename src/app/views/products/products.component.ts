import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppComfirmComponent } from 'app/shared/services/app-confirm/app-confirm.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../shared/services/products.service';
import { ProductPopupComponent } from './product-popup/product-popup.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: any[] = [
    {
      prop: 'index',
      name: '№'
    },
    {
      prop: 'sod',
      name: 'Section designation'
    },
    {
      prop: 'mpm',
      name: 'Mass per metre (kg/m)'
    },
    {
      prop: 'dos',
      name: 'Depth of section (mm)'
    },
    {
      prop: 'wos',
      name: 'Width of section (mm)'
    },
    {
      prop: 'smoa',
      name: 'Second mement of area, Axis y-y (cm^4)'
    },
    {
      prop: 'pma',
      name: 'Plastic modules, Axis y-y (cm^3)'
    },
    {
      prop: 'actions',
      name: 'Actions'
    }
  ];
  productArray: any[];
  temp: any[];

  public getProductsSub: Subscription;
  constructor(private productSvc: ProductsService,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy() {
    if (this.getProductsSub) {
      this.getProductsSub.unsubscribe()
    }
  }

  refresh(): void {
    this.loader.open();
    this.getProductsSub = this.productSvc.getProducts()
      .subscribe(response => {
        this.processResponse(response);
        this.loader.close();
      }, err => {
        this.productArray = [];
        this.loader.close();
      })
  }

  processResponse(response: any) {
    let array: any[] = [];
    let customArray = [];
    if (response && response.data && response.data.length > 0) {
      array = response.data;
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let newItem = {
          index: i + 1,
          sod: `${item.sodx} x ${item.sody} x ${item.sodz}`,
          ...item,
        }
        customArray.push(newItem);
      }
    }
    this.productArray = this.temp = customArray;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);

    // console.log(columns);
    if (!columns.length)
      return;

    const rows = this.temp.filter(function (d) {
      for (let i = 3; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.productArray = rows;

  }
  editProduct(product: any) {
    this.openPopUp(product, false);
  }
  removeProduct(product: any) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(AppComfirmComponent, {
      width: '300px',
      disableClose: false,
      data: { title: 'Do you really want to remove the product?' }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res)
          return;
        this.productSvc.removeProduct(product._id)
          .subscribe(response => {
            if (response.status == 'success') {
              this.processResponse(response);
              this.snack.open('Product removed!', 'OK', { duration: 4000 })
            }
            else {
              this.snack.open('Failed!', 'OK', { duration: 4000 })
            }
            this.loader.close();
          })
      })

  }
  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add a new product' : 'Update an existing product';
    let dialogRef: MatDialogRef<any> = this.dialog.open(ProductPopupComponent, {
      width: '720px',
      disableClose: false,
      data: { title: title, payload: data, isNew: isNew }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.productSvc.insertProduct(res)
            .subscribe(response => {
              if (response.status == "success") {
                this.processResponse(response);
                this.snack.open('New product Added!', 'OK', { duration: 4000 })
              } else {
                this.snack.open('Failed!', 'OK', { duration: 4000 })
              }
              this.loader.close();
            })
        } else {
          this.productSvc.updateProduct(data._id, res)
            .subscribe(response => {
              if (response.status == "success") {
                this.processResponse(response);
                this.snack.open('Product Updated!', 'OK', { duration: 4000 })
              } else {
                this.snack.open('Failed!', 'OK', { duration: 4000 })
              }
              this.loader.close();
            })
        }
      })
  }
}
