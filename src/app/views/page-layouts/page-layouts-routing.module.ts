import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftSidebarCardComponent } from './left-sidebar-card/left-sidebar-card.component';
import { FullWidthCardComponent } from './full-width-card/full-width-card.component';

import { FullWidthCardTabComponent } from './full-width-card-tab/full-width-card-tab.component';

const routes: Routes = [
  {
    path: 'full-width-card',
    component: FullWidthCardComponent
  },
  {
    path: 'full-width-card-tab',
    component: FullWidthCardTabComponent
  },
  {
    path: 'left-sidebar-card',
    component: LeftSidebarCardComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageLayoutsRoutingModule { }
