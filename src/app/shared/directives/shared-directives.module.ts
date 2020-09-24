import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontSizeDirective } from './font-size.directive';
import { ScrollToDirective } from './scroll-to.directive';
import { AppDropdownDirective } from './dropdown.directive';
import { DropdownAnchorDirective } from './dropdown-anchor.directive';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { marcoSideNavToggleDirective } from './marco-side-nav-toggle.directive';
import { marcoSidenavHelperDirective, marcoSidenavTogglerDirective } from './marco-sidenav-helper/marco-sidenav-helper.directive';
import { marcoHighlightDirective } from './marco-highlight.directive';


const directives = [
  FontSizeDirective,
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  marcoSideNavToggleDirective,
  marcoSidenavHelperDirective,
  marcoSidenavTogglerDirective,
  marcoHighlightDirective
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule {}