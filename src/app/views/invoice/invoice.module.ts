import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceService } from './invoice.service';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FlexLayoutModule
  ],
  declarations: [InvoiceListComponent, InvoiceDetailsComponent],
  providers: [InvoiceService]
})

export class InvoiceModule { }
