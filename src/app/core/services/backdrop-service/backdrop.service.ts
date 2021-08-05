import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  // this is root injector, so provider will give only singleton of the service
  providedIn: 'root'
})
export class BackdropService {

  private isBackdropActive: Boolean = false;
  private observable: Observable<Boolean> | null = null;
  // need more precise type
  private subscriber: Object | null = null;

  constructor() { }

  activateBackdrop() {
    if (!this.getIsBackdropActive()) this.isBackdropActive = true;
  }

  disableBackdrop() {
    if (this.getIsBackdropActive()) this.isBackdropActive = false;
  }

  getIsBackdropActive(): Boolean {
    return this.isBackdropActive;
  }

  getObservable() {
    if (!this.observable) this.observable = new Observable(subscriber => {});
  }
}
