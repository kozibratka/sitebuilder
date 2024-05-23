import {Component, OnInit, ViewChild} from '@angular/core';
import {FormConfigInterface} from '../../interfaces/form-config-interface';
import {FormPublicComponent} from '../../../../../core/modules/form-builder/components/form-public/form-public/form-public.component';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
import {SymfonyApiClientService} from '../../../../../core/services/api/symfony-api/symfony-api-client.service';
import {NotifierService} from '../../../../../core/services/notifier.service';

@Component({
  selector: 'app-form-v1',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent extends AbstractPlugin<FormConfigInterface> implements OnInit{

  @ViewChild(FormPublicComponent, {static: true}) formBuilderPublic: FormPublicComponent;

  formInputs;
  isSend = false;
  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
  ) {
    super();
  }

  ngOnInit(): void {
      this.formInputs = this.settings.form;
  }

  initializeSettings(settings: FormConfigInterface) {
    super.initializeSettings(settings);
  }

  refreshView(): void {
    this.formBuilderPublic.refresh();
  }

  formSubmitted(data: any) {
    if (!this.settings.hashId) {
      return;
    }
    this.symfonyApiClientService.post('plugin_form_save_data', {formData: data}, {hash: this.settings.hashId}).subscribe(value => {
      this.notifierService.notify('Formulář byl úspěšně odeslán');
      this.isSend = true;
    });
  }

}
