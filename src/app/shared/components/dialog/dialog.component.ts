import { ChangeDetectionStrategy, ChangeDetectorRef, Component, 
  Input, OnInit, Inject } from '@angular/core';

import { IDialogNotificator, IDialogContext } from 'core/services/dialog-service/dialog.service';
import { TDialogNotificator } from 'app.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  private static readonly DEFAULT_CLASS_NAME = "dialog";
  private stateObject: IDialogContext = {
    className: DialogComponent.DEFAULT_CLASS_NAME,
    isHidden: true
  };
  private subscription: Subscription | undefined; 

  @Input()
  set className(val: string | undefined) {
    this.stateObject.className = val;
  }

  get className(): string {
    return this.stateObject.className || DialogComponent.DEFAULT_CLASS_NAME;
  }

  constructor(
    private changeDet: ChangeDetectorRef,
    // inject concrete implementation of data and state provider 
    @Inject(TDialogNotificator) private readonly dialogNotificator: IDialogNotificator) {     
  }

  ngOnInit(): void {
    this.subscription = this.dialogNotificator.getUpdater().subscribe(update => {
      this.stateObject = Object.assign(this.stateObject, update);
      this.changeDet.detectChanges();
    });
  }

  getIsHidden(): boolean | undefined {
    return this.stateObject.isHidden;
  }

  onOkBtnClick() {
    this.stateObject.onOkBtnClick?.();
  }

  onCancelBtnClick() {
    this.stateObject.onCancelBtnClick?.();
  }

}

