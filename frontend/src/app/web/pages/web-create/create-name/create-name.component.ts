import {Component, OnInit} from '@angular/core';
import {WebFormService} from "../../../services/web-form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {SymfonyApiClientService} from "../../../../core/services/api/symfony-api/symfony-api-client.service";
import {NotifierService} from "../../../../core/services/notifier.service";
import {HttpResponseToasterService} from "../../../../core/services/http-response-toaster.service";
import {WebListResolverGuard} from "../../../services/web-list-resolver.service";

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
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    private router: Router,
    public webListGuard: WebListResolverGuard,
  ) {
  }

  ngOnInit(): void {
    let templateId = this.route.snapshot.paramMap.get('idTemplate');
    this.form = this.webFormService.createForm({path: 'web_create', querySegment: {id: templateId}});
    this.form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.symfonyApiClientService.post('web_create', this.form.value, {id: templateId}).subscribe({
          next: () => {
            this.notifierService.notify('Web byl úspěšně vytvořen');
            this.router.navigate(['list'], { relativeTo: this.route.parent });
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    })
  }
}
