import {Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';

  constructor(
    @Inject('title') private title$: Subject<string>,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.title$.next(this.title);
    this.route.data.subscribe(data => {
      console.log('aloha');
    });
  }

}
