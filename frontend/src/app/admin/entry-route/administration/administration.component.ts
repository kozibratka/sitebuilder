import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginClientService} from '../../../core/services/login-client/login-client.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from '../../../core/services/symfony-api/tools/constants/event';
import {WebInterface} from './tools/interfaces/web-interface';
import {WebDetailResolverService} from './tools/route-resolvers/web-detail-resolver.service';
import {MatSelect} from '@angular/material/select';
import {WebListGuard} from './tools/guards/web-list.guard';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  @ViewChild(MatSelect, {static: true}) matSelect: MatSelect;
  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND, stopSendLogin: Event.POST_SEND};
  websSelect: WebInterface[] = [];
  private _selectedWeb: number;

  constructor(
    private route: ActivatedRoute,
    private loginClientService: LoginClientService,
    private notifierService: NotifierService,
    private router: Router,
    private webDetailResolverService: WebDetailResolverService,
    private webListGuard: WebListGuard
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
    this.webDetailResolverService.selectedId = value;
    this.router.navigate(['/admin']);
  }
}
