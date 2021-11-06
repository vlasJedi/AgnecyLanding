import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import { HomeModule } from './home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogService } from 'core/services/dialog-service/dialog.service'; 
import { BackdropService } from 'core/services/backdrop-service/backdrop.service';
import { IDialogNotificator, IDialogService } from 'core/services/dialog-service/dialog.service';

document.body.addEventListener("beforeunload", (event) => console.log("**** Page is unloaded"));

/*
  Provide in core module implementations of different services
  by usage Inteface + Injection token
*/

export const TDialogNotificator = new InjectionToken<IDialogNotificator>("IDialogNotificator");
export const TDialogService = new InjectionToken<IDialogService>("IDialogService");
@NgModule({
  // what this modules owns and creates comps, pipes and directives (except services)
  declarations: [
    AppComponent
  ],
  // Other modules whose exported classes are needed by component templates declared in this NgModule
  // imports recursiverely comps from specified modules
  // all these providers will be merged to root injector
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule
  ],
  // exports - whate comps, dirs and pipes other module can use

  // Creators of services that this NgModule contributes to the global collection of services; 
  // they become accessible in all parts of the app as part of root injector

  // providedIn property - we have the new provideIn property for specifying where the dependencies can be provided.
  // It's officialy named Tree-shakable providers. Thanks to the providedIn property the service can 
  // specify where it can be provided without resorting to use the providers array of the module/component.
  // services can be provided in the root or in any of the available modules using any or a specific module.
  // NOTE: If component will try import such service most probably there will be circular dependency
  // component > service > module > component 
  // The root value is an alias for the AppModule, any is added starting with Angular 9
  providers: [
    {
      // injection token
      provide: TDialogNotificator,
      // can be simplified to useClass, but it is just for use case understanding
      // service provider factory to do some preparation for service in scope of the module
      useFactory: (backdropService: BackdropService) => new DialogService(backdropService),
      // dependencies will be injected as args
      deps: [BackdropService]
    },
    {
      provide: TDialogService,
      useExisting: TDialogNotificator
    }
  ],
  // The main application view, called the root component, which hosts all other app views. 
  // Only the root NgModule should set the bootstrap property.
  // Every Angular app has at least one module, the root module. You bootstrap that module to launch the application.
  bootstrap: [AppComponent]
})
export class AppModule { }
