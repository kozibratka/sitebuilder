import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-large-item',
  templateUrl: './large-item.component.html',
  styleUrls: ['./large-item.component.css']
})
export class LargeItemComponent implements OnInit {

  @Input() file;

  constructor() { }

  ngOnInit(): void {
  }

}
