import { Component, OnInit, ChangeDetectorRef, OnDestroy, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { INavItem } from 'shared/models/nav-item.model';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @ViewChild("targetWrapOverflowed") targetToCheckWrap: ElementRef | null = null;

  navItems: INavItem[] | null = null
  // directly calling via this.onClickCall is not possible in template
  onClickCall: ((event: MouseEvent, navItem: INavItem) => void) | null = null

  private mobileNavEnabled: boolean = false
  private isMobileNavMenuOpened: boolean = false

  private resizeSubscription: Subscription | null = null

  public isChildViewsInit: boolean = false;
  
  // no bindings at the moment populated
  constructor(private changeRef: ChangeDetectorRef, public element: ElementRef) {
    this.navItems = [
      { name: "home", path: "/home", displayName: "HOME"},
      { name: "about-us", path: "/about-us", displayName: "ABOUT US"},
      { name: "portfolio", path: "/portfolio", displayName: "PORTFOLIO"},
      { name: "contact", path: "/contact", displayName: "CONTACT"},
      { name: "test1", path: "/home", displayName: "TESTTESTEST1"},
      { name: "test2", path: "/home", displayName: "TESTTESTEST2"},
    ];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
      this.resizeSubscription = null;
    }
  }

  ngAfterViewInit() {
    // this updates happens in the moment of initial detect changes cycle,
    // so if we update some bindings we need schedule/ask to run once again change detection
    // so consumers of the binding can see it in correct way
    this.isChildViewsInit = true;
    this.changeRef.detectChanges();
  }

  trackByCall(i: number, navItem: INavItem) {
   return navItem.name;
  } 

  // wrap passed callback to the defined interface method
  onClick(event: MouseEvent, navItem: INavItem) {
    if (this.onClickCall == null) return false;
    return this.onClickCall(event, navItem);
  }

  isMobileNavMenuNotCollapsed(): boolean {
    return this.isMobileNavMenuOpened;
  }

  toggleMobileNavMenu() {
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
    return this.mobileNavEnabled;
  }

  getNavContainerStyle() {
    return {
      "nav-container": true,
      "nav-container__mobile": this.isMobileNavEnabled()
    };
  }

  onItemsHorizontallyWrapped() {
    this.mobileNavEnabled = true;
  }

  onItemsHorizontallyUnWrapped() {
    this.isMobileNavMenuOpened = false;
    this.mobileNavEnabled = false;
  }

  getTargetForWrapCheck() {
    return this.targetToCheckWrap;
  }
}
