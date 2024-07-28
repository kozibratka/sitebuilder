import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {GridRowService} from "../../services/grid-row.service";

@Component({
  selector: 'app-menu-new-row',
  standalone: true,
  templateUrl: './menu-new-row.component.html',
  imports: [
    CommonModule,
    MatIcon
  ],
  styleUrls: ['./menu-new-row.component.css']
})
export class MenuNewRowComponent implements OnDestroy{
  @Output() numColumns = new EventEmitter<number>();
  @Input() rowIndex = 0;


  constructor(
    private gridRowService: GridRowService,
  ) {
    this.gridRowService.newRowMenuOpened = true;
    console.log('opened: ',this.gridRowService.newRowMenuOpened)
  }

  ngOnDestroy(): void {
    this.gridRowService.newRowMenuOpened = false;
    this.gridRowService.addRowHoverIndex = null;
    console.log('wwww')

  }
}
