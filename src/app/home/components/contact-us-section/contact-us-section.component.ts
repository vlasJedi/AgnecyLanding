import { Component, OnInit } from '@angular/core';
import { BackdropService } from 'core/services/backdrop-service/backdrop.service';

@Component({
  selector: 'contact-us-section',
  templateUrl: './contact-us-section.component.html',
  styleUrls: ['./contact-us-section.component.scss']
})
export class ContactUsSectionComponent implements OnInit {

  constructor(private backdropService: BackdropService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.backdropService.activateBackdrop();
    alert("Contacts");
    this.backdropService.disableBackdrop();
  }

}
