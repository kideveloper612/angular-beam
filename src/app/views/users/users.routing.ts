import { Routes } from '@angular/router';
import { UserListComponent } from './user-lists/user-list.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: { title: 'list', breadcrumb: 'List' }
  }
];