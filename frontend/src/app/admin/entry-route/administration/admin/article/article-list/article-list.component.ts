import { Component, OnInit } from '@angular/core';
import {ArticleInterface} from '../tools/interfaces/article-interface';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SymfonyApiClientService} from '../../../../../../shared/core/services/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../shared/core/services/http-response-toaster.service';
import {NotifierService} from '../../../../../../shared/core/services/notifier.service';
import {RemovePageDialogComponent} from '../../page/page-list/tools/components/remove-page-dialog/remove-page-dialog.component';
import {filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  dataToTable: ArticleInterface[] = [];
  displayedColumns: string[];

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
      this.dataToTable = data.articleList;
    });
    this.displayedColumns = ['name', 'action'];
  }

  openRemoveWebDialog(articleId: number): void {
    const dialogRef = this.dialog.open(RemovePageDialogComponent);
    dialogRef.afterClosed().pipe(filter(value => {
        return value;
      }
      ),
      switchMap(value => {
        return this.symfonyApiClientService.get('article_remove', [articleId]);
      })
    ).subscribe({
      next: () => {
        this.notifierService.notify('Článek byl úspěšně smazán');
        this.router.navigate(['./'], { relativeTo: this.route });
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

}
