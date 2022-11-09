import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public webDetailResolverService: WebDetailResolverService,
    public title: Title
  ) { }

  ngOnInit(): void {
  }

}
