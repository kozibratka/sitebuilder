import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SymfonyApiClientService} from '../../../../../../../core/services/symfony-api/symfony-api-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from '../../../../../../../core/services/notifier.service';
import {HttpResponseToasterService} from '../../../../../../../core/services/http-response-toaster.service';
import {PageFormService} from './tools/forms/page-form.service';
import {WebInterface} from '../../../../tools/interfaces/web-interface';
import {WebDetailResolverService} from '../../../../tools/route-resolvers/web-detail-resolver.service';

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.css']
})
export class PageCreateComponent implements OnInit {

  createPageForm: FormGroup;
  webId: string;

  constructor(
    private pageFormService: PageFormService,
    private symfonyApiClientService: SymfonyApiClientService,
    private router: Router,
    public route: ActivatedRoute,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'create') {
      this.createPage();
    } else {
      this.updatePage();
    }
  }

  createPage(): void {
    this.createPageForm = this.pageFormService.createForm([this.webDetailResolverService.selectedId]);
    this.createPageForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.symfonyApiClientService.post('page_create', this.createPageForm.value, [this.webDetailResolverService.selectedId]).subscribe({
          next: () => {
            this.notifierService.notify('Stránka byla úspěšně vytvořena');
            this.router.navigate(['list'], { relativeTo: this.route.parent });
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
  }

  updatePage(): void {
    const pageDetail: WebInterface = this.route.snapshot.data.pageDetail;
    this.createPageForm = this.pageFormService.createForm([this.webDetailResolverService.selectedId]);
    this.createPageForm.patchValue(pageDetail);
    this.createPageForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.symfonyApiClientService.post('page_update', this.createPageForm.value, [pageDetail.id]).subscribe({
          next: () => {
            this.notifierService.notify('Stránka byla úspěšně upravena');
            this.router.navigate(['list'], { relativeTo: this.route.parent });
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
  }

}
