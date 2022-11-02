import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {LoginClientService} from '../../../shared/core/services/api/login-api/login-client/login-client.service';
import {NotifierService} from '../../../shared/core/services/notifier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from '../../../shared/core/services/api/symfony-api/tools/constants/event';
import {WebInterface} from './tools/interfaces/web-interface';
import {WebDetailResolverService} from './tools/route-resolvers/web-detail-resolver.service';
import {MatSelect} from '@angular/material/select';
import {WebListResolverGuard} from './tools/guards/web-list-resolver.service';
import {EventEmitterService} from '../../../shared/core/services/event-emitter-service';
import {HiderElementDirective} from '../../../shared/core/directives/hider-element.directive';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  @ViewChild(MatSelect, {static: true}) matSelect: MatSelect;
  @ViewChild(HiderElementDirective, {static: true}) hidder: HiderElementDirective;
  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND, stopSendLogin: Event.POST_SEND};
  websSelect: WebInterface[] = [];
  private _selectedWeb: number;

  constructor(
    private route: ActivatedRoute,
    private loginClientService: LoginClientService,
    private notifierService: NotifierService,
    private router: Router,
    private webDetailResolverService: WebDetailResolverService,
    private webListGuard: WebListResolverGuard,
    private eventEmitterService: EventEmitterService<boolean>
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.initSelectWeb(data.webList);
    });
  }

  logout(): void {
    this.loginClientService.logout();
    this.notifierService.notify('Byl jste úspěšně odhlášen', 'success');
    this.router.navigate(['/authorization/login']);
  }

  refreshSelectedWebSelectbox(): void {
    this._selectedWeb = this.webDetailResolverService.selectedId;
  }

  private initSelectWeb(webs: WebInterface[]): void {
    this.websSelect = webs;
    if (!this._selectedWeb && this.websSelect.length) {
      this._selectedWeb = this.websSelect[0].id;
    }
  }


  get selectedWeb(): number {
    return this._selectedWeb;
  }

  set selectedWeb(value: number) {
    if (value === 0) {
      this.matSelect.value = this._selectedWeb;
      return;
    }
    this._selectedWeb = value;
    this.router.navigate(['/admin', value]);
  }
}
