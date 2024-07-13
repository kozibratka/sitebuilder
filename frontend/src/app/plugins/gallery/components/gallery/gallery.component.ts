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
    if (this.gallery) {
      ($(this.content.nativeElement) as any).nanogallery2('destroy');
    }
    let images = this.settings.images.map(value => {
      return {src: value.path, srct: value.path, title: value.h1}
    });
    this.gallery = ($(this.content.nativeElement) as any).nanogallery2({
      items:images,
      thumbnailWidth:  'auto',
      thumbnailHeight: 100,
      locationHash:    false,
    });
  }

  ngOnDestroy(): void {
  }
}
