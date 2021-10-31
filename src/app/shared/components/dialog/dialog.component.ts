import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  private _className: string = "dialog";

  @Input()
  set className(val: string) {
    this._className = val;
  }

  get className(): string {
    return this._className;
  }

  constructor(private changeDet: ChangeDetectorRef) { 
    
  }

  ngOnInit(): void {
  }

  getIsHidden(): boolean {
    return false;
  }

}
