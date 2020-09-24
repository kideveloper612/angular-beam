import { Routes } from '@angular/router';

import { AppTourComponent } from './app-pricing.component';


export const TourRoutes: Routes = [

  {
    path: "",
    component: AppTourComponent,
    data: { title: 'Invoice', breadcrumb: 'Invoice' }

  }
];