import { Component, OnInit } from '@angular/core';
import {SymfonyApiClientService} from '../../../core/services/symfony-api/symfony-api-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private sf: SymfonyApiClientService) {

  }

  ngOnInit(): void {
  }

}
