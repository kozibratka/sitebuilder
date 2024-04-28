import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-pixabay',
  templateUrl: './pixabay.component.html',
  styleUrls: ['./pixabay.component.css']
})
export class PixabayComponent implements OnInit, OnDestroy{
  data = [];
  term$ = new Subject<string>();
  private _search = '';
  private termSubscription: Subscription;


  constructor(
    private httpClient: HttpClient,
  ) {
  }
  ngOnInit(): void {
    this.termSubscription = this.term$.pipe(
      debounceTime(1000)
    ).subscribe(value1 => {
      this.load()
    });
    this.load();
  }

  load() {
    this.httpClient.get<any>('https://pixabay.com/api/', {
      params: {
        key: '43622793-a6acf5a35ee67e14b66d06258',
        q: this._search,
        image_type: 'photo'
      }
    }).subscribe(value => {
      this.data = value.hits;
    });
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    this.term$.next(value);
  }

  ngOnDestroy(): void {
    this.termSubscription.unsubscribe();
  }

}
