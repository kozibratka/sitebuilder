import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {WebFormService} from '../../services/web-form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WebInterface} from '../../interfaces/web-interface';
import {WebListResolverGuard} from '../../services/web-list-resolver.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {NotifierService} from '../../../core/services/notifier.service';

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
    this.createWebForm = this.webFormService.createForm({path: 'web_create'});
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
    this.createWebForm = this.webFormService.createForm({path: 'web_create', querySegment: {id: webDetail.id}});
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
