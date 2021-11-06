import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BackdropService } from '../backdrop-service/backdrop.service';

export interface IDialogNotificator {
  getUpdater(): Subject<IDialogState>
}

export interface IDialogState {
  className?: string,
  isHidden?: boolean,
}

export interface IDialogService {
  show(): void,
  hide(): void
}

/**
 * This is world wide service to manage dialog resource
 * it provides also update for any component that will
 * act as 'dialog'
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService implements IDialogNotificator, IDialogService {
  private readonly updater: Subject<IDialogState> = new Subject();
  private isDialogVisible = false;

  constructor(private backdropService: BackdropService) { }

  getUpdater(): Subject<IDialogState> {
      return this.updater;
  }

  show() {
    this.isDialogVisible = true;
    this.updater.next({isHidden: false});
    this.backdropService.activateBackdrop();
  }

  hide() {
    this.isDialogVisible = true;
    this.updater.next({isHidden: true});
    this.backdropService.disableBackdrop();
  }
}
