import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxStripeModule } from 'ngx-stripe';

import { BeamWizardComponent } from './beam-wizard/beam-wizard.component';

import { BeamRoute } from './beam.routing';
import { BeamComponent } from './beam.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatStepperModule,
        FlexLayoutModule,
        MatGridListModule,
        QuillModule,
        NgxDatatableModule,
        FileUploadModule,
        NgxStripeModule.forChild('pk_test_51Jb71AJHp287mdDjNJtSeWnkwDMwiAWOxclU4MW0jazPzzRzqFLiaSuNBVF4wCzJ2R4vrsnBZJ49quMAxUi1RI81001eIaSrSQ'),
        RouterModule.forChild(BeamRoute),
    ],
    declarations: [BeamWizardComponent, BeamComponent, CheckoutComponent]
})

export class BeamModule { }
