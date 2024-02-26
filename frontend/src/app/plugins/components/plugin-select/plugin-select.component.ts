import {Component, OnInit} from '@angular/core';
import {AbstractAdminSetting} from "../../abstract-class/abstract-admin-setting";
import {BasePlugConfigInterface} from "../../interfaces/base-plug-config-interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PluginResolverService} from "../../services/plugin-resolver.service";
import {PageBuilderResolverService} from "../../../page/services/page-builder-resolver.service";
import {ObjectHelper} from "../../../core/helpers/object-helper";
import {pairwise, startWith} from "rxjs/operators";

@Component({
  selector: 'app-plugin-select',
  templateUrl: './plugin-select.component.html',
  styleUrls: ['./plugin-select.component.css']
})
export class PluginSelectComponent extends AbstractAdminSetting<BasePlugConfigInterface> implements OnInit {
  selectOptions: {name: string, id: number}[] = [];
  selectedId: number|'';
  form: FormGroup;
  lastPlugin: BasePlugConfigInterface = {} as any;
  constructor(
    private pluginResolverService: PluginResolverService,
    private fb: FormBuilder,
    private pageBuilderResolverService: PageBuilderResolverService
  ) {
    super();
  }
  ngOnInit(): void {

  }

  createAdminForm(settings: any): void {
    this.selectOptions = this.pageBuilderResolverService.page.globalPlugins.filter(value => {
      return value.identifier == this.settings.identifier;
    }).map(value => {return {id: value.id, name: value.name}});
    this.selectedId = this.settings.webId ? this.settings.id : 0;
    this.form = this.fb.group({
      plugin: [this.selectedId],
    });
    if (!this.settings.webId) {
      this.lastPlugin = ObjectHelper.copy(this.settings);
    }
    this.form.get('plugin').valueChanges.pipe(startWith(this.selectedId), pairwise()).subscribe(([prev, next]: [any, any]) => {
      if (prev == '0') {
        this.lastPlugin = ObjectHelper.copy(this.settings);
      }
      let pluginConfig: any = {};
      if (next != '0') {
        pluginConfig = this.pageBuilderResolverService.page.globalPlugins.find(value1 => value1.id == next);
      } else {
        pluginConfig = this.lastPlugin ? this.lastPlugin : this.pluginResolverService.getPluginResolverByIdentifier(this.contextObject.settings.identifier).getEmptySettings();
      }
      ObjectHelper.reinitObject(this.settings, pluginConfig);
    });
  }

}
