import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BackdropService } from '../backdrop-service/backdrop.service';

export interface IDialogNotificator {
  getUpdater(): Subject<IDialogContext>
}

export interface IDialogContext {
  header?: string
  className?: string,
  isHidden?: boolean,
  onCancelBtnClick?: () => void,
  onOkBtnClick?: () => void
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
  private readonly updater: Subject<IDialogContext> = new Subject();
  private isDialogVisible = false;

  constructor(private backdropService: BackdropService) { }

  getUpdater(): Subject<IDialogContext> {
      return this.updater;
  }

  show() {
    this.isDialogVisible = true;
    const that = this;
    this.updater.next({
      header: "Contact Us Form",
      isHidden: false,
      onCancelBtnClick: () => that.onCancelBtnClick(),
      onOkBtnClick: () => that.onCancelBtnClick()
    });
    this.backdropService.activateBackdrop();
  }

  hide() {
    this.isDialogVisible = true;
    this.updater.next({isHidden: true});
    this.backdropService.disableBackdrop();
  }

  onCancelBtnClick() {
    this.hide();
  }

  onOkBtnClick() {
    this.hide();
  }
}
