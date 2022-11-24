import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageInterface} from '../../../page/interfaces/page-interface';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  pageDetail: PageInterface;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pageDetail = this.route.snapshot.data.pageDetail as PageInterface;
  }

}
