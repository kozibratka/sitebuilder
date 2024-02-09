import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebInterface} from '../../interfaces/web-interface';
import {MatDialog} from '@angular/material/dialog';
import {RemoveWebDialogComponent} from '../../components/remove-web-dialog/remove-web-dialog.component';
import {filter, switchMap} from 'rxjs/operators';
import {WebDetailResolverService} from '../../services/web-detail-resolver.service';
import {WebListResolverGuard} from '../../services/web-list-resolver.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {LayoutComponent} from '../../../layout/components/layout/layout.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-web-list',
  templateUrl: './web-list.component.html',
  styleUrls: ['./web-list.component.css']
})
export class WebListComponent implements OnInit {

  displayedColumns: string[];
  dataToTable: WebInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private notifierService: NotifierService,
    private router: Router,
    private webDetailResolverService: WebDetailResolverService,
    public webListGuard: WebListResolverGuard,
    private layoutComponent: LayoutComponent,
    public title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Moje weby');
    this.dataToTable = this.webListGuard.webList;
    this.displayedColumns = ['name', 'action'];
  }

  openRemoveWebDialog(webId: number): void {
    const dialogRef = this.dialog.open(RemoveWebDialogComponent);
    dialogRef.afterClosed().pipe(filter(value => {
        return value;
      }
      ),
      switchMap(value => {
        return this.symfonyApiClientService.get('web_remove', {id: webId});
      })
    ).subscribe({
      next: () => {
        this.notifierService.notify('Web byl úspěšně smazán');
        this.router.navigate(['./'], { relativeTo: this.route });
        },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

  switchToWeb(id: number): void {
    this.layoutComponent.refreshSelectedWebSelectbox();
    this.router.navigate(['/admin', id]);
  }
}
