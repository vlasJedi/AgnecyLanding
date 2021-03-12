import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { OverflowedDirective } from './directives/overflowed.directive';



@NgModule({
  declarations: [NavigationComponent, OverflowedDirective],
  imports: [
    // this router need to be imported as it contains definition for routerLink directive
    CommonModule, RouterModule
  ],
  exports: [NavigationComponent]
})
export class SharedModule { }
