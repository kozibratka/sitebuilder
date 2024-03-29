import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {RemoveDialogComponent} from '../../components/remove-dialog/remove-dialog.component';
import {NotifierService} from '../../../core/services/notifier.service';
import {BasePlugConfigInterface} from '../../../plugins/interfaces/base-plug-config-interface';

@Component({
  selector: 'app-list',
  templateUrl: './list-created.component.html',
  styleUrls: ['./list-created.component.css']
})
export class ListCreatedComponent implements OnInit {
  createdPlugins: BasePlugConfigInterface[] = [];
  displayedColumns = ['name', 'action'];
  pluginResolver: AbstractPluginResolver<any>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(AbstractPluginResolver) private abstractMenuPluginResolvers: AbstractPluginResolver<any>[],
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('identifier');
      this.pluginResolver = this.abstractMenuPluginResolvers.filter(value => value.identifier === identifier)[0];
    });
    this.route.data.subscribe((data) => {
      this.createdPlugins = data.plugins;
    });
  }

  openRemoveWebDialog(pluginSettings: BasePlugConfigInterface): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {data: {name: this.pluginResolver.name}});
    dialogRef.afterClosed().pipe(filter(value => {
          return value;
        }
      ),
      switchMap(value => {
        return this.symfonyApiClientService.get('plugin_remove', {id: pluginSettings.id});
      })
    ).subscribe({
      next: () => {
        this.notifierService.notify('Váš vytvořený plugin byl úspěšně smazán');
        this.router.navigate(['./'], { relativeTo: this.route });
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }


}
