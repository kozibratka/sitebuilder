import {Component, NgZone, OnInit} from '@angular/core';
import {SystemInfoService} from "../../../core/services/system-info.service";
import {
  faChild, faClock,
  faDisplay, faGaugeHigh, faHourglass,
  faMobileScreen,
  faRocket, faSackDollar, faTicket, faUser
} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ApiFormService} from "../../../core/services/form/api-form.service";
import {ContactFormService} from "../../services/form/contact-form.service";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputFormErrorDirective} from "../../../core/directives/form-error/input-form-error/input-form-error.directive";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule,
    InputFormErrorDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  contactForm: FormGroup;
  contactFormSend = false;

  constructor(
    private ngZone: NgZone,
    public systemInfoService: SystemInfoService,
    private apiFormService: ApiFormService,
    contactFormService: ContactFormService,
  ) {
    this.contactForm = contactFormService.createForm();
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(args => {
      (window as any).particlesJSRun();
    });
  }

  onSubmit() {
    this.apiFormService.send('website_contact', this.contactForm).subscribe(value => {
      this.contactFormSend = true;
    })
  }

  protected readonly faMobileScreen = faMobileScreen;
  protected readonly faDisplay = faDisplay;
  protected readonly faGaugeHigh = faGaugeHigh;
  protected readonly faChild = faChild;
  protected readonly faRocket = faRocket;
  protected readonly faSackDollar = faSackDollar;
  protected readonly faClock = faClock;
  protected readonly faUser = faUser;
  protected readonly faTicket = faTicket;
}
