import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {MatDialogClose} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-pixabay',
  standalone: true,
  templateUrl: './pixabay.component.html',
  imports: [
    CommonModule,
    MatDialogClose,
    MatIcon,
    FormsModule,
    MatButton
  ],
  styleUrls: ['./pixabay.component.css']
})
export class PixabayComponent implements OnInit, OnDestroy{
  data = [];
  term$ = new Subject<string>();
  private _search = '';


  constructor(
    private httpClient: HttpClient,
  ) {
  }
  ngOnInit(): void {
    this.term$.pipe(
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
    this.term$.complete();
  }

}
