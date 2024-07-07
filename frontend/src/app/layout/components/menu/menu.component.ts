import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
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
