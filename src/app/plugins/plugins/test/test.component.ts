import { Component, OnInit } from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent extends BaseAdminComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
  }

}
