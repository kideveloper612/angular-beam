import { Routes } from '@angular/router';
import { UserListComponent } from './user-lists/user-list.component';

export const CrudsRoutes: Routes = [
  { 
    path: 'list', 
    component: UserListComponent, 
    data: { title: 'list', breadcrumb: 'List' } 
  }
];