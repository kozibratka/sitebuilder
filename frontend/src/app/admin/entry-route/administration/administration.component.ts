import {Component, OnInit} from '@angular/core';
import {LoginClientService} from '../../../core/services/login-client/login-client.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from '../../../core/services/symfony-api/tools/constants/event';
import {WebInterface} from './tools/interfaces/web-interface';
import {WebDetailResolverService} from './tools/route-resolvers/web-detail-resolver.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND, stopSendLogin: Event.POST_SEND};
  websSelect: WebInterface[] = [];
  selectedWeb: number;

  constructor(
    private route: ActivatedRoute,
    private loginClientService: LoginClientService,
    private notifierService: NotifierService,
    private router: Router,
    private webDetailResolverService: WebDetailResolverService
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

  private initSelectWeb(webs: WebInterface[]): void {
    this.websSelect = webs;
    if (!this.selectedWeb) {
      this.selectedWeb = this.websSelect[0].id;
      this.webDetailResolverService.selectedId = this.selectedWeb;
    }
  }
}
