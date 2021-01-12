import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { UserService } from 'app/shared/services/user.service';
import { InboxService } from 'app/shared/services/inbox.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BroadcastService } from 'app/shared/services/broadcast.service';
let toList: any[];

@Component({
  selector: 'broadcast-compose',
  templateUrl: './broadcast-compose.template.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadCastComposeComponent implements OnInit {
  newMailData = {};
  mailForm: FormGroup;
  getAllUsersSub: Subscription;
  sendMessageSub: Subscription;
  users;
  removable = true;
  addOnBlur = true;
  @ViewChild("importEmailsFromJson") importEmailsFromJson;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private composeDialog: MatDialog,
    private loader: AppLoaderService,
    private userSvc: UserService,
    public dialogRef: MatDialogRef<BroadCastComposeComponent>,
    private broadcastSvc: BroadcastService) {

  }

  public getToList() {
    return toList;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      toList.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(to): void {
    const index = toList.indexOf(to);

    if (index >= 0) {
      toList.splice(index, 1);
    }
  }
  ngOnInit() {
    if (this.data) {
      toList = this.data.toList;
      this.mailForm = new FormGroup({
        subject: new FormControl(this.data.subject, [
          Validators.required
        ]),
        body: new FormControl(this.data.body.content, [
          Validators.required
        ])
      })

      
      // this.mailForm = new FormGroup({
      //   subject: new FormControl('', [
      //     Validators.required
      //   ]),
      //   body: new FormControl('', [
      //     Validators.required
      //   ])
      // })
    } else {
      toList = [];
      this.mailForm = new FormGroup({
        subject: new FormControl('', [
          Validators.required
        ]),
        body: new FormControl('', [
          Validators.required
        ])
      })
    }
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

  sendEmail() {
    // console.log(this.mailForm.value);
    let formValue = this.mailForm.value
    formValue = {
      ...formValue,
      // body: this.removeP_Tag(formValue.body),
      toList: toList
    }
    if (!this.mailForm.valid || !toList || toList.length == 0)
      return;
    this.sendMessageSub = this.broadcastSvc.broadcast(formValue)
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

  public removeP_Tag(text: string) {
    while (text.includes("<p>") || text.includes("</p>")) {
      text = text.replace('<p>', '');
      text = text.replace('</p>', '');
    }
    return text
  }
  closeDialog() {

  }

  importEmailFromJsonFile(event: any) {
    var file = event.srcElement.files[0];
    if (file) {
      this.importEmailsFromJson.nativeElement.value = "";
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt: any) {
        let emailArray: any[] = JSON.parse(evt.target.result);
        let array = [];
        for (let i = 0; i < emailArray.length; i++) {
          array.push(emailArray[i].email)
        }
        toList = array
      }
      reader.onerror = function (evt) {
        console.log('error reading file');
      }
    }
  }
}
