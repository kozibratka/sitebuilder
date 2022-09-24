import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {WebFormService} from './tools/forms/web-form.service';
import {SymfonyApiClientService} from '../../../../../../shared/core/services/api/symfony-api/symfony-api-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponseToasterService} from '../../../../../../shared/core/services/http-response-toaster.service';
import {NotifierService} from '../../../../../../shared/core/services/notifier.service';
import {WebInterface} from '../../../tools/interfaces/web-interface';
import {WebListResolverGuard} from '../../../tools/guards/web-list-resolver.service';

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
    public route: ActivatedRoute,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    public webListGuard: WebListResolverGuard
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'create') {
      this.createWeb();
    } else {
      this.updateWeb();
    }
  }

  createWeb(): void {
    this.createWebForm = this.webFormService.createForm();
    this.createWebForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.symfonyApiClientService.post('web_create', this.createWebForm.value).subscribe({
          next: () => {
            this.notifierService.notify('Web byl úspěšně vytvořen');
            this.router.navigate(['list'], { relativeTo: this.route.parent });
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
  }

  updateWeb(): void {
    const webDetail: WebInterface = this.route.snapshot.data.webDetail;
    this.createWebForm = this.webFormService.createForm();
    this.createWebForm.patchValue(webDetail);
    this.createWebForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.symfonyApiClientService.post('web_update', this.createWebForm.value, {id: webDetail.id}).subscribe({
          next: () => {
            this.notifierService.notify('Web byl úspěšně upraven');
            this.router.navigate(['list'], { relativeTo: this.route.parent });
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
  }
}
