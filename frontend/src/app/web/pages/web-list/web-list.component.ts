import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
import {
  MatTableModule
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-web-list',
  standalone: true,
  templateUrl: './web-list.component.html',
  imports: [
    CommonModule,
    RouterLink,
    MatButton,
    MatTooltip,
    MatTableModule,
    MatIconModule
  ],
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
    public webListGuard: WebListResolverGuard,
    private layoutComponent: LayoutComponent,
    public title: Title,
    public webDetailResolverService: WebDetailResolverService,
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
        this.webListGuard.refreshWebList().subscribe(value => {
          this.dataToTable = [...this.webListGuard.webList];
        });
        },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

  switchToWeb(id: number): void {
    this.layoutComponent.refreshSelectedWebSelectbox();
    this.router.navigate(['/admin', id]);
  }
}
