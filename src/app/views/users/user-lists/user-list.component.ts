import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { Subscription } from 'rxjs';
import { marcoAnimations } from "../../../shared/animations/marco-animations";
import { UserService } from 'app/shared/services/user.service';
import { AppComfirmComponent } from 'app/shared/services/app-confirm/app-confirm.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: marcoAnimations
})
export class UserListComponent implements OnInit, OnDestroy {
  public items: any[];
  public getUsersSub: Subscription;
  public currentPage: any;
  displayedColumns: any[] = [
    {
      prop: 'index',
      name: '№'
    },
    {
      prop: 'name',
      name: 'Name'
    },
    {
      prop: 'email',
      name: 'Email'
    },
    {
      prop: 'role',
      name: 'Role'
    },
    {
      prop: 'imagePath',
      name: 'Avatar'
    },
    {
      prop: 'phoneNumber',
      name: 'Phone number'
    },
    {
      prop: 'address',
      name: 'Address'
    },
    {
      prop: 'postCode',
      name: 'Post code'
    },
    {
      prop: 'verified',
      name: 'Status'
    },
    {
      prop: 'actions',
      name: 'Actions'
    }
  ];
  public userArray: any[];
  public temp: any[];
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private userSvc: UserService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.refresh()
  }
  ngOnDestroy() {
    if (this.getUsersSub) {
      this.getUsersSub.unsubscribe()
    }
  }
  refresh() {
    this.getUsersSub = this.userSvc.getUsers()
      .subscribe(response => {
        this.processResponse(response);
        this.loader.close();
      }, err => {
        this.userArray = [];
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
      this.userArray = this.temp = customArray;
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new member' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(UserPopupComponent, {
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
          this.userSvc.insertUser(res)
            .subscribe(data => {
              this.processResponse(data)
              this.loader.close();
              if (data.status == 'success')
                this.snack.open('Member Added!', 'OK', { duration: 4000 })
              else
                this.snack.open(data.msg, 'OK', { duration: 4000 })
            }, err => {
              this.snack.open('Failed', 'OK', { duration: 4000 })
              this.loader.close();
            })
        } else {
          this.userSvc.updateUser(data._id, res)
            .subscribe(data => {
              this.processResponse(data)
              this.loader.close();
              if (data.status == 'success')
                this.snack.open('Member Updated!', 'OK', { duration: 4000 })
              else
                this.snack.open(data.msg, 'OK', { duration: 4000 })
            }, err => {
              this.snack.open('Failed', 'OK', { duration: 4000 })
              this.loader.close();
            })
        }
      })
  }
  deleteItem(user: any) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(AppComfirmComponent, {
      width: '300px',
      disableClose: false,
      data: { title: 'Do you really want to remove the user?' }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res)
          return;
        this.userSvc.removeUser(user._id)
          .subscribe(response => {
            if (response.status == 'success') {
              this.processResponse(response);
              this.snack.open('User removed!', 'OK', { duration: 4000 })
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

    this.userArray = rows;

  }
}