import { Routes } from '@angular/router';

import { HelpHomeComponent } from './home/help-home.component';
import { FaqComponent } from "./faq/faq.component";
import { SupportComponent } from "./support/support.component";



export const HelpRoutes: Routes = [
  // { path: '', component: HelpComponent, data: { title: 'Google map' },
  {
    path: "help-home",
    component: HelpHomeComponent,
    data: { title: 'Home', breadcrumb: 'Home' }
  },
  {
    path: "faq",
    component: FaqComponent,
    data: { title: 'Faq', breadcrumb: 'Faq' }
  },
  {
    path: "support",
    component: SupportComponent,
    data: { title: 'Support', breadcrumb: 'Support' }
  },
 
];