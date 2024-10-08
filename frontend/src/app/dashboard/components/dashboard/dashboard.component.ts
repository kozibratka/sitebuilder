import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {SymfonyApiClientService} from "../../../core/services/api/symfony-api/symfony-api-client.service";
import {ChartModule} from "primeng/chart";
import {WebDetailResolverService} from "../../../web/services/web-detail-resolver.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    DatePipe,
    ChartModule,
    RouterLink,
    FaIconComponent
  ]
})
export class DashboardComponent implements OnInit {
  data = [];
  displayedColumns: string[] = ['web', 'createdAt', 'pagesCount', 'public', 'domain', 'id'];
  isLoadingResults = true;
  chartData: any;
  chartOptions: any;
  protected readonly faCircleCheck = faCircleCheck;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private symfonyApiClientService: SymfonyApiClientService,
    public webDetailResolverService: WebDetailResolverService,
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
    this.symfonyApiClientService.get<any>('user_storage_size').subscribe(value => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      this.chartData = {
        labels: ['Využité místo', 'Volné místo'],
        datasets: [
          {
            data: [value.body.used, value.body.size-value.body.used],
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
    });
  }

}
