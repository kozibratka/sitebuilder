import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";
import {faFile, faFileCode, faFolder, faGlobe, faHouseCrack, faPuzzlePiece} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FaIconComponent
  ],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faHouseCrack = faHouseCrack;
  faGlobe = faGlobe;
  faPuzzlePiece = faPuzzlePiece;
  faFiles = faFile;
  faFileCode = faFileCode;
  faFolder = faFolder;

  constructor(
    public webDetailResolverService: WebDetailResolverService,
    public title: Title
  ) { }

  ngOnInit(): void {
  }
}
