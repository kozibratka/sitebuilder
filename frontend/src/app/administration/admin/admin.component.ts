import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [{provide: 'title', useFactory: () => new Subject<string>()}]
})
export class AdminComponent implements OnInit, AfterViewInit{

  title = 'Title :)';


  constructor(
    @Inject('title') private title$: Subject<string>,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.title$.subscribe(title => {
      this.title = title;
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit() {
  }
}
