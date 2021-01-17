import {AfterViewInit, Component, Injector, OnInit, ViewChildren} from '@angular/core';
import {TextPluginComponent} from '../../text-plugin.component';
import {BaseSettingsAbstract} from '../../../tools/abstract-class/base-settings-abstract';
import {FormGroup} from '@angular/forms';
import {TextPluginFormService} from './tools/forms/text-plugin-form.service';
import {InputFormErrorGrouperDirective} from '../../../../core/directives/form-error/input-form-error-grouper.directive';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-plugin-admin.component.html',
  styleUrls: ['./text-plugin-admin.component.css']
})
export class TextPluginAdminComponent extends BaseSettingsAbstract<TextPluginComponent> implements OnInit, AfterViewInit{

  adminForm: FormGroup;
  @ViewChildren(InputFormErrorGrouperDirective) inputFormErrorGrouperDirective;

  constructor(
    injector: Injector,
    textPluginFormService: TextPluginFormService
  ) {
    super(injector);
    this.adminForm = textPluginFormService.createForm();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    console.log(this.inputFormErrorGrouperDirective);
  }

}
