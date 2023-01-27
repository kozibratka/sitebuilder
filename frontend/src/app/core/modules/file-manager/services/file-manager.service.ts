import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {FileManagerEvent} from '../interfaces/file-manager-event';
import {FileManagerDialogComponent} from '../components/file-manager-dialog/file-manager-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(
    private dialog: MatDialog,
  ) { }

  open(): Subject<FileManagerEvent> {
    const dialogRef = this.dialog.open(FileManagerDialogComponent);
    return dialogRef.componentInstance.fileManagerEventSubject;
  }
}
