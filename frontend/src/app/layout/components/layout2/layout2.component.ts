import {Component, ViewChild} from '@angular/core';
import {
  faBell,
  faFile,
  faFileCode,
  faFolder,
  faGlobe,
  faHouseCrack,
  faPuzzlePiece,
  faUser, faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {WebDetailResolverService} from "../../../web/services/web-detail-resolver.service";
import {Title} from "@angular/platform-browser";
import {MatSelect} from "@angular/material/select";
import {HiderElementDirective} from "../../../core/directives/hider-element.directive";
import {Event} from "../../../core/services/api/symfony-api/tools/constants/event";
import {WebInterface} from "../../../web/interfaces/web-interface";
import {LoginClientService} from "../../../authorization/services/login-client.service";
import {NotifierService} from "../../../core/services/notifier.service";
import {UserService} from "../../../authorization/services/user.service";
import {WebListResolverGuard} from "../../../web/services/web-list-resolver.service";
import {filter, map} from "rxjs/operators";
import CryptoJS from 'crypto-js';
import {HidderComponent} from "../../../core/components/hidder/plain-hider/hidder.component";
import {MatProgressBar} from "@angular/material/progress-bar";


@Component({
  selector: 'app-layout2',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    RouterLinkActive,
    HidderComponent,
    MatProgressBar,
    RouterOutlet
  ],
  templateUrl: './layout2.component.html',
  styleUrl: './layout2.component.css'
})
export class Layout2Component {
  @ViewChild(MatSelect, {static: true}) matSelect: MatSelect;
  @ViewChild(HiderElementDirective, {static: true}) hidder: HiderElementDirective;
  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND, stopSendLogin: Event.POST_SEND};
  websSelect: WebInterface[] = [];
  private _selectedWeb: number;
  isVisibleMenu = true;
  gravatar = '';

  faHouseCrack = faHouseCrack;
  faGlobe = faGlobe;
  faPuzzlePiece = faPuzzlePiece;
  faFiles = faFile;
  faFileCode = faFileCode;
  faFolder = faFolder;
  faUserCircle = faUserCircle;
  faBell = faBell;

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
    (window as any).kaiadmin();
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
