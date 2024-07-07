import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {FileManagerEvent} from '../../interfaces/file-manager-event';
import {FileManagerComponent} from '../file-manager/file-manager.component';
import {MatDialogClose, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-file-manager-dialog',
  standalone: true,
  templateUrl: './file-manager-dialog.component.html',
  imports: [
    FileManagerComponent,
    MatDialogTitle,
    MatButton,
    MatDialogClose
  ],
  styleUrls: ['./file-manager-dialog.component.css']
})
export class FileManagerDialogComponent implements OnInit, OnDestroy {

  @ViewChild(FileManagerComponent, {static: true}) fileManagerComponent: FileManagerComponent;
  fileManagerEventSubject: Subject<FileManagerEvent> = new Subject<FileManagerEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    const selectedItems = this.fileManagerComponent.selectedItems.map(value => value.file);
    this.fileManagerEventSubject.next({eventName: 'selected', files: selectedItems});
  }

  ngOnDestroy() {
    this.fileManagerEventSubject.complete();
  }

}
