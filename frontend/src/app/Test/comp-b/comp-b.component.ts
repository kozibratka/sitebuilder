import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {SerAService} from "../services/ser-a.service";
import {SerBService} from "../services/ser-b.service";

@Component({
  selector: 'app-comp-b',
  standalone: true,
  imports: [],
  templateUrl: './comp-b.component.html',
  styleUrl: './comp-b.component.css',
  providers: [SerAService, SerBService]
})
export class CompBComponent {
  data = '';
  @ViewChild('content', {read: ViewContainerRef,static: true}) content: ViewContainerRef;

  constructor(
  ) {
  }

  ngAfterContentChecked(): void {
    console.log(this.content);
    console.log('ngAfterContentChecked B')
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked B')
  }

  ngOnInit(): void {
    console.log('ngOnInit B')
  }
}
