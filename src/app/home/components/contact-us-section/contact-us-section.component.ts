import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BackdropService } from 'core/services/backdrop-service/backdrop.service';

@Component({
  selector: 'contact-us-section',
  templateUrl: './contact-us-section.component.html',
  styleUrls: ['./contact-us-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsSectionComponent {

  constructor(private backdropService: BackdropService) { }

  onClick() {
    this.backdropService.activateBackdrop();
    setTimeout(() => this.backdropService.disableBackdrop(), 5000);
  }

}
