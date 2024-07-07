import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogClose} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Observable, Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-grid-image-mini',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogClose,
    MatIcon,
    NgForOf,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './gallery-image-mini.component.html',
  styleUrl: './gallery-image-mini.component.css'
})
export class GalleryImageMiniComponent implements OnDestroy{
  title = '';
  images: {previewURL: string}[] = [];
  icons: IconProp[] = [];
  private _search = '';
  private term$ = new Subject<string>();
  public search$: Observable<string>;

  constructor() {
    this.search$ = this.term$.pipe(
      debounceTime(500)
    );
  }

  ngOnInit(): void {
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    console.log(this._search)
    this.term$.next(value);
  }

  ngOnDestroy(): void {
    this.term$.complete();
  }
}
