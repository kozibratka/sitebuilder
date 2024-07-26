import {ApplicationRef, Component, NgZone, OnInit} from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {TextConfigInterface} from "../../interfaces/text-config-interface";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FileManagerModalService} from "../../../../core/modules/file-manager/services/file-manager-modal.service";
import {FormService} from "../../../../core/services/form.service";
import {PageListResolverService} from "../../../../page/services/page-list-resolver.service";
import {PageInterface} from "../../../../page/interfaces/page-interface";
import {EditorComponent, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tinymce-admin',
  standalone: true,
  templateUrl: './tinymce-admin.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditorComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
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
    private pageListResolverService: PageListResolverService,
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
      language: 'cs',
      content_css: ["/bootstrap/css/bootstrap.min.css", "/assets/fonts.css"],
      content_style: 'body {padding: 12px;}',
      language_url: "assets/tinyLang/cs.js",
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
        'help', 'wordcount'
      ],
      toolbar1: 'undo redo fontfamily blocks fontsize bold italic forecolor backcolor ' +
        'image alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat link',
      link_list: (success) => {
        this.pageListResolverService.getPageList().subscribe(value => {
          let pages = value.map((page: PageInterface) => {
            return {title: page.name, value: page.url};
          });
          success(pages);
        });
      },
      font_family_formats:
        "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;Caveat;Dancing Script;Edu AU VIC WA NT Hand;Josefin Sans;Kalnia Glaze;Open Sans;Playwrite AT;Playwrite CZ;Roboto;Sevillana",
    }
  }
}
