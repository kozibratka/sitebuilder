import {SettingSubjectAbleInterface} from '../../../shared/core/components/move-able-settings/tools/interfaces/setting-subject-able-interface';
import {AbstractPlugin} from './abstract-plugin';
import {BasePlugSettingsinInterface} from '../interfaces/base-plug-settingsin-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SymfonyApiClientService} from '../../../shared/core/services/api/symfony-api/symfony-api-client.service';
import {NotifierService} from '../../../shared/core/services/notifier.service';
import {HttpResponseToasterService} from '../../../shared/core/services/http-response-toaster.service';
import {Directive} from '@angular/core';
import {
  AbstractMenuPluginResolver
} from '../../../admin/entry-route/administration/admin/page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {AdminFormService} from '../forms/admin-form.service';

@Directive()
export class AbstractAdminSetting<T extends BasePlugSettingsinInterface> implements SettingSubjectAbleInterface{
  subject: AbstractPlugin<T>;
  settings: T;
  webId: number;
  menuResolver: AbstractMenuPluginResolver;


  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    private fb: FormBuilder,
    private adminFormService: AdminFormService
  ) {
  }

  setSubject(instance: AbstractPlugin<T>) {
    this.subject = instance;
    this.settings = instance.settings;
  }

  createForm() {
    const formRoute = !this.settings ? 'plugin_create' : 'plugin_update';
    const routeParams = !this.settings ? {id: this.webId, identifier: this.menuResolver.identifier} : {id: this.settings.id};
    this.adminFormService.formRoute = formRoute;
    const form = this.adminFormService.createForm(routeParams);
    form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        let post: Observable<HttpResponse<T>>;
        if (!this.settings) {
          post = this.symfonyApiClientService.post(formRoute, form.value, routeParams);
        } else {
          post = this.symfonyApiClientService.post(formRoute, form.value, routeParams);
        }
        post.subscribe({
          next: (value) => {
            let message = '';
            if (!this.settings) {
              message = 'Plugin byl úspěšně vytvořen';
            } else {
              message = 'Plugin byl úspěšně upraven';
            }
            this.settings = value.body;
            this.notifierService.notify(message);
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
    return form;
  }
}
