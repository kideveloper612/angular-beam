import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { InvoiceService } from "../invoice.service";
import { Invoice, InvoiceItem } from 'app/shared/models/invoice.model';

@Component({
  selector: "app-invoice-details",
  templateUrl: "./invoice-details.component.html",
  styleUrls: ["./invoice-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class InvoiceDetailsComponent implements OnInit {
  cost: number = 0;
  vat: number = 0;
  currency: string = '$';
  showEditOption: boolean = false;
  isLoading = false;
  invoiceForm: FormGroup;
  invoiceFormSub: Subscription;
  invocieId: number;
  invoice: Invoice = {
    item: []
  };

  emptyFormObject: InvoiceItem = {
    name: "",
    price: null,
    unit: null
  };

  itemTableColumn: string[] = [
    "Number",
    "Item Name",
    "Unit Price",
    "Unit",
    "Cost"
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.invocieId = this.route.snapshot.params["id"];
    if (this.invocieId) {
      this.getInvoice();
      this.showEditOption = false;
    } else {
      this.buildInvoiceForm();
      this.showEditOption = true;
    }
  }

  getInvoice() {
    this.invoiceService.getInvoiceById(this.invocieId).subscribe((invoice: Invoice) => {
      this.invoice = invoice;
      this.buildInvoiceForm(this.invoice);
      this.calculateCost(this.invoice);
      this.cdr.markForCheck();
    });
  }

  buildInvoiceForm(invoice?: Invoice) {
    this.invoiceForm = this.fb.group({
      id: [invoice?invoice.id:''],
      orderNo: [invoice?invoice.orderNo:''],
      status: invoice?invoice.status:'',
      date: invoice?new Date(invoice.date):'',
      vat: invoice?invoice.vat:0,
      currency: invoice?invoice.currency:'',
      seller: this.fb.group({
        name: [invoice?invoice.seller.name:''],
        address: [invoice?invoice.seller.address:''],
      }),
      buyer: this.fb.group({
        name: [invoice?invoice.buyer.name:''],
        address: [invoice?invoice.buyer.address:''],
      }),
      item: this.fb.array([])
    });

    this.invoice.item.forEach(i => {
      this.addNewItem(i);
    });

    if(this.invoiceFormSub){
      this.invoiceFormSub.unsubscribe();
    }

    this.invoiceFormSub = this.invoiceForm.valueChanges.subscribe(res => {
      this.calculateCost(res);
    });

  }

  calculateCost(invoice: Invoice) {
    this.cost = 0;
    invoice.item.forEach(element => {
      this.cost += element.unit * element.price;
    });
    this.vat = (invoice.vat * this.cost)/100;
    this.currency = invoice.currency;
  }

  addNewItem(item: InvoiceItem) {
    this.invoiceItemFormArray.push(
      this.fb.group({
        name: [item?item.name:''],
        price: [item?item.price:''],
        unit: [item?item.unit:'']
      })
    );
  }

  deleteItemFromInvoice(i: number) {
    this.invoiceItemFormArray.removeAt(i);
  }

  saveInvoice() {
    if (this.invoiceForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.invoiceService.saveInvoice(this.invoiceForm.value)
    .subscribe( (res: Invoice) => {
      this.invoice = this.invoiceForm.value;
      this.isLoading = false;
      this.showEditOption = false;

      this.cdr.markForCheck();

      if(res) {
        this.router.navigateByUrl('/invoice/'+ res.id);
      }
    });
  }

  print() {
    window.print();
  }

  get invoiceItemFormArray(): FormArray {
    return this.invoiceForm.get("item") as FormArray;
  }
}
