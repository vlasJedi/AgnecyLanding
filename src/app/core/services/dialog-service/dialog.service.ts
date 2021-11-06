import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface IDialogNotificator {
  getUpdater(): Subject<IDialogState>
}

export interface IDialogState {
  className?: string,
  isHidden?: boolean,
}

/**
 * This is world wide service to manage dialog resource
 * it provides also update for any component that will
 * act as 'dialog'
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService implements IDialogNotificator {
  private readonly updater: Subject<IDialogState> = new Subject();
  private isDialogVisible = false;

  constructor() { }

  getUpdater(): Subject<IDialogState> {
      return this.updater;
  }

  show() {
    this.isDialogVisible = true;
    this.updater.next({isHidden: false});
  }

  hide() {
    this.isDialogVisible = true;
    this.updater.next({isHidden: true});
  }
}
