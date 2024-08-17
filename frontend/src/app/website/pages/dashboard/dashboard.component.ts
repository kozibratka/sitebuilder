import {Component, NgZone, OnInit} from '@angular/core';
import {SystemInfoService} from "../../../core/services/system-info.service";
import {
  faChild,
  faDisplay, faGaugeHigh,
  faMobile,
  faMobileButton,
  faMobilePhone,
  faMobileScreen,
  faPlus, faRocket, faSackDollar
} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(
    private ngZone: NgZone,
    public systemInfoService: SystemInfoService
  ) {
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(args => {
      (window as any).particlesJSRun();
    });
  }

  protected readonly faMobileScreen = faMobileScreen;
  protected readonly faDisplay = faDisplay;
  protected readonly faGaugeHigh = faGaugeHigh;
  protected readonly faChild = faChild;
  protected readonly faRocket = faRocket;
  protected readonly faSackDollar = faSackDollar;
}
