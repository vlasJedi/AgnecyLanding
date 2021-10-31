import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { OverflowedDirective } from './directives/overflowed.directive';
import { OverlayComponent } from './components/overlay/overlay.component';
import { DialogComponent } from './components/dialog/dialog.component';



@NgModule({
  declarations: [NavigationComponent, OverflowedDirective, OverlayComponent, DialogComponent],
  imports: [
    // this router need to be imported as it contains definition for routerLink directive
    CommonModule, RouterModule
  ],
  exports: [NavigationComponent, OverlayComponent, DialogComponent]
})
export class SharedModule { }
