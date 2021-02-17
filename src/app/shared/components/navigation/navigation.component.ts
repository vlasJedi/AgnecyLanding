import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  private isMobileNavMenuOpened: boolean = false

  private wasTouched: boolean = false

  constructor(private changeRef: ChangeDetectorRef) {
    this.navItems = [
      { name: "home", path: "/home", displayName: "HOME"},
      { name: "about-us", path: "/about-us", displayName: "ABOUT US"},
      { name: "portfolio", path: "/portfolio", displayName: "PORTFOLIO"},
      { name: "contact", path: "/contact", displayName: "CONTACT"}
    ];
    this.onClickCall = () => {};
    window.onresize = () => {
      changeRef.detectChanges();
    };
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

  isMobileNavMenuNotCollapsed(): boolean {
    return this.isMobileNavMenuOpened;
  }

  isNavMobileLinksContainerVisible(): boolean {
    return this.wasTouched;
  }

  toggleMobileNavMenu() {
    if (!this.wasTouched) this.wasTouched = true;
    this.isMobileNavMenuOpened = !this.isMobileNavMenuNotCollapsed();
  }

  getMobileNavLinkStyle() {
    const isMobileNavOpened = this.isMobileNavMenuNotCollapsed();
    return {
      "nav-mobile-uncollapsed": isMobileNavOpened, 
      "nav-mobile-collapsed": !isMobileNavOpened
    }
  }

  isMobileNavEnabled(): boolean {
    return window.innerWidth < 500;
  }

  getNavContainerStyle() {
    return {
      "nav-container": true,
      "nav-container__mobile": this.isMobileNavEnabled()
    };
  }

}
