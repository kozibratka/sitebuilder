import {Component, HostListener, Input, OnInit, Output,  EventEmitter} from '@angular/core';
import {FileInfoInterface} from '../../../interfaces/file-info-interface';

@Component({
  selector: 'app-large-item',
  templateUrl: './large-item.component.html',
  styleUrls: ['./large-item.component.css'],
  exportAs: 'largeItemComponent'
})
export class LargeItemComponent implements OnInit {

  @Input() file: FileInfoInterface;
  @Output() lastSelected = new EventEmitter<LargeItemComponent>();
  @Output() contextMenuEmmitter = new EventEmitter<any>();
  @Output() changeDirectory = new EventEmitter<string>();
  selected = false;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  @HostListener('contextmenu', ['$event'])
  contextmenu(event: any) {
    event.stopPropagation(); event.preventDefault();
    //this.selected = true;
    this.lastSelected.emit(this);
    this.contextMenuEmmitter.emit(event);
  }

  @HostListener('dblclick')
  dblclick() {
    if (this.file.type === 'dir') {
      this.changeDirectory.emit(this.file.path);
    }
  }

}
