import { Component, OnInit } from '@angular/core';
import {PageInterface} from './tools/interfaces/page-interface';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SymfonyApiClientService} from '../../../../../../core/services/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../core/services/http-response-toaster.service';
import {NotifierService} from '../../../../../../core/services/notifier.service';
import {filter, switchMap} from 'rxjs/operators';
import {RemovePageDialogComponent} from './tools/components/remove-page-dialog/remove-page-dialog.component';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  displayedColumns: string[];
  dataToTable: PageInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dataToTable = data.pageList;
    });
    this.displayedColumns = ['name', 'action'];
  }

  openRemoveWebDialog(pageId: number): void {
    const dialogRef = this.dialog.open(RemovePageDialogComponent);
    dialogRef.afterClosed().pipe(filter(value => {
        return value;
      }
      ),
      switchMap(value => {
        return this.symfonyApiClientService.get('page_remove', [pageId]);
      })
    ).subscribe({
      next: () => {
        this.notifierService.notify('Stránka byla úspěšně smazána');
        this.router.navigate(['./'], { relativeTo: this.route });
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

}
