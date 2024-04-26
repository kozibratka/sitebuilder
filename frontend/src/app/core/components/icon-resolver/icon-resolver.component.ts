import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-resolver',
  templateUrl: './icon-resolver.component.html',
  styleUrls: ['./icon-resolver.component.css']
})
export class IconResolverComponent implements OnInit {

  @Input() name: string;
  @Input() path?: string;
  @Input() height?: string;
  @Input() fileType = '';
  fileExtension: string;
  size = 'xl';
  cla = 'classic';

  constructor() { }

  ngOnInit(): void {
    const splited = this.name.split('.');
    this.fileExtension = this.fileType !== 'dir' ? splited.pop() : 'folder';
  }

  isImage() {
    return this.fileExtension === 'jpg' || this.fileExtension === 'jpeg' || this.fileExtension === 'png';
  }

}
