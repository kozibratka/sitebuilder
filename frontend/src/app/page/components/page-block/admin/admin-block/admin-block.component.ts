import {Component, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BlockFormService} from "../../../../services/form/block-form.service";
import {
  AbstractMiniAdminSettings
} from "../../../../../core/modules/mini-admin/components/abstract/abstract-mini-admin-settings/abstract-mini-admin-settings.directive";
import {PageBlockInterface} from "../../../../interfaces/page-block-interface";
import {FormService} from "../../../../../core/services/form.service";
import {
  InputFormErrorDirective
} from "../../../../../core/directives/form-error/input-form-error/input-form-error.directive";

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputFormErrorDirective
  ],
  templateUrl: './admin-block.component.html',
  styleUrl: './admin-block.component.css'
})
export class AdminBlockComponent extends AbstractMiniAdminSettings<PageBlockInterface> implements OnInit{
  form: FormGroup;
  constructor(
    private formService: FormService
  ) {
    super();
  }
  ngOnInit(): void {
    this.form = this.formService.createForm({
      name: [''],
    }, this.settings)
  }
}
