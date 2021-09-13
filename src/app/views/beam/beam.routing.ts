import { Routes } from '@angular/router';
import { BeamWizardComponent } from './beam-wizard/beam-wizard.component';

export const BeamRoute: Routes = [
    {
        path: '',
        component: BeamWizardComponent,
        data: { title: 'Wizard', breadcrumb: 'WIZARD' }
    },
];
