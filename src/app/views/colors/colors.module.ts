import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { ColorsRoutingModule } from './colors.routing';
import { ColorsComponent } from './colors.component';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FlexLayoutModule,
    ColorsRoutingModule
  ],
  declarations: [ColorsComponent],
  providers: []
})

export class ColorsModule { }
