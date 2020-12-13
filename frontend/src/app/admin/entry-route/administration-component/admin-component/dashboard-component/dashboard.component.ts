import {Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';

  constructor(
    @Inject('title') private title$: Subject<string>
  ) {

  }

  ngOnInit(): void {
    this.title$.next(this.title);
  }

}
