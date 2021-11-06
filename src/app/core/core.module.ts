import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { IDialogNotificator, DialogService } from './services/dialog-service/dialog.service';

/*

  Provide in core module implementations of different services
  by usage Inteface + Injection token


*/
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Provide concrete Instances for all Interfaces
    {
      provide: new InjectionToken<IDialogNotificator>("IDialogNotificator"),
      useClass: DialogService
    }
  ]
})
export class CoreModule { }
