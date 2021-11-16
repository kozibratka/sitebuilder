import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebInterface} from '../../../tools/interfaces/web-interface';
import {MatDialog} from '@angular/material/dialog';
import {RemoveWebDialogComponent} from './tools/components/remove-web-dialog/remove-web-dialog.component';
import {filter, switchMap} from 'rxjs/operators';
import {SymfonyApiClientService} from '../../../../../../shared/core/services/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../shared/core/services/http-response-toaster.service';
import {NotifierService} from '../../../../../../shared/core/services/notifier.service';
import {WebDetailResolverService} from '../../../tools/route-resolvers/web-detail-resolver.service';
import {AdministrationComponent} from '../../../administration.component';
import {WebListGuard} from '../../../tools/guards/web-list.guard';

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
    private administrationComponent: AdministrationComponent,
    public webListGuard: WebListGuard
  ) { }

  ngOnInit(): void {
    this.route.root.firstChild.data.subscribe(data => {
      this.dataToTable = data.webList;
    });
    this.displayedColumns = ['name', 'action'];
  }

  openRemoveWebDialog(webId: number): void {
    const dialogRef = this.dialog.open(RemoveWebDialogComponent);
    dialogRef.afterClosed().pipe(filter(value => {
        return value;
      }
      ),
      switchMap(value => {
        return this.symfonyApiClientService.get('web_remove', [webId]);
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
    this.webDetailResolverService.selectedId = id;
    this.administrationComponent.refreshSelectedWebSelectbox();
    this.router.navigate(['/admin']);
  }
}
