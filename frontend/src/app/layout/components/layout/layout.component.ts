import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelect} from '@angular/material/select';
import {LoginClientService} from '../../../core/services/api/login-api/login-client/login-client.service';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';
import {HiderElementDirective} from '../../../core/directives/hider-element.directive';
import {WebInterface} from '../../../web/interfaces/web-interface';
import {NotifierService} from '../../../core/services/notifier.service';
import {Event} from '../../../core/services/api/symfony-api/tools/constants/event';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-administration',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

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
    public title: Title
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
