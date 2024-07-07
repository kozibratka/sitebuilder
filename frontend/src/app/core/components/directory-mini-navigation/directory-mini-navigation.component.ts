import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-directory-mini-navigation',
  standalone: true,
  templateUrl: './directory-mini-navigation.component.html',
  styleUrls: ['./directory-mini-navigation.component.css'],
  imports: [
    CommonModule
  ]
})
export class DirectoryMiniNavigationComponent implements OnInit, OnChanges {

  @Input() currentPath: string;
  @Output() pathEmitter = new EventEmitter<string>();
  navigation: {name: string, path: string, realPath: string}[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const pathArray = (changes['currentPath'].currentValue as unknown as string).split('/');
    this.navigation = [];
    if (pathArray[0]) {
      pathArray.unshift('');
    }
    pathArray.forEach(value => {
      let name = '';
      let pathName = '';
      let realPath = '';
      if (!value) {
        name = 'Files';
        pathName = '';
        realPath = '';
      } else {
        name = value;
        pathName = (this.navigation.map(value1 => value1.realPath).join('/') + '/' + name).replace(/^\//g, '');
        realPath = name;
      }
      this.navigation.push({name, path: pathName, realPath});
    });
  }

  sendPath(pathName: string) {
    this.pathEmitter.emit(pathName);
  }

}
