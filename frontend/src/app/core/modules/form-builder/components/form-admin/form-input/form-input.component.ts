import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewInputDescriptionInterface} from '../../../interfaces/new-input-description-interface';
import {StringService} from '../../../../../services/string.service';
import {BaseInput} from "../../../class/base-input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {CommonModule, NgSwitch} from "@angular/common";
import {
  AnimationHiderComponent
} from "../../../../../components/hidder/animation-hider/animation-hider/animation-hider.component";

@Component({
  selector: 'app-form-input',
  standalone: true,
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  imports: [
    CommonModule,
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    NgSwitch,
    AnimationHiderComponent,
    MatMenu,
    MatMenuContent,
    MatMenuItem
  ]
})
export class FormInputComponent {
  @Input() formData: any; // BaseInput
  @Input() isNewRowInput = false;
  @Input() isAdmin = true;

  @Output() newInput: EventEmitter<NewInputDescriptionInterface> = new EventEmitter();
  @Output() removeInput: EventEmitter<boolean> = new EventEmitter();
  @Output() updated: EventEmitter<boolean> = new EventEmitter();
  uniqueId = StringService.randomString();
  showPanel = false;


  constructor(
    public dialog: MatDialog
  ) {
  }

  addNewInput(data: NewInputDescriptionInterface) {
    this.newInput.emit(data);
  }

  deleteInput() {
    this.removeInput.emit(true);
  }

  settings() {
    const adminComponent = this.formData.getAdminComponent();
    const dialogRef = this.dialog.open(adminComponent, {
      data: this.formData,
      width: '35%',
      position: {top: '110px'}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.updated.emit(true);
      }
    });
  }
}
