import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppTourComponent } from './app-pricing.component';
import { TourRoutes } from './app-pricing.routing';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forChild(TourRoutes)
  ],
  declarations: [AppTourComponent]
})
export class AppPricingModule { }
