import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {GalleryImageMiniComponent} from "../shared/gallery-image-mini/gallery-image-mini.component";
import {FontAwesomeIcons} from "../../../../../../core/constants/FontAwesomeIcons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconName} from "@fortawesome/fontawesome-common-types";

@Component({
  selector: 'app-icon-input',
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    MatTooltip,
    FaIconComponent
  ],
  templateUrl: './icon-input.component.html',
  styleUrl: './icon-input.component.css'
})
export class IconInputComponent {
  private _iconName: IconName;
  @Output() selectedIcon = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
  ) {
  }

  get iconName(): IconName {
    return this._iconName;
  }

  @Input()
  set iconName(value: IconName) {
    this._iconName = value;
  }

  openIconGallery() {
    let dialog = this.dialog.open(GalleryImageMiniComponent, {
      maxWidth: '36vw',
      minWidth: '36vw',
      maxHeight: '600px',
    });
    dialog.componentRef.instance.icons = FontAwesomeIcons;
    dialog.componentRef.instance.search$.subscribe(value => {
      dialog.componentRef.instance.icons = FontAwesomeIcons.filter(value1 => value1.iconName.includes(value));
    })
    dialog.beforeClosed().subscribe(icon => {
      if (!icon) {
        return;
      }
      this.selectedIcon.emit(icon.iconName);
    });
  }
}
