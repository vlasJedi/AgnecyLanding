import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ApplicationRef, OnDestroy } from '@angular/core';
import { BackdropService } from 'core/services/backdrop-service/backdrop.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AppComponent implements OnDestroy {
  title = 'agnecylanding';
  private eventEmitter: Subject<boolean> | null = null;
  private isInteractive: boolean = true;

  constructor(private appRef: ApplicationRef, private backdropService: BackdropService) {
    this.eventEmitter = backdropService.getEventEmitter();
    this.eventEmitter.subscribe((isActive: boolean) => this.isInteractive = !isActive);
  }
  getStyle() {
    return {
      "not-interactive": !this.isInteractive
    };
  }

  ngOnDestroy() {
    this.eventEmitter?.unsubscribe();
  }
}
