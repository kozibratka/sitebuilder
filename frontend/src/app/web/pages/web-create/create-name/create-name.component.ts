import {Component, OnInit} from '@angular/core';
import {WebFormService} from "../../../services/web-form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {SymfonyApiClientService} from "../../../../core/services/api/symfony-api/symfony-api-client.service";
import {NotifierService} from "../../../../core/services/notifier.service";
import {HttpResponseToasterService} from "../../../../core/services/http-response-toaster.service";
import {WebListResolverGuard} from "../../../services/web-list-resolver.service";
import {ApiFormService} from "../../../../core/services/form/api-form.service";

@Component({
  selector: 'app-create-name',
  templateUrl: './create-name.component.html',
  styleUrls: ['./create-name.component.css']
})
export class CreateNameComponent implements OnInit{
  form: FormGroup;

  constructor(
    private webFormService: WebFormService,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private router: Router,
    public apiFormService: ApiFormService
  ) {
  }

  ngOnInit(): void {
    let templateId = this.route.snapshot.paramMap.get('idTemplate');
    this.form = this.webFormService.createForm();
    this.form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.apiFormService.send('web_create', this.form, {id: templateId}).subscribe(response => {
          this.notifierService.notify('Web byl úspěšně vytvořen');
          this.router.navigate(['page/page-builder', response.body.pages[0].id], { relativeTo: this.route.parent.parent });
        });
      }
    });
  }
}
