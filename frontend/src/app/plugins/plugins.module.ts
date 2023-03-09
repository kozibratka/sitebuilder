import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextPluginResolverService} from './text-plugin/tools/services/text-plugin-resolver.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextPluginAdminComponent} from './text-plugin/admin/text-plugin-admin/text-plugin-admin.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {AbstractPluginResolver} from '../page/services/abstract-classes/abstract-plugin-resolver';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CarouselBootstrapPluginResolverService} from './carousel-bootstrap-plugin/services/carousel-bootstrap-plugin-resolver.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MixedCdkDragDropModule} from 'angular-mixed-cdk-drag-drop';
import {CarouselBootstrapPluginComponent} from './carousel-bootstrap-plugin/carousel-bootstrap-plugin.component';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {ImagesAdminComponent} from './carousel-bootstrap-plugin/pages/images-admin/images-admin.component';
import {EffectAdminComponent} from './carousel-bootstrap-plugin/pages/effect-admin/effect-admin.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SortablejsModule} from 'ngx-sortablejs';
import {MenuSimplePluginComponent} from './menu-simple-plugin/menu-simple-plugin.component';
import { MenuAdminComponent } from './menu-simple-plugin/pages/menu-admin/menu-admin.component';
import {MenuSimplePluginResolverService} from './menu-simple-plugin/services/menu-simple-plugin-resolver.service';
import { MenuAdminItemComponent } from './menu-simple-plugin/components/menu-admin-item/menu-admin-item.component';
import { AppFileComponent } from './menu-simple-plugin/components/app-file/app-file.component';
import {MatIconModule} from '@angular/material/icon';
import { RemoveMenuItemDialogComponent } from './menu-simple-plugin/components/remove-menu-item-dialog/remove-menu-item-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterModule,
        CKEditorModule,
        FormsModule,
        DragDropModule,
        MixedCdkDragDropModule,
        NgbCarousel,
        NgbSlide,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        SortablejsModule.forRoot({animation: 150}),
        MatIconModule,
        MatDialogModule,
    ],
  providers: [
     {provide: AbstractPluginResolver, useClass: TextPluginResolverService, multi: true},
     {provide: AbstractPluginResolver, useClass: CarouselBootstrapPluginResolverService, multi: true},
     {provide: AbstractPluginResolver, useClass: MenuSimplePluginResolverService, multi: true},
  ],
  declarations: [
    TextPluginAdminComponent,
    ImagesAdminComponent,
    CarouselBootstrapPluginComponent,
    EffectAdminComponent,
    MenuSimplePluginComponent,
    MenuAdminComponent,
    MenuAdminItemComponent,
    AppFileComponent,
    RemoveMenuItemDialogComponent,
  ]
})
export class PluginsModule { }
