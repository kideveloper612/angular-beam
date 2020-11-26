import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { marcoAnimations } from 'app/shared/animations/marco-animations';
import { AppComfirmComponent } from 'app/shared/services/app-confirm/app-confirm.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { OrderService } from 'app/shared/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: marcoAnimations
})
export class OrderListComponent implements OnInit {

  private getOrdersSub: Subscription
  public orderArray: any[];
  public temp: any[];
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private orderSvc: OrderService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.refresh()
  }
  ngOnDestroy() {
    if (this.getOrdersSub) {
      this.getOrdersSub.unsubscribe()
    }
  }
  refresh() {
    this.loader.open();
    this.getOrdersSub = this.orderSvc.getOrders()
      .subscribe(response => {
        // console.log(response)
        this.processResponse(response);
        this.loader.close();
      }, err => {
        this.orderArray = [];
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
          ...item,
        }
        customArray.push(newItem);
      }
    }
    if (response.status == 'success')
      this.orderArray = this.temp = customArray;
  }

  deleteItem(order: any) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(AppComfirmComponent, {
      width: '300px',
      disableClose: false,
      data: { title: 'Do you really want to remove the order?' }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res)
          return;
        this.orderSvc.removeOrder(order._id)
          .subscribe(response => {
            if (response.status == 'success') {
              this.processResponse(response);
              this.snack.open('Order removed!', 'OK', { duration: 4000 })
            }
            else {
              this.snack.open('Failed!', 'OK', { duration: 4000 })
            }
            this.loader.close();
          })
      })
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
      for (let i = 2; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.orderArray = rows;

  }

}
