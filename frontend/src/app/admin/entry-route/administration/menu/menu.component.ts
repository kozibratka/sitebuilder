import { Component, OnInit } from '@angular/core';
import {WebDetailResolverService} from '../tools/route-resolvers/web-detail-resolver.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public webDetailResolverService: WebDetailResolverService
  ) { }

  ngOnInit(): void {
  }

}
