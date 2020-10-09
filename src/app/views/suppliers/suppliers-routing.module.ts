import { Routes } from '@angular/router';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

import { SuppliersComponent } from './suppliers.component';


export const SuppliersRoutes: Routes = [
  { path: '', component: SuppliersComponent },
  {
    path: 'create',
    component: SupplierDetailComponent,
    data: { title: 'Create', breadcrumb: 'Create' }
  },
  {
    path: 'update/:id',
    component: SupplierDetailComponent,
    data: { title: 'Edit', breadcrumb: 'Edit' }
  }
];
