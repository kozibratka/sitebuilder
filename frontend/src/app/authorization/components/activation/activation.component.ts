import {Component, OnInit} from '@angular/core';
import {InputFormErrorDirective} from "../../../core/directives/form-error/input-form-error/input-form-error.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SymfonyApiClientService} from "../../../core/services/api/symfony-api/symfony-api-client.service";

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [
    InputFormErrorDirective,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})
export class ActivationComponent implements OnInit{
  activated = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private symfonyApiClientService: SymfonyApiClientService
  ) {
  }

  ngOnInit(): void {
    let hash = this.activatedRoute.snapshot.paramMap.get('hash');
    setTimeout(() => {
      this.symfonyApiClientService.get('login_activation', {hash}).subscribe(value => {
        this.activated = true;
      });
    }, 3000);
  }
}
