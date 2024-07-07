import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-select-template',
  standalone: true,
  templateUrl: './select-template.component.html',
  imports: [
    CommonModule,
    RouterLink
  ],
  styleUrls: ['./select-template.component.css']
})
export class SelectTemplateComponent implements OnInit{
  templates: any;
  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.templates = data['templates'];
    });
  }
}
