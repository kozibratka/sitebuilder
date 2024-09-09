import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractPlugin} from "../../../shared/abstract-class/abstract-plugin";
import {VideoBackgroundConfigInterface} from "../../interfaces/video-background-config-interface";

@Component({
  selector: 'app-video-background',
  standalone: true,
  imports: [],
  templateUrl: './video-background.component.html',
  styleUrl: './video-background.component.css'
})
export class VideoBackgroundComponent extends AbstractPlugin<VideoBackgroundConfigInterface> implements OnInit, OnDestroy {
  @ViewChild('video', {static: true}) video: ElementRef;


  constructor(
    private ngZone: NgZone
  ) {
    super();
  }

  ngOnInit(): void {
    this.startVideo();
  }

  ngOnDestroy(): void {
    this.destroyVideo();
  }

  startVideo(change = false) {
    this.ngZone.runOutsideAngular(args => {
      if (!this.settings.videoPath) {
        return;
      }
      if (change) {
        this.destroyVideo();
      }
      this.video.nativeElement.dataset.vbg = this.settings.videoPath;
      if (!(window as any).hasOwnProperty('VIDEO_BACKGROUNDS')) {
        (jQuery(this.video.nativeElement) as any).youtube_background();
      } else {
        (window as any).VIDEO_BACKGROUNDS.add(this.video.nativeElement);
      }
    });
  }

  destroyVideo() {
    (window as any).VIDEO_BACKGROUNDS.destroy(this.video.nativeElement);
  }

  refreshView(): void {
  }
}
