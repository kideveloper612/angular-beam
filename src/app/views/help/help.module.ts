import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HelpComponent } from './help.component';
import { FaqComponent } from './faq/faq.component';
import { HelpHomeComponent } from './home/help-home.component';
import { SupportComponent } from './support/support.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { SharedMaterialModule } from 'app/shared/shared-material.module';


import { HelpRoutes } from "./help.routing";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    MatExpansionModule,
    FlexLayoutModule,
    RouterModule.forChild(HelpRoutes)
  ],
  declarations: [HelpComponent, FaqComponent, HelpHomeComponent, SupportComponent]
})
export class AppHelpModule { }
