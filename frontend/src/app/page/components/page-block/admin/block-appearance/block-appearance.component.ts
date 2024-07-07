import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingAbleInterface} from "../../../../../core/components/mini-admin/tools/interfaces/setting-able-interface";
import {PageBlockInterface} from "../../../../interfaces/page-block-interface";
import {PageBlockComponent} from "../../page-block/page-block.component";
import {UrlService} from "../../../../../core/services/url.service";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {
  ImageInputComponent
} from "../../../../../plugins/shared/components/inputs/image-inputs/image-input/image-input.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'block-appearance',
  standalone: true,
  templateUrl: './block-appearance.component.html',
  imports: [
    ImageInputComponent,
    FormsModule
  ],
  styleUrls: ['./block-appearance.component.css']
})
export class BlockAppearanceComponent implements SettingAbleInterface, OnInit, OnDestroy{
  contextObject: PageBlockComponent;
  private _settings: PageBlockInterface;
  private _video = '';
  videoTerm$ = new Subject<string>();


  constructor(
    private urlService: UrlService,
  ) {
  }

  ngOnInit(): void {
    this.initVideoUrlChange();
  }

  ngOnDestroy(): void {
    this.videoTerm$.complete();
  }

  get settings(): PageBlockInterface {
    this._video = this._settings.backgroundVideo;
    return this._settings;
  }

  set settings(value: PageBlockInterface) {
    this._settings = value;
  }

  get video(): string {
    return this._video;
  }

  set video(value: string) {
    this._video = value;
    this.videoTerm$.next(value);
  }

  initVideoUrlChange() {
    this.videoTerm$.pipe(debounceTime(1000)).subscribe(value => {
      if (value.length) {
        if (this.urlService.validateYouTubeUrl(value)) {
          this.contextObject.destroyVideo();
          this.contextObject.changeVideo(value);
        }
      } else {
        this.contextObject.destroyVideo();
      }
    });
  }

  updateColor($event) {
    this._settings.backgroundColor = $event.target.value;
  }

  updateImage(path: string) {
    this._settings.backgroundImage = path;
  }
}
