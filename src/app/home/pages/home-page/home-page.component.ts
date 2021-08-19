import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

  constructor(private changeDetector: ChangeDetectorRef) { 
    requestAnimationFrame(() => changeDetector.detectChanges());
  }

  ngOnInit(): void {
  }

  isVisible(): boolean {
    return true;
  }

}
