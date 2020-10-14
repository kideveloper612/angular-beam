import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { ComingSoonComponent } from '../sessions/coming-soon/coming-soon.component';

const routes: Routes = [
  {
    path: '',
    // component: TodoComponent,
    component: ComingSoonComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TodoListComponent,
        data: { title: 'Todo', breadcrumb: 'Todo' } 
      },
      {
        path: 'add',
        component: TodoDetailsComponent,
        data: { title: 'Todo Add', breadcrumb: 'Todo Add' } 

      },
      {
        path: 'list/:id',
        component: TodoDetailsComponent,
        data: { title: 'Todo Details', breadcrumb: 'Todo Details' } 
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
