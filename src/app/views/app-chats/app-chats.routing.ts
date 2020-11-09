import { Routes } from '@angular/router';
import { ComingSoonComponent } from '../sessions/coming-soon/coming-soon.component';

import { AppChatsComponent } from './app-chats.component';

export const ChatsRoutes: Routes = [
  { path: '', component: AppChatsComponent, data: { title: 'Chat' } }
];
