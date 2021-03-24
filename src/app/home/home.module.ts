import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { ContactUsSectionComponent } from './components/contact-us-section/contact-us-section.component';



@NgModule({
  declarations: [HomePageComponent, ContactUsSectionComponent],
  imports: [
    CommonModule, SharedModule, HomePageRoutingModule // need to pass routes inside module
  ]
})
export class HomeModule { }
