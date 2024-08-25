import {AfterViewInit, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {SystemInfoService} from "../../../core/services/system-info.service";
import {NewsletterFormService} from "../../services/form/newsletter-form.service";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApiFormService} from "../../../core/services/form/api-form.service";
import {InputFormErrorDirective} from "../../../core/directives/form-error/input-form-error/input-form-error.directive";

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    InputFormErrorDirective
  ],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent implements AfterViewInit{
  @ViewChild('responsiveMenuIcon', {static: true}) responsiveMenuIcon: ElementRef;
  routeChanged = false;
  newsletterForm?: FormGroup;
  isResponsiveMenuOpen = false;

  constructor(
    private ngZone: NgZone,
    public systemInfoService: SystemInfoService,
    private newsletterFormService: NewsletterFormService,
    private apiFormService: ApiFormService,
  ) {
    this.newsletterForm = this.newsletterFormService.createForm();
  }

  ngAfterViewInit(): void {
    (window as any).initMenuJs();
  }

  routeActivate() {
    this.ngZone.runOutsideAngular(args => {
      (window as any).initMainJs();
    });
  }

  onSubmit() {
    this.apiFormService.send('website_newsletter', this.newsletterForm).subscribe(value => {
      this.newsletterForm = null;
    });
  }
}
