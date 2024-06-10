import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonAdminComponent } from './pages/button-admin/button-admin.component';
import { ButtonComponent } from './components/button/button.component';
import {AbstractPluginResolver} from "../../../page/services/abstract-classes/abstract-plugin-resolver";
import {ButtonResolverService} from "./services/button-resolver.service";
import { ButtonLinkAdminComponent } from './pages/button-link-admin/button-link-admin.component';
import {FileManagerModule} from "../../../core/modules/file-manager/file-manager.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../../core/core.module";

@NgModule({
  declarations: [
    ButtonAdminComponent,
    ButtonComponent,
    ButtonLinkAdminComponent
  ],
    imports: [
        CommonModule,
        FileManagerModule,
        ReactiveFormsModule,
        CoreModule
    ],
  providers: [
    {provide: AbstractPluginResolver, useClass: ButtonResolverService, multi: true},
  ],
})
export class ButtonModule { }
