import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from '../sessions/coming-soon/coming-soon.component';
import { NotificationsComponent } from './notifications.component';


// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class NotificationsRoutingModule { }


export const NotificationsRoutingModule: Routes = [
  { path: '', component: NotificationsComponent },
  // {
  //   path: 'create',
  //   component: SupplierDetailComponent,
  //   data: { title: 'Create', breadcrumb: 'Create' }
  // },
  // {
  //   path: 'update/:id',
  //   component: SupplierDetailComponent,
  //   data: { title: 'Edit', breadcrumb: 'Edit' }
  // }
];