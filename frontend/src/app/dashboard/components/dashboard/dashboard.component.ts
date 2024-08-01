import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {SymfonyApiClientService} from "../../../core/services/api/symfony-api/symfony-api-client.service";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    DatePipe,
    ChartModule
  ]
})
export class DashboardComponent implements OnInit {
  data = [];
  displayedColumns: string[] = ['web', 'createdAt', 'pagesCount', 'public', 'domain'];
  isLoadingResults = true;
  chartData: any;
  chartOptions: any;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private symfonyApiClientService: SymfonyApiClientService
  ) {

  }

  ngOnInit(): void {
    this.initDiskChart();
    this.isLoadingResults = true;
    this.symfonyApiClientService.get<any[]>('web_list_info').subscribe(value => {
      this.data = value.body;
      this.isLoadingResults = false;
    });
  }

  initDiskChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.chartData = {
      labels: ['Volné', 'Využito'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

}
