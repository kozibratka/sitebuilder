import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MenuPluginResolverService} from './menu-builder/services/menu-plugin-resolvers/menu-plugin-resolver.service';
import {Observable, Subject} from 'rxjs';
import {QuickMenuMessenger} from './palette-builder/palette-item-quick-menu/messengers/quick-menu-messenger';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [
    MenuPluginResolverService,
    {provide: 'QuickMenuMessenger', useFactory: () => new Subject<QuickMenuMessenger>()}
  ]
})
export class PageBuilderComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<QuickMenuMessenger>
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    // On item mouse Enter
    this.quickMenuMessenger.subscribe(quickMenuMessenger => {
      console.log("wfwfwfwfwfwf");
    });
  }



}
