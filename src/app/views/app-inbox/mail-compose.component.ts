import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { UserService } from 'app/shared/services/user.service';
import { InboxService } from 'app/shared/services/inbox.service';

@Component({
  selector: 'mail-compose',
  templateUrl: './mail-compose.template.html'
})
export class MailComposeComponent implements OnInit {
  newMailData = {};
  mailForm: FormGroup;
  getAllUsersSub: Subscription;
  sendMessageSub: Subscription;
  users;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private composeDialog: MatDialog,
    private loader: AppLoaderService,
    private userSvc: UserService,
    public dialogRef: MatDialogRef<MailComposeComponent>,
    private inboxSvc: InboxService) { }

  ngOnInit() {
    if (this.data) {
      this.mailForm = new FormGroup({
        _id: new FormControl({ value: this.data._id, disabled: true }, []),
        customer: new FormControl({ value: this.data.customer._id, disabled: true }, [
          Validators.required,
        ]),
        subject: new FormControl({ value: this.data.subject, disabled: true }, [
          Validators.required
        ]),
        body: new FormControl('', [
          Validators.required
        ])
      })
    } else {
      this.mailForm = new FormGroup({
        _id: new FormControl('', []),
        customer: new FormControl('', [
          Validators.required,
        ]),
        subject: new FormControl('', [
          Validators.required
        ]),
        body: new FormControl('', [
          Validators.required
        ])
      })
    }

    this.getAllUsers();
  }
  escapeHtml(text) {
    if (text == null)
      return null;
    if (typeof (text) != 'string')
      return text;

    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&#34;',
      "'": '&#39;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
  }
  ngOnDestroy() {
    if (this.getAllUsersSub) {
      this.getAllUsersSub.unsubscribe()
    }
    if (this.sendMessageSub) {
      this.sendMessageSub.unsubscribe()
    }
  }


  getAllUsers() {
    this.loader.open();
    this.getAllUsersSub = this.userSvc.getAllUsers()
      .subscribe(response => {
        if (response.status == "success") {
          this.users = response.data;
        }
        else {
          this.users = []
        }
        this.loader.close();
      }, err => {
        this.users = [];
        this.loader.close();
      })
  }
  sendEmail() {
    // console.log(this.mailForm.value);
    let formValue = this.mailForm.value
    formValue = {
      ...formValue,
      body: this.removeP_Tag(formValue.body)
    }
    if (this.data) {
      formValue = {
        ...formValue,
        _id: this.data._id,
        subject: this.data.subject,
        customer: this.data.customer._id
      }
    }
    this.sendMessageSub = this.inboxSvc.sendMessage(formValue)
      .subscribe(response => {
        if (response.status == "success") {
          this.dialogRef.close({ status: 'success' })
        }
        else {
        }
        this.loader.close();
      }, err => {
        this.loader.close();
      })
  }

  removeP_Tag(text: string) {
    text = text.replace('<p>', '');
    text = text.replace('</p>', '');
    return text
  }
  closeDialog() {

  }
}
