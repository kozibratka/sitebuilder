import {AfterViewChecked, Component, Inject, OnInit, Optional} from '@angular/core';
import {VideoConfigInterface} from '../../interfaces/video-config-interface';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
import {Subject} from "rxjs";

@Component({
  selector: 'app-video-v1',
  templateUrl: 'video.component.html',
  styleUrls: ['video.component.css']
})
export class VideoComponent extends AbstractPlugin<VideoConfigInterface> implements AfterViewChecked, OnInit{

  sanitizedUrl: SafeResourceUrl;
  private lastVideoPath: string;
  disable = false;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject('AnyDraggedResized') @Optional() private anyDraggedResized$: Subject<boolean>,
  ) {
    super();
  }

  ngOnInit() {
    this.getDisabledStateWhenDraggingItem()
  }

  ngAfterViewChecked(): void {
  }

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): any {
    if (this.anyDraggedResized$) {
      this.anyDraggedResized$.subscribe(value => {
        this.disable = value;
      })
    }
  }

  getVideoUrl() {
    const videoUrl = this.validateYouTubeUrl(this.settings.videoPath);
    if (videoUrl && videoUrl !== this.lastVideoPath) {
      this.lastVideoPath = videoUrl;
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
    return this.sanitizedUrl;
  }

  validateYouTubeUrl(url: string)
  {
    if (url !== undefined || url !== '') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        // Do anything for being valid
        // if need to change the url to embed url then use below line
        return 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0';
      }
      else {
        return false;
      }
    }
  }
}
