import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {FormBuilder} from '@angular/forms';
import {ConfigInterface} from '../../interfaces/config-interface';
import {AbstractAdminSetting} from '../../../../../abstract-class/abstract-admin-setting';
import {AdminFormService} from '../../../../../forms/admin-form.service';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-admin.component.html',
  styleUrls: ['./text-admin.component.css']
})
export class TextAdminComponent extends AbstractAdminSetting<ConfigInterface> implements OnInit{

  public Editor = ClassicEditor;
  public text: string;

  constructor(
    protected fb: FormBuilder,
    protected adminFormService: AdminFormService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  createAdminForm(settings: ConfigInterface) {
    this.adminForm = this.adminFormService.createForm(
      {
        text: ['']
      },
      settings
    );
  }

  public onChange( { editor }: ChangeEvent ) {
    const text = editor.getData();
    this.adminForm.patchValue({text});
  }
}
