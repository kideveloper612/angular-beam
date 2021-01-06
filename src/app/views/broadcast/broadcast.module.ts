import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BroadcastRoutes } from './broadcast.routing';
import { BroadcastComponent } from './broadcast.component';
import { BroadCastComposeComponent } from './broadcast-compose.component';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    QuillModule,
    SharedPipesModule,
    MatChipsModule,
    RouterModule.forChild(BroadcastRoutes)
  ],
  declarations: [BroadcastComponent, BroadCastComposeComponent],
  entryComponents: [BroadCastComposeComponent]
})
export class BroadcastModule { }
