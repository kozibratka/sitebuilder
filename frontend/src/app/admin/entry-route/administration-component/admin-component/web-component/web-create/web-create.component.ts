import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {WebFormService} from './tools/forms/web-form.service';
import {SymfonyApiClientService} from '../../../../../../core/services/symfony-api/symfony-api-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponseToasterService} from '../../../../../../core/services/http-response-toaster.service';
import {NotifierService} from '../../../../../../core/services/notifier.service';

@Component({
  selector: 'app-web-create',
  templateUrl: './web-create.component.html',
  styleUrls: ['./web-create.component.css']
})
export class WebCreateComponent implements OnInit {

  createWebForm: FormGroup;

  constructor(
    private webFormService: WebFormService,
    private symfonyApiClientService: SymfonyApiClientService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService
  ) {
    this.createWebForm = this.webFormService.createForm();
    this.createWebForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        symfonyApiClientService.post('web_create', this.createWebForm.value).subscribe({
          next: () => {
            this.notifierService.notify('Web byl úspěšně vytvořen');
            this.router.navigate(['../list'], { relativeTo: this.route });
            },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
