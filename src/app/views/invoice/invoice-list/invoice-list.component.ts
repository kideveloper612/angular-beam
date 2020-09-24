import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { MatTable } from "@angular/material/table";
import { InvoiceService } from "../invoice.service";
import { AppConfirmService } from "app/shared/services/app-confirm/app-confirm.service";
import { Invoice } from "app/shared/models/invoice.model";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.scss"]
})
export class InvoiceListComponent implements OnInit {
  @ViewChild(MatTable) itemTable: MatTable<any>;
  countryTrafficStats: any[];
  invoiceTotal: any[];
  invoiceList: Invoice[];

  itemTableColumn: string[] = [
    "Order No.",
    "Bill From",
    "Bill To",
    "Status",
    "Actions"
  ];

  constructor(
    private invoiceService: InvoiceService,
    private confirmService: AppConfirmService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getInvoiceList();

    this.countryTrafficStats = [
      {
        country: "New Dashboard Prototype, Design & Code",
        visitor: "$35.00",
        pageView: "Hour",
        download: 40,
        bounceRate: "$1200.00"
        
      },
      {
        country: "Graphic Pack - Monthly Subscription (includes Updates)	",
        visitor: "$35.00",
        pageView: "Hour",
        download: 40,
        bounceRate: "$1200.00"
      },
      {
        country: "Logo & Branding Pack	",
        visitor: "$35.00",
        pageView: "Hour",
        download: 40,
        bounceRate: "$1200.00"
      },
      {
        country: "Bug Fixes",
        visitor: "$35.00",
        pageView: "Hour",
        download: 40,
        bounceRate: "$1200.00"
      }
    ];

    this.invoiceTotal = [
      {
        download: "SUBTOTAL",
        bounceRate: "$3100.00"
        
      },
      {
        download: "TAX (17%)",
        bounceRate: "$234"
      },
      {
        download: "DISCOUNT (5%)",
        bounceRate: "-$119.00"
      },
      {
        download: "TOTAL",
        bounceRate: "$3200.00"
      }
    ];
  }

  

  getInvoiceList() {
    this.invoiceService.getInvoiceList()
    .subscribe((res: Invoice[]) => {
      this.invoiceList = res;
      this.cdr.detectChanges();
    });
  }

  deleteInvoiceById(id) {
    this.confirmService
      .confirm({ title: "Confirm", message: "Are you sure to delete?" })
      .subscribe(res => {
        if (res) {
          this.invoiceService.deleteInvoice(id).subscribe(e => {
            this.getInvoiceList();
          });
          this.itemTable.renderRows();
        } else return;
      });
  }
}
