import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductPopupComponent implements OnInit {

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductPopupComponent>,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      sodx: [item.sodx || '', Validators.required],
      sody: [item.sody || '', Validators.required],
      sodz: [item.sodz || '', Validators.required],
      mpm: [item.mpm || '', Validators.required],
      dos: [item.dos || '', Validators.required],
      wos: [item.wos || '', Validators.required],
      smoa: [item.smoa || '', Validators.required],
      pma: [item.pma || '', Validators.required],
    })
  }


  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
