import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MenuPluginResolverService} from './tools/services/menu-plugin-resolver.service';
import {ActivatedRoute} from '@angular/router';
import {PageInterface} from '../tools/interfaces/page-interface';
import {SymfonyApiClientService} from '../../../../../../core/services/symfony-api/symfony-api-client.service';
import {NotifierService} from '../../../../../../core/services/notifier.service';
import {HttpResponseToasterService} from '../../../../../../core/services/http-response-toaster.service';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [
    MenuPluginResolverService
  ]
})
export class PageBuilderComponent implements OnInit, AfterViewInit {

  pageDetail: PageInterface;

  constructor(
    private route: ActivatedRoute,
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.pageDetail = this.route.snapshot.data.pageDetail as PageInterface;
  }

  save(): void {
    console.log(this.pageDetail);
    this.symfonyApiClientService.post('page_update', this.pageDetail, [this.pageDetail.id]).subscribe({
      next: () => {
        this.notifierService.notify('Úpravy byly úspěšně uloženy');
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }



}
