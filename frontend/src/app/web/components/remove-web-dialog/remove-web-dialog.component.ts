import { Component, OnInit } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-remove-web-dialog',
  standalone: true,
  templateUrl: './remove-web-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogContent,
    MatDialogClose
  ],
  styleUrls: ['./remove-web-dialog.component.css']
})
export class RemoveWebDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
