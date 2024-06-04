import {ApplicationRef, Component, NgZone, OnInit} from '@angular/core';
import {AbstractAdminSetting} from "../../../../abstract-class/abstract-admin-setting";
import {TextConfigInterface} from "../../interfaces/text-config-interface";
import {FormBuilder} from "@angular/forms";
import {FileManagerModalService} from "../../../../../core/modules/file-manager/services/file-manager-modal.service";
import {FormService} from "../../../../../core/services/form.service";

@Component({
  selector: 'app-tinymce-admin',
  templateUrl: './tinymce-admin.component.html',
  styleUrls: ['./tinymce-admin.component.css']
})
export class TinymceAdminComponent extends AbstractAdminSetting<TextConfigInterface> implements OnInit{

  tinyMceOptions;

  constructor(
    protected fb: FormBuilder,
    protected adminFormService: FormService,
    private fileManagerModalService: FileManagerModalService,
    private applicationRef: ApplicationRef,
    private ngZone: NgZone,
  ) {
    super();
    this.initTinyMce();
  }

  ngOnInit(): void {
  }

  createAdminForm(settings: TextConfigInterface) {
    this.adminForm = this.adminFormService.createForm(
      {
        text: ['']
      },
      settings
    );
  }

  initTinyMce() {

    this.tinyMceOptions = {
      base_url: '/tinymce',
      suffix: '.min',
      file_picker_callback: (callback, value, meta) => {
        this.ngZone.run(args => {
          this.fileManagerModalService.open().subscribe(value1 => {
            if (value1.eventName === 'selected') {
              callback(value1.files[0]?.publicPath);
            }
          });
        })
      },
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace',
        'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table',
        'help', 'wordcount',
      ],
      toolbar1: 'undo redo fontfamily blocks bold italic forecolor backcolor image',
      toolbar2: 'alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat | help'
    }
  }
}
