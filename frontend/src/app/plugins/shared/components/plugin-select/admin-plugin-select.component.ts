import {Component, OnInit} from '@angular/core';
import {AbstractAdminSetting} from "../../abstract-class/abstract-admin-setting";
import {BasePlugConfigInterface} from "../../interfaces/base-plug-config-interface";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PluginResolverService} from "../../services/plugin-resolver.service";
import {PageBuilderResolverService} from "../../../../page/services/page-builder-resolver.service";
import {ObjectHelper} from "../../../../core/helpers/object-helper";
import {pairwise, startWith} from "rxjs/operators";
import {MiniAdminComponent} from "../../../../core/components/mini-admin/mini-admin.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-plugin-select',
  standalone: true,
  templateUrl: './admin-plugin-select.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./admin-plugin-select.component.css']
})
export class AdminPluginSelectComponent extends AbstractAdminSetting<BasePlugConfigInterface> implements OnInit {
  selectOptions: {name: string, id: number}[] = [];
  selectedId: string;
  form: FormGroup;
  constructor(
    private pluginResolverService: PluginResolverService,
    private fb: FormBuilder,
    private pageBuilderResolverService: PageBuilderResolverService,
    private miniAdminComponent: MiniAdminComponent,
  ) {
    super();
  }
  ngOnInit(): void {

  }

  createAdminForm(settings: any): void {
    this.selectOptions = this.pageBuilderResolverService.page.globalPlugins.filter(value => {
      return value.identifier == this.settings.identifier;
    }).map(value => {return {id: value.id, name: value.name}});
    this.selectedId = this.settings.webId ? this.settings.id.toString() : '0';
    this.form = this.fb.group({
      plugin: [this.selectedId],
    });
    if (!this.settings.webId) {
      this.contextObject.lastAdminSettings = ObjectHelper.copyToRaw(this.settings);
    }
    this.form.get('plugin').valueChanges.pipe(startWith(this.selectedId), pairwise()).subscribe(([prev, next]: [any, any]) => {
      if (prev == '0') {
        this.contextObject.lastAdminSettings = ObjectHelper.copyToRaw(this.settings);
      }
      let pluginConfig: any = {};
      if (next != '0') {
        pluginConfig = this.pageBuilderResolverService.page.globalPlugins.find(value1 => value1.id == next);
        this.miniAdminComponent.allowedAdminComponent = AdminPluginSelectComponent;
      } else {
        pluginConfig = this.contextObject.lastAdminSettings ? this.contextObject.lastAdminSettings : this.pluginResolverService.getPluginResolverByIdentifier(this.contextObject.settings.identifier).getEmptySettings();
        this.miniAdminComponent.allowedAdminComponent = null;
      }
      ObjectHelper.reinitObject(this.settings, pluginConfig);
    });
  }

}
