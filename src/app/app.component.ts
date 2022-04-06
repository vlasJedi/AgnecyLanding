import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ApplicationRef, OnDestroy } from '@angular/core';
import { BackdropService } from 'core/services/backdrop-service/backdrop.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AppComponent implements OnDestroy {
  title = 'agnecylanding';
  private subBackDrop: Subscription | null = null;
  private isInteractive: boolean = true;

  constructor(
    private appRef: ApplicationRef, 
    private backdropService: BackdropService,
    private changeDet: ChangeDetectorRef
    ) {
      const eventEmitter = backdropService.getEventEmitter();
      this.subBackDrop = eventEmitter.subscribe((isActive: boolean) => {
        this.isInteractive = !isActive;
        this.changeDet.detectChanges();
    });
  }

  getStyle() {
    return {
      "not-interactive": !this.isInteractive
    };
  }

  ngOnDestroy() {
    this.subBackDrop?.unsubscribe();
  }

  onMouseWheel(event: Event) {
    if (!this.isInteractive) event.preventDefault();
  }

  onKey(event: KeyboardEvent) {
    if ((event.code === "ArrowUp" || event.code === "ArrowDown") && !this.isInteractive) event.preventDefault();
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isInteractive) event.preventDefault();
  }
}
