import { Routes } from '@angular/router';
import { ComingSoonComponent } from '../sessions/coming-soon/coming-soon.component';

import { AppCalendarComponent } from './app-calendar.component';

export const CalendarRoutes: Routes = [
  { path: '', component: AppCalendarComponent, data: { title: 'Calendar' } }
];