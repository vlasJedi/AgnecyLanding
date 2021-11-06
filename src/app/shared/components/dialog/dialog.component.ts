import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IDialogNotificator, IDialogState } from 'core/services/dialog-service/dialog.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  private stateObject: IDialogState = {
    className: "dialog",
    isHidden: true
  };

  @Input()
  set className(val: string) {
    this.stateObject.className = val;
  }

  get className(): string {
    return this.stateObject.className;
  }

  constructor(private changeDet: ChangeDetectorRef, private dialogNotificator: IDialogNotificator) { 
    
  }

  ngOnInit(): void {
  }

  getIsHidden(): boolean {
    return this.stateObject.isHidden;
  }

}

