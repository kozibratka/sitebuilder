import {AfterViewInit, Component, ElementRef, HostListener, inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {TextConfigInterface} from '../../interfaces/text-config-interface';
import {AbstractPlugin} from '../../../shared/abstract-class/abstract-plugin';
import {SafeHtmlPipe} from "../../../../core/pipes/safe-html.pipe";
import {PageBlockComponent} from "../../../../page/components/page-block/page-block/page-block.component";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {FormService} from "../../../../core/services/form.service";
import {FileManagerModalService} from "../../../../core/modules/file-manager/services/file-manager-modal.service";
import {PageListResolverService} from "../../../../page/services/resolvers/page-list-resolver.service";
import {EditorComponent, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import {PageInterface} from "../../../../page/interfaces/page-interface";
import {ADMIN_CONFIG} from "../../../../app.config";
import {ElementHelper} from "../../../../core/helpers/element-helper";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

declare let tinymce: any;
@Component({
  selector: 'app-text-plugin',
  standalone: true,
  templateUrl: 'text.component.html',
  imports: [
    SafeHtmlPipe,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    EditorComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  styleUrls: ['text.component.css'],
})
export class TextComponent extends AbstractPlugin<TextConfigInterface> implements OnInit, AfterViewInit {
  @ViewChild("editor", {read: EditorComponent}) editor: EditorComponent;
  adminForm: FormGroup;
  disabled = true;
  tinyMceOptions;
  editorReady: boolean = false;
  adminConfig = inject(ADMIN_CONFIG, { optional: true});
  private cursorPosition: number | null;
  private clickedPosition: MouseEvent;
  constructor(
    public pageBlockComponent: PageBlockComponent,
    protected adminFormService: FormService,
    private fileManagerModalService: FileManagerModalService,
    private ngZone: NgZone,
    private pageListResolverService: PageListResolverService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.adminConfig) {
      this.initTinyMce();
    }
  }

  ngAfterViewInit(): void {
  }

  refreshView(): void {
  }

  initTinyMce() {
    this.tinyMceOptions = {
      base_url: '/tinymce',
      language: 'cs',
      toolbar: false,
      inline: true,
      content_css: ["/assets/fonts.css"],
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
      init_instance_callback : (e) => {
        this.editorReady = true;
        setTimeout(() => {
          this.editor.editor.focus();
          this.setCursorPosition();
        }, 100)
      },
      font_family_formats:
        "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;Caveat;Dancing Script;Edu AU VIC WA NT Hand;Josefin Sans;Kalnia Glaze;Open Sans;Playwrite AT;Playwrite CZ;Roboto;Sevillana",
      setup: (editor) => {
        editor.on('focusout', (e) => {
          const toolbar = editor.container.querySelector('.tox-toolbar');
          if (toolbar) {
            setTimeout(() => {
              if(!(toolbar.offsetHeight > 0 && toolbar.offsetWidth > 0)){
                this.editorReady = false;
                this.disabled = true;
              }
            }, 100);
          }
        });
      }
    }
  }

  disable(e: MouseEvent) {
    if (e.button === 0) {
      this.clickedPosition = e;
      this.cursorPosition = ElementHelper.getCursorPosition();
      this.disabled = false;
    }
  }

  setCursorPosition() {
    let node = ElementHelper.getInnerNodeFromClickPosition(this.clickedPosition);
    const range = this.editor.editor.selection.getRng();
    if (node) {
      range.setStart(node, this.cursorPosition);
      range.setEnd(node, this.cursorPosition);
      this.editor.editor.selection.setRng(range);
    }
  }
}
