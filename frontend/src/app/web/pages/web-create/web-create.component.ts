import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {WebFormService} from '../../services/web-form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from '../../../core/services/notifier.service';
import {Title} from '@angular/platform-browser';
import {UserService} from "../../../authorization/services/user.service";
import {WebDetailResolverService} from "../../services/web-detail-resolver.service";
import {ApiFormService} from "../../../core/services/form/api-form.service";

@Component({
  selector: 'app-web-create',
  templateUrl: './web-create.component.html',
  styleUrls: ['./web-create.component.css']
})
export class WebCreateComponent implements OnInit {

  createWebForm: FormGroup;

  constructor(
    private webFormService: WebFormService,
    private router: Router,
    public route: ActivatedRoute,
    private notifierService: NotifierService,
    public title: Title,
    public userService: UserService,
    public apiFormService: ApiFormService
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Úprava webu');
    this.updateWeb();
  }

  updateWeb(): void {
    const webDetail = this.route.snapshot.data.web;
    this.createWebForm = this.webFormService.createForm(this.userService.hasRole('ROLE_ADMIN'));
    this.createWebForm.patchValue(webDetail);
    this.createWebForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.apiFormService.send('web_update', this.createWebForm, {id: webDetail.id}).subscribe(response => {
          this.notifierService.notify('Web byl úspěšně upraven');
          this.router.navigate(['list'], { relativeTo: this.route.parent });
        });
      }
    });
  }

  get domains() {
    return this.createWebForm.get('domains') as FormArray;
  }
}
