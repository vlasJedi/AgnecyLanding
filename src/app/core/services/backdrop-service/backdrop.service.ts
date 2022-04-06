import { Injectable } from '@angular/core';
// the best way to push events to several subscribers so acts as observable-broadcaster
import { Subject } from 'rxjs';

@Injectable({
  // this is root injector, so provider will give only singleton of the service
  providedIn: 'root'
})
export class BackdropService {

  private static readonly NOT_INTERACT = "not-interactive";
  private isBackdropActive: boolean = false;
  private eventEmitter: Subject<boolean> = new Subject();

  constructor() { }

  activateBackdrop() {
    this.updateBackdrop(true);
  }

  disableBackdrop() {
    this.updateBackdrop(false);
  }

  private updateBackdrop(isActive: boolean): void {
    this.isBackdropActive = isActive;
    this.eventEmitter.next(this.isBackdropActive);
  } 

  getIsBackdropActive(): boolean {
    return this.isBackdropActive;
  }

  getEventEmitter(): Subject<boolean> {
    return this.eventEmitter;
  }
  
}
