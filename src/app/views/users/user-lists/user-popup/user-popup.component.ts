import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'user-popup',
  templateUrl: './user-popup.component.html'
})
export class UserPopupComponent implements OnInit {
  public itemForm: FormGroup;

  public roles: String[] = ['customer', 'admin'];
  public selectedRole: String;
  public imagePath: String;
  public imgURL: any;
  public avatar: any;
  public selectedImage: any;
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserPopupComponent>,
    private fb: FormBuilder,
    private snack: MatSnackBar,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.imgURL = item.imagePath;
    this.itemForm = this.fb.group({
      name: [item?.name || '', Validators.required],
      email: [item?.email || '', Validators.required],
      role: [item?.role || '', Validators.required],
      phoneNumber: [item?.phoneNumber || ''],
      verified: [item?.verified || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
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
}
