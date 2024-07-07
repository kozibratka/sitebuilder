import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-icon-resolver',
  standalone: true,
  templateUrl: './icon-resolver.component.html',
  imports: [
    CommonModule,
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
    { type: "docx", icon: "fas fa-file-word" },
    { type: "xlsx", icon: "fas fa-file-excel" },
    { type: "pdf", icon: "fas fa-file-pdf" },
    { type: "jpg", icon: "fas fa-file-image" },
    { type: "folder", icon: "fa fa-folder" }
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
    let obj = this.iconList.filter(row => {
      if (row.type === ext) {
        return true;
      }
      return false;
    });
    if (obj.length > 0) {
      return obj[0].icon;
    } else {
      return "";
    }
  }

}
