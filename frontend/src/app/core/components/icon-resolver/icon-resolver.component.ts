import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {faFile, faFileImage, faFilePdf, faFileWord, faFolder, faHouseCrack} from "@fortawesome/free-solid-svg-icons";
import {faFileExcel} from "@fortawesome/free-solid-svg-icons/faFileExcel";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-icon-resolver',
  standalone: true,
  templateUrl: './icon-resolver.component.html',
  imports: [
    CommonModule,
    FaIconComponent,
    // FileIconsModule
  ],
  styleUrls: ['./icon-resolver.component.css']
})
export class IconResolverComponent implements OnInit {

  @Input() name: string;
  @Input() path?: string;
  @Input() height?: string;
  @Input() fileType = '';
  fileExtension?: string;
  size = 'xl';
  cla = 'classic';

  iconList = [ // array of icon class list based on type
    { type: "docx", icon: faFileWord },
    { type: "xlsx", icon: faFileExcel },
    { type: "xls", icon: faFileExcel },
    { type: "pdf", icon: faFilePdf },
    { type: "jpg", icon: faFileImage },
    { type: "folder", icon: faFolder }
  ];

  constructor() { }

  ngOnInit(): void {
    const splited = this.name.split('.');
    this.fileExtension = this.fileType !== 'dir' ? splited.pop() : 'folder';
  }

  isImage() {
    return this.fileExtension === 'jpg' || this.fileExtension === 'jpeg' || this.fileExtension === 'png';
  }

  getFileExtension(extension) { // this will give you icon class name
    let ext = extension
    let obj = this.iconList.find(row => {
      if (row.type === ext) {
        return true;
      }
      return false;
    });
    if (obj) {
      return obj.icon;
    } else {
      return faFile;
    }
  }

  protected readonly faHouseCrack = faHouseCrack;
}
