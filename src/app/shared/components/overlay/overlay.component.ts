import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { BackdropService } from 'core/services/backdrop-service/backdrop.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements OnInit, OnDestroy {

  private eventEmitter: Subject<boolean> | null = null;
  private isVisible: boolean = false;
  @Input()
  test: string | null = null;

  constructor(private changeDetector: ChangeDetectorRef, private backdropService: BackdropService) { 
    this.eventEmitter = backdropService.getEventEmitter();
    this.eventEmitter.subscribe((isActive: boolean) => {
      this.isVisible = isActive;
      this.changeDetector.detectChanges();
    });
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
    this.eventEmitter?.unsubscribe();
  }

  getVisible(): boolean {
      return this.isVisible;
  }
}
