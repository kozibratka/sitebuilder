import { Component, OnInit } from '@angular/core';
import {FileManagerComponent} from "../../../core/modules/file-manager/components/file-manager/file-manager.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-file',
  standalone: true,
  templateUrl: './file.component.html',
  imports: [
    CommonModule,
    FileManagerComponent
  ],
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
