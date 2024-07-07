import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PageBlockInterface} from '../../../page/interfaces/page-block-interface';
import {UrlService} from "../../../core/services/url.service";
import {GridRowPublicComponent} from "../grid-row-public/grid-row-public.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-public-page-block',
  standalone: true,
  templateUrl: './public-page-block.component.html',
  imports: [
    CommonModule,
    GridRowPublicComponent
  ],
  styleUrls: ['./public-page-block.component.css']
})
export class PublicPageBlockComponent implements OnInit, AfterViewInit {

  @ViewChild('palette_content', {static: true}) paletteContent: ElementRef;
  @ViewChild('video') video: ElementRef<HTMLElement>;
  @Input() pageBlock: PageBlockInterface;
  public videoUrl = '';

  constructor(
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.initVideoUrl();
  }

  ngAfterViewInit(): void {
    this.startVideo();
  }

  initVideoUrl() {
    if (this.pageBlock.backgroundVideo) {
      this.videoUrl = this.urlService.getYoutubeVideoUrl(this.pageBlock.backgroundVideo);
    }
  }

  startVideo() {
    if (this.videoUrl) {
      if (!(window as any).hasOwnProperty('VIDEO_BACKGROUNDS')) {
        (jQuery(this.video.nativeElement.firstElementChild) as any).youtube_background();
      } else {
        (window as any).VIDEO_BACKGROUNDS.add(this.video.nativeElement.firstElementChild);
      }
    }
  }

  getStyles() {
    let style = {};
    if (this.pageBlock.paddingTop) {
      style['paddingTop'] = this.pageBlock.paddingTop+'px';
    }
    if (this.pageBlock.paddingBottom) {
      style['paddingBottom'] = this.pageBlock.paddingBottom+'px';
    }
    return style;
  }

}
