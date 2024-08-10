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
import {Title} from '@angular/platform-browser';
import {
  MatTableModule
} from "@angular/material/table";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {Layout2Component} from "../../../layout/components/layout2/layout2.component";

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
    MatIconModule,
    MatAnchor
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
    private layoutComponent: Layout2Component,
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
          if (webId == this.webDetailResolverService.selectedId && this.webListGuard.webList.length) {
            this.switchToWeb(this.webListGuard.webList[0].id, ['/admin', this.webListGuard.webList[0].id, 'web', 'list']);
          }
          this.dataToTable = [...this.webListGuard.webList];
        });
        },
    });
  }

  switchToWeb(id: number, url = null): void {
    localStorage.setItem('web', id.toString());
    this.layoutComponent.refreshSelectedWebSelectbox();
    this.router.navigate(url ?? ['/admin', id]);
  }
}
