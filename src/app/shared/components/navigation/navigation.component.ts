import { Component, OnInit } from '@angular/core';
import { INavItem } from 'shared/models/nav-item.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navItems: INavItem[] | null = null
  // directly calling via this.onClickCall is not possible in template
  onClickCall: ((event: MouseEvent, navItem: INavItem) => void) | null = null

  constructor() {
    this.navItems = [
      { name: "home", path: "/home", displayName: "HOME"},
      { name: "about-us", path: "/about-us", displayName: "ABOUT US"},
      { name: "portfolio", path: "/portfolio", displayName: "PORTFOLIO"},
      { name: "contact", path: "/contact", displayName: "CONTACT"}
    ];
    this.onClickCall = () => {};
  }

  ngOnInit(): void {
  }

  trackByCall(i: number, navItem: INavItem) {
   return navItem.name;
  } 

  // wrap passed callback to the defined interface method
  onClick(event: MouseEvent, navItem: INavItem) {
    if (this.onClickCall == null) return;
    return this.onClickCall(event, navItem);
  }

}
