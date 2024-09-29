import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractPlugin} from "../../../shared/abstract-class/abstract-plugin";
import {GalleryConfigInterface} from "../../interfaces/gallery-config-interface";
import {CommonModule} from "@angular/common";
(window as any).global = {};
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent extends AbstractPlugin<GalleryConfigInterface> implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('content', {static: true}) content: ElementRef<HTMLElement>;
  gallery = null;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.refreshView();
  }

  refreshView(): void {
    let originSize = '';
    if (this.gallery) {
      if (!this.content.nativeElement.style.height) {
        originSize = this.content.nativeElement.offsetHeight.toString()+'px';
      }
      if (originSize) {
        this.content.nativeElement.style.height = originSize;
      }
      ($(this.content.nativeElement) as any).nanogallery2('destroy');
    }
    let images = this.settings.images.map(value => {
      return {src: value.path, srct: value.path, title: value.h1}
    });

    this.gallery = ($(this.content.nativeElement) as any).nanogallery2({
      items:images,
      thumbnailWidth:  'auto',
      thumbnailHeight: this.settings.thumbnailHeight,
      thumbnailAlignment: 'right',
      locationHash:    false,
      thumbnailDisplayTransition: "scaleUp",
      fnThumbnailInit: ($thumbnail, item, GOMidx) => {
        if (originSize && GOMidx+1 >= this.settings.images.length) {
          let images = this.content.nativeElement.querySelectorAll('img');
          if (!images.length) {
            return;
          }
          let lastImage = images[images.length-1];
          lastImage.addEventListener('load', ev => {
            this.content.nativeElement.style.height = '';
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.gallery) {
      ($(this.content.nativeElement) as any).nanogallery2('destroy');
    }
  }
}
