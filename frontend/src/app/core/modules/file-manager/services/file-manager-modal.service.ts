import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {FileManagerEvent} from '../interfaces/file-manager-event';
import {FileManagerDialogComponent} from '../components/file-manager-dialog/file-manager-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FileManagerModalService {

  constructor(
    private dialog: MatDialog,
  ) { }

  open(): Subject<FileManagerEvent> {
    const config = new MatDialogConfig();
    config.minWidth = '55vw';
    config.minHeight = '27vw';
    config.position = {top: '100px'};
    const dialogRef = this.dialog.open(FileManagerDialogComponent, config);
    return dialogRef.componentInstance.fileManagerEventSubject;
  }
}
