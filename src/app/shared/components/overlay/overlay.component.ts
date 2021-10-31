import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { BackdropService } from 'core/services/backdrop-service/backdrop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;
  private isVisible: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef, private backdropService: BackdropService) { 
    // this is just ref to observable
    const eventEmitter = backdropService.getEventEmitter();
    // get subscription object to unsub in case of destroy
    this.subscription = eventEmitter.subscribe((isActive: boolean) => {
      this.isVisible = isActive;
      this.changeDetector.detectChanges();
    });
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getVisible(): boolean {
      return this.isVisible;
  }
}
