import {Component, Inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MenuItemInterface} from '../../interfaces/menu-item-interface';
import {WebDetailResolverService} from '../../../../web/services/web-detail-resolver.service';
import {PageListResolverService} from "../../../../page/services/resolvers/page-list-resolver.service";
import {PageInterface} from "../../../../page/interfaces/page-interface";
import {DialogComponent} from "../../../../core/components/dialog/dialog.component";
import {CommonModule} from "@angular/common";
import {PageBuilderResolverService} from "../../../../page/services/resolvers/page-builder-resolver.service";
import {FormService} from "../../../../core/services/form.service";
import {
  InputFormErrorDirective
} from "../../../../core/directives/form-error/input-form-error/input-form-error.directive";

@Component({
  selector: 'app-menu-item-settings',
  standalone: true,
  templateUrl: 'menu-item-settings.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogComponent,
    InputFormErrorDirective
  ],
  styleUrls: ['menu-item-settings.component.css']
})
export class MenuItemSettingsComponent {
  form: FormGroup;
  pages: PageInterface[];
  formData: MenuItemInterface;
  protected readonly FormService = FormService;
  constructor(
    private webDetail: WebDetailResolverService,
    protected pageBuilderResolverService: PageBuilderResolverService,
    private fb: FormBuilder,
    pageListResolverService: PageListResolverService,
    @Inject(MAT_DIALOG_DATA) protected menuItem: MenuItemInterface,
    public dialogRef: MatDialogRef<any>
  ) {
    pageListResolverService.getPageList().subscribe(value => {
      this.pages = value;
    });
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      type: ['Page', { validators: [Validators.required] ,updateOn: 'change' }],
      pageId: [null],
      uniqueId: [null],
    }, {
      updateOn: 'submit',
      validators: (control: AbstractControl) => {
        control.get('uniqueId').setErrors(null);
        control.get('pageId').setErrors(null);
        if (control.get('type').value == 'Block' && !control.get('uniqueId').value) {
          control.get('uniqueId').setErrors({required: true});
        }
        else if (control.get('type').value == 'Page' && !control.get('pageId').value) {
          control.get('pageId').setErrors({required: true});
        }
        return null;
      }
    }
    )
    ;
    this.formData = {...this.menuItem}
    if (this.menuItem) {
      this.form.patchValue(this.menuItem);
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.status == 'VALID') {
      this.formData = this.form.value;
      if (this.formData.type === 'Block') {
        this.formData.pageId = null;
      } else { // page
        this.formData.uniqueId = null;
        const page = this.pages.find(page => page.id == this.formData.pageId);
        this.formData.pageDetail = {pageUrl: page.url, isHomepage: page.homePage};
      }

      this.dialogRef.close(true);
    }
  }

}
