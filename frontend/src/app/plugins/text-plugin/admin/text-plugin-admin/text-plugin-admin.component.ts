import {AfterViewInit, Component, Injector, OnInit, ViewChildren} from '@angular/core';
import {TextPluginComponent} from '../../text-plugin.component';
import {BaseAdminAbstractComponent} from '../../../tools/components/base-admin-abstract.component';
import {FormGroup} from '@angular/forms';
import {TextPluginFormService} from './tools/forms/text-plugin-form.service';
import {InputFormErrorGrouperDirective} from '../../../../core/directives/form-error/input-form-error-grouper.directive';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-plugin-admin.component.html',
  styleUrls: ['./text-plugin-admin.component.css']
})
export class TextPluginAdminComponent extends BaseAdminAbstractComponent<TextPluginComponent> implements OnInit, AfterViewInit{

  adminForm: FormGroup;

  constructor(
    injector: Injector,
    textPluginFormService: TextPluginFormService
  ) {
    super(injector);
    this.adminForm = textPluginFormService.createForm();
    this.registerInvalidFormEvent(this.adminForm);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.inputFormErrorGrouperDirectives);
  }

}
