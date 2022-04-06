import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { IDialogService } from 'core/services/dialog-service/dialog.service';
import { TDialogService } from 'app.module';
@Component({
  selector: 'contact-us-section',
  templateUrl: './contact-us-section.component.html',
  styleUrls: ['./contact-us-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsSectionComponent {

  constructor(@Inject(TDialogService) private readonly dialogService: IDialogService) { }

  onClick() {
    this.dialogService.show();
  }

}
