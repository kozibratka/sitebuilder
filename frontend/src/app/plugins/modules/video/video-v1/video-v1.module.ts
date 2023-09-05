import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoV1Component} from './components/video-v1/video-v1.component';
import {VideoV1AdminComponent} from './pages/video-v1-admin/video-v1-admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {VideoV1ResolverService} from './services/video-v1-resolver.service';



@NgModule({
  declarations: [
    VideoV1Component,
    VideoV1AdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: AbstractPluginResolver, useClass: VideoV1ResolverService, multi: true},
  ],
})
export class VideoV1Module { }
