import {AfterViewInit, Component, NgZone} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {SystemInfoService} from "../../../core/services/system-info.service";

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent implements AfterViewInit{
  routeChanged = false;

  constructor(
    private ngZone: NgZone,
    public systemInfoService: SystemInfoService
  ) {
  }

  ngAfterViewInit(): void {

  }

  routeActivate() {
    this.ngZone.runOutsideAngular(args => {
      (window as any).initMainJs();
    });
  }
}
