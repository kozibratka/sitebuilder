import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  Router,
  RouterLink, RouterOutlet
} from '@angular/router';
import {LoginClientService} from '../../../authorization/services/login-client.service';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';
import {HiderElementDirective} from '../../../core/directives/hider-element.directive';
import {WebInterface} from '../../../web/interfaces/web-interface';
import {NotifierService} from '../../../core/services/notifier.service';
import {Event} from '../../../core/services/api/symfony-api/tools/constants/event';
import {Title} from '@angular/platform-browser';
import {filter, map} from "rxjs/operators";
import {UserService} from "../../../authorization/services/user.service";
import {WebListResolverGuard} from "../../../web/services/web-list-resolver.service";
import {MatSelect} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";
import {HidderComponent} from "../../../core/components/hidder/plain-hider/hidder.component";
import {MenuComponent} from "../menu/menu.component";
import {MatIcon} from "@angular/material/icon";
import {GravatarModule} from "ngx-gravatar";

@Component({
  selector: 'app-administration',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [
    MatProgressBar,
    RouterLink,
    HidderComponent,
    RouterOutlet,
    MenuComponent,
    MatIcon,
    GravatarModule,
  ],
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild(MatSelect, {static: true}) matSelect: MatSelect;
  @ViewChild(HiderElementDirective, {static: true}) hidder: HiderElementDirective;
  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND, stopSendLogin: Event.POST_SEND};
  websSelect: WebInterface[] = [];
  private _selectedWeb: number;
  isVisibleMenu = true;

  constructor(
    private route: ActivatedRoute,
    private loginClientService: LoginClientService,
    private notifierService: NotifierService,
    private router: Router,
    public webDetailResolverService: WebDetailResolverService,
    public title: Title,
    public userService: UserService,
    public webListResolverGuard: WebListResolverGuard,
  ) {
  }

  ngOnInit(): void {
    this.initSelectWeb(this.webListResolverGuard.webList);
    this.registerCheckVisibilityMenu();
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

  registerCheckVisibilityMenu() {
    let checkMenuDisplay = (url: string) => {
      this.isVisibleMenu = !url.includes('page-builder');
    };
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event) => this.router.url)
    ).subscribe(checkMenuDisplay);
    checkMenuDisplay(this.router.url);
  }
}
