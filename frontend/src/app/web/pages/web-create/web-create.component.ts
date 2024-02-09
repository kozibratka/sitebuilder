import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {WebFormService} from '../../services/web-form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WebInterface} from '../../interfaces/web-interface';
import {WebListResolverGuard} from '../../services/web-list-resolver.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {Title} from '@angular/platform-browser';
import {UserService} from "../../../authorization/services/user.service";
import {WebDetailResolverService} from "../../services/web-detail-resolver.service";
import {forkJoin} from "rxjs";

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
    public webListGuard: WebListResolverGuard,
    public title: Title,
    public userService: UserService,
    private webDetail: WebDetailResolverService,
    private webDetailResolverService: WebDetailResolverService,
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'create') {
      this.title.setTitle('Vytvoření webu');
      this.createWeb();
    } else {
      this.title.setTitle('Úprava webu');
      this.updateWeb();
    }
  }

  createWeb(): void {
    this.createWebForm = this.webFormService.createForm({path: 'web_create', options: {allowTemplate: this.userService.hasRole('ROLE_ADMIN')}});
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
    const webDetail = this.webDetail.webDetail;
    this.createWebForm = this.webFormService.createForm({path: 'web_update', querySegment: {id: webDetail.id}, options: {allowTemplate: this.userService.hasRole('ROLE_ADMIN')}});
    console.log(webDetail)
    this.createWebForm.patchValue(webDetail);
    this.createWebForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.symfonyApiClientService.post('web_update', this.createWebForm.value, {id: webDetail.id}).subscribe({
          next: (value) => {
            forkJoin(this.webListGuard.refreshWebList(webDetail.id), this.webDetailResolverService.resolver$).subscribe(value1 => {
              this.notifierService.notify('Web byl úspěšně upraven');
              this.router.navigate(['list'], { relativeTo: this.route.parent });
            });
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
  }
}
