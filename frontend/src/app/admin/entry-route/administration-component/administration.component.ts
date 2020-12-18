import {Component, OnInit} from '@angular/core';
import {LoginClientService} from '../../../core/services/login-client/login-client.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {Router} from '@angular/router';
import {Event} from '../../../core/services/symfony-api/tools/constants/event';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND, stopSendLogin: Event.POST_SEND};

  constructor(
    private loginClientService: LoginClientService,
    private notifierService: NotifierService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginClientService.logout();
    this.notifierService.notify('Byl jste úspěšně odhlášen', 'success');
    this.route.navigate(['/authorization/login']);
  }

}
