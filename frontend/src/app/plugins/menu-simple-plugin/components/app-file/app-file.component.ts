import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-app-file',
  templateUrl: './app-file.component.html',
  styleUrls: ['./app-file.component.css']
})
export class AppFileComponent {
  @Input() item;
  @Input() depth;
  @Input() options;
}
