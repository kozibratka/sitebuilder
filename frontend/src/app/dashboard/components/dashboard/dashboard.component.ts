import {Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(
    private title: Title,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
    });
  }

}