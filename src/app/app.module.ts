import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

document.body.addEventListener("beforeunload", (event) => console.log("**** Page is unloaded"));

@NgModule({
  // what this modules owns and creates comps, pipes and directives (except services)
  declarations: [
    AppComponent
  ],
  // Other modules whose exported classes are needed by component templates declared in this NgModule
  // imports recursiverely comps from specified modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule
  ],
  // exports - whate comps, dirs and pipes other module can use

  // Creators of services that this NgModule contributes to the global collection of services; 
  // they become accessible in all parts of the app

  // providedIn property - we have the new provideIn property for specifying where the dependencies can be provided.
  // It's officialy named Tree-shakable providers. Thanks to the providedIn property the service can 
  // specify where it can be provided without resorting to use the providers array of the module/component.
  // ervices can be provided in the root or in any of the available modules using any or a specific module. 
  // The root value is an alias for the AppModule, any is added starting with Angular 9
  providers: [],
  // The main application view, called the root component, which hosts all other app views. 
  // Only the root NgModule should set the bootstrap property.
  // Every Angular app has at least one module, the root module. You bootstrap that module to launch the application.
  bootstrap: [AppComponent]
})
export class AppModule { }
