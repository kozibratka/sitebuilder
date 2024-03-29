import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../interfaces/page-interface';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {filter, switchMap} from 'rxjs/operators';
import {RemovePageDialogComponent} from '../../components/remove-page-dialog/remove-page-dialog.component';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {Title} from '@angular/platform-browser';

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
    public title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Moje stránky');
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
        return this.symfonyApiClientService.get('page_remove', {id: pageId});
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
