import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageFormService} from '../../services/page-form.service';
import {WebInterface} from '../../../web/interfaces/web-interface';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {Title} from '@angular/platform-browser';
import {ApiFormService} from "../../../core/services/form/api-form.service";

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.css']
})
export class PageCreateComponent implements OnInit {

  createPageForm: FormGroup;
  webId: string;
  pageName: string;
  urlPage: string;

  constructor(
    private pageFormService: PageFormService,
    private symfonyApiClientService: SymfonyApiClientService,
    private router: Router,
    public route: ActivatedRoute,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService,
    public title: Title,
    private apiFormService: ApiFormService,
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Vytvoření stránky');
    if (this.route.snapshot.url[0].path === 'create') {
      this.createPage();
    } else {
      this.updatePage();
    }
  }

  createPage(): void {
    this.createPageForm = this.pageFormService.createForm();
    this.createPageForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.apiFormService.send('page_create', this.createPageForm, {id: this.webDetailResolverService.selectedId}).subscribe(
          {
            next: () => {
              this.notifierService.notify('Stránka byla úspěšně vytvořena');
              this.router.navigate(['list'], {relativeTo: this.route.parent});
            },
            error: err => this.httpResponseToasterService.showError(err)
          }
        );
      }
    });
  }

  updatePage(): void {
    const pageDetail = this.route.snapshot.data.pageDetail;
    this.createPageForm = this.pageFormService.createForm();
    this.createPageForm.patchValue(pageDetail);
    this.createPageForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.apiFormService.send('page_update_page', this.createPageForm, {id: pageDetail.id}).subscribe(
          {
            next: () => {
              this.notifierService.notify('Stránka byla úspěšně upravena');
              this.router.navigate(['list'], {relativeTo: this.route.parent});
            },
            error: err => this.httpResponseToasterService.showError(err)
          }
        );
      }
    })
  }

  refreshUrlInput(event: Event) {
    const pageName = (event.target as HTMLInputElement).value;
    this.createPageForm.patchValue({url: pageName.replaceAll(' ', '-').toLowerCase()}, {emitEvent: false});
  }

}
