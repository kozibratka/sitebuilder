import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageInterface} from '../../../page/interfaces/page-interface';
import {PublicPageBlockComponent} from "../../components/public-page-block/public-page-block.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-public',
  standalone: true,
  templateUrl: './public.component.html',
  imports: [
    CommonModule,
    PublicPageBlockComponent
  ],
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  pageDetail: PageInterface;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pageDetail = this.route.snapshot.data['pageDetail'] as PageInterface;
  }

}
