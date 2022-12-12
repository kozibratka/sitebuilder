import {Component, OnInit} from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {TextPluginConfigInterface} from '../../tools/interfaces/text-plugin-config-interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-plugin-admin.component.html',
  styleUrls: ['./text-plugin-admin.component.css']
})
export class TextPluginAdminComponent extends AbstractAdminSetting<TextPluginConfigInterface> implements OnInit{

  public Editor = ClassicEditor;
  public text: string;

  ngOnInit(): void {
  }

  createAdminForm(settings: TextPluginConfigInterface) {
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
