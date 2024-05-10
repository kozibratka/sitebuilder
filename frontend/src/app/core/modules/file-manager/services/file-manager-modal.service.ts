import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {FileManagerEvent} from '../interfaces/file-manager-event';
import {FileManagerDialogComponent} from '../components/file-manager-dialog/file-manager-dialog.component';
import {filter, map} from 'rxjs/operators';
import {FileManagerService} from './file-manager.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagerModalService {

  constructor(
    private dialog: MatDialog,
    private fileManagerService: FileManagerService
  ) { }

  open(fileType: 'image' = null): Observable<FileManagerEvent> {
    const config = new MatDialogConfig();
    config.width = '55vw';
    config.minHeight = '27vw';
    config.position = {top: '100px'};
    const dialogRef = this.dialog.open(FileManagerDialogComponent, config);
    let fileManagerEventSubject: Observable<FileManagerEvent> = dialogRef.componentInstance.fileManagerEventSubject;
    if (fileType) {
      fileManagerEventSubject = fileManagerEventSubject.pipe(map<FileManagerEvent, FileManagerEvent>(event => {
        if (fileType === 'image') {
          event.files = event.files.filter(value => this.fileManagerService.isImage(value));
        }
        return event;
      }));
    }

    return fileManagerEventSubject;
  }
}
