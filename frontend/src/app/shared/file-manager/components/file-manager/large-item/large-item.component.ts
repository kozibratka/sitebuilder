import {Component, HostListener, Input, OnInit, Output,  EventEmitter} from '@angular/core';

@Component({
  selector: 'app-large-item',
  templateUrl: './large-item.component.html',
  styleUrls: ['./large-item.component.css']
})
export class LargeItemComponent implements OnInit {

  @Input() file;
  @Output() lastSelected = new EventEmitter<LargeItemComponent>();
  @Output() changeDirectory = new EventEmitter<string>();
  selected = false;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  @HostListener('click')
  select() {
    this.selected = !this.selected;
    this.lastSelected.emit(this);
  }

  @HostListener('dblclick')
  dblclick() {
    this.changeDirectory.emit(this.file.name);
  }

}
