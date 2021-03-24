import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-us-section',
  templateUrl: './contact-us-section.component.html',
  styleUrls: ['./contact-us-section.component.scss']
})
export class ContactUsSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    alert("Contacts");
  }

}
