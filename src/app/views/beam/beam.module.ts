import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeamRoute } from './beam.routing';

@NgModule({
    imports: [
        RouterModule.forChild(BeamRoute),
    ],
})
export class BeamModule { }

