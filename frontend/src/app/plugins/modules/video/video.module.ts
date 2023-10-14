import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {VideoResolverService} from './services/video-resolver.service';
import {MatIconModule} from '@angular/material/icon';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {VideoComponent} from './components/video/video.component';
import {VideoAdminComponent} from './pages/video-admin/video-admin.component';



@NgModule({
  declarations: [
    VideoComponent,
    VideoAdminComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule
    ],
  providers: [
    {provide: AbstractPluginResolver, useClass: VideoResolverService, multi: true},
  ],
})
export class VideoModule { }
