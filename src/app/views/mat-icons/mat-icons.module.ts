import { NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


import { MatIconsComponent } from './mat-icons.component';
import { MatIconsRoutes } from "./mat-icons.routing";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule.forChild(MatIconsRoutes)
  ],
  declarations: [MatIconsComponent]
})
export class MatIconsModule {

   /**
     * Constructor
     *
     * @param {DomSanitizer} _domSanitizer
     * @param {MatIconRegistry} _matIconRegistry
     * @param parentModule
     */

  constructor(
    private _domSanitizer: DomSanitizer,
    private _matIconRegistry: MatIconRegistry,
    @Optional() @SkipSelf() parentModule?: MatIconsModule
)
{
    // Do not allow multiple injections
    if ( parentModule )
    {
        throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }

    // Register icon sets
    this._matIconRegistry.addSvgIconSet(this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-twotone.svg'));
;
}
}
 
