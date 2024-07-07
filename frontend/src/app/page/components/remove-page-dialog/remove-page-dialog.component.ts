import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-remove-page-dialog',
  standalone: true,
  templateUrl: './remove-page-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogContent,
    MatDialogClose
  ],
  styleUrls: ['./remove-page-dialog.component.css']
})
export class RemovePageDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
