import {Component, OnInit} from '@angular/core';
import {WebFormService} from "../../../services/Form/web-form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NotifierService} from "../../../../core/services/notifier.service";
import {ApiFormService} from "../../../../core/services/form/api-form.service";
import {
  InputFormErrorDirective
} from "../../../../core/directives/form-error/input-form-error/input-form-error.directive";

@Component({
  selector: 'app-create-name',
  standalone: true,
  templateUrl: './create-name.component.html',
  imports: [
    ReactiveFormsModule,
    InputFormErrorDirective
  ],
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
    let templateId = parseInt(this.route.snapshot.paramMap.get('idTemplate'));
    this.form = this.webFormService.createForm();
    this.form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        let queryParameter = templateId ? {id: templateId} : {};
        this.apiFormService.send('web_create', this.form, queryParameter).subscribe(response => {
          this.notifierService.notify('Web byl úspěšně vytvořen');
          this.router.navigate(['web/list'], { relativeTo: this.route.parent.parent });
        });
      }
    });
  }
}
