import { Component } from '@angular/core';
import {SystemInfoService} from "../../../core/services/system-info.service";

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {

  constructor(
    public systemInfoService: SystemInfoService,
  ) {
  }
}
