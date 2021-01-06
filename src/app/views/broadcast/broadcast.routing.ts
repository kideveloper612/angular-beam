import { Routes } from '@angular/router';

import { BroadcastComponent } from './broadcast.component';


export const BroadcastRoutes: Routes = [
  { path: '', component: BroadcastComponent, data: { title: 'Broadcast' } }
];