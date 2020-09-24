import { Component, OnInit, ViewChild } from '@angular/core';
import { marcoAnimations } from 'app/shared/animations/marco-animations';
import { ThemeService } from 'app/shared/services/theme.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import tinyColor from 'tinycolor2';
import { series } from "./data";

import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexGrid,
} from "ng-apexcharts";

export interface PeriodicElement {
  orderNo: string,
    projectName: string,
    startDate: string,
    endDate: string,
    status: string,
    color: string,
    operator: string,
}
const ELEMENT_DATA: PeriodicElement[] = [
    {
    orderNo: "#678788",
    projectName: 'MarcoUI jQuery',
    startDate: '23/07/2019',
    endDate: '12/10/2018',
    status: 'Released',
    color: 'badge-success',
    operator: 'M. Apostolski'
  },
  {
    orderNo: "#678788",
    projectName: 'MarcoUI jQuery',
    startDate: '23/07/2019',
    endDate: '12/10/2018',
    status: 'Review',
    color: 'badge-review',
    operator: 'S. Apostolska'
  },
  {
    orderNo: "#678788",
    projectName: 'MarcoUI jQuery',
    startDate: '23/07/2019',
    endDate: '12/10/2018',
    status: 'Pending',
    color: 'badge-pending',
    operator: 'E. Ravnjanski'
  },
  {
    orderNo: "#678788",
    projectName: 'MarcoUI jQuery',
    startDate: '23/07/2019',
    endDate: '12/10/2018',
    status: 'Releised',
    color: 'badge-success',
    operator: 'L. Apostolski'
  },
  {
    orderNo: "#678788",
    projectName: 'MarcoUI jQuery',
    startDate: '23/07/2019',
    endDate: '12/10/2018',
    status: 'Releised',
    color: 'badge-success',
    operator: 'L. Apostolski'
  }
];

// this.activeTrades = [
//   {
//     orderNo: "#678788",
//     projectName: 'MarcoUI jQuery',
//     startDate: '23/07/2019',
//     endDate: '12/10/2018',
//     status: 'Released',
//     color: 'badge-success',
//     operator: 'M. Apostolski'
//   },
//   {
//     orderNo: "#678788",
//     projectName: 'MarcoUI jQuery',
//     startDate: '23/07/2019',
//     endDate: '12/10/2018',
//     status: 'Review',
//     color: 'badge-review',
//     operator: 'S. Apostolska'
//   },
//   {
//     orderNo: "#678788",
//     projectName: 'MarcoUI jQuery',
//     startDate: '23/07/2019',
//     endDate: '12/10/2018',
//     status: 'Pending',
//     color: 'badge-pending',
//     operator: 'E. Ravnjanski'
//   },
//   {
//     orderNo: "#678788",
//     projectName: 'MarcoUI jQuery',
//     startDate: '23/07/2019',
//     endDate: '12/10/2018',
//     status: 'Releised',
//     color: 'badge-success',
//     operator: 'L. Apostolski'
//   },
//   {
//     orderNo: "#678788",
//     projectName: 'MarcoUI jQuery',
//     startDate: '23/07/2019',
//     endDate: '12/10/2018',
//     status: 'Releised',
//     color: 'badge-success',
//     operator: 'L. Apostolski'
//   }
// ];


export type ChartOptionsThree = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
};
export type CustomerOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  grid: ApexGrid;
};
export type CustomerOptionsTwo = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
export type RadialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};
@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.scss'],
  animations: marcoAnimations
})
export class DefaultDashboardComponent implements OnInit {
contacts: any[];
  activeTrades: any[];
  trafficSourcesChart: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild("chart") chart: ChartComponent;

  public chartOptionsThree: Partial<ChartOptionsThree>;
  public customerOptions: Partial<CustomerOptions>;
  public customerOptionsTwo: Partial<CustomerOptionsTwo>;
  public RadialChartOptions: Partial<RadialChartOptions>;
  


  sharedChartOptions: any = {
    responsive: true,
    // maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom'
    }
  };
  setBarColor(theme) {
    this.lineBarColors =  [{
      backgroundColor: tinyColor(theme.baseColor).setAlpha(1),
      borderColor: '#3f51b5',
      pointBackgroundColor: '#3f51b5',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }, {
      backgroundColor: '#eeeeee',
      borderColor: '#e0e0e0',
      pointBackgroundColor: '#e0e0e0',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }, {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];
  }
  fill: {
    colors: ['#F44336', '#E91E63', '#9C27B0']
  }
  lineChartSteppedData: Array <any> = [{
    data: [4, 6, 4, 8, 4, 4, 9],
    label: 'Order',
    borderWidth: 0,
    fill: true,
    // steppedLine: true
  }, {
    data: [3, 5, 9, 4, 8, 2, 4],
    label: 'New client',
    borderWidth: 1,
    fill: true,
    // steppedLine: true
  }];
  public lineChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'];
  /*
  * Full width Chart Options
  */
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  };


 

 /*
  * Bar Chart
  */
 barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7'];
 barChartType = 'bar';
 barChartLegend = true;
 barChartData: any[] = [{
   data: [2, 6, 7, 8, 4, 5, 5],
   label: 'Series A',
   borderWidth: 0
 }, {
   data: [5, 4, 4, 3, 6, 2, 5],
   label: 'Series B',
   borderWidth: 0
 }];
 barChartOptions: any = Object.assign({
   scaleShowVerticalLines: false,
   scales: {
     xAxes: [{
       gridLines: {
         color: 'rgba(0,0,0,0.02)',
         zeroLineColor: 'rgba(0,0,0,0.02)'
       }
     }],
     yAxes: [{
       gridLines: {
         color: 'rgba(0,0,0,0.02)',
         zeroLineColor: 'rgba(0,0,0,0.02)'
       },
       position: 'left',
       ticks: {
         beginAtZero: true,
         suggestedMax: 9
       }
     }]
   }
 }, this.sharedChartOptions);




  public lineChartColors: Array<any> = [];
  public lineBarColors: Array<any> = [];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
  

  // Chart grid options
  doughnutChartColors1: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)',]
  }];
    doughnutChartColors2: any[] = [{
    backgroundColor: ['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .15)',]
  }];
  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2: number = 600;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];
  doughnutLabels = ['Spent', 'Remaining']
  doughnutChartType = 'doughnut';
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    tooltips: {
      enabled: true
    }
  };

  photos = [{
    name: 'Photo 1',
    url: 'assets/images/sq-15.jpg'
  }, {
    name: 'Photo 2',
    url: 'assets/images/sq-8.jpg'
  }, {
    name: 'Photo 3',
    url: 'assets/images/sq-9.jpg'
  }, {
    name: 'Photo 4',
    url: 'assets/images/sq-10.jpg'
  }, {
    name: 'Photo 5',
    url: 'assets/images/sq-11.jpg'
  }, {
    name: 'Photo 6',
    url: 'assets/images/sq-12.jpg'
  }]
  tickets = [{
    img: 'assets/images/face-1.jpg',
    name: 'Mike Dake',
    text: 'Excerpt pipe is used.',
    date: new Date('07/12/2017'),
    isOpen: true
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Doe',
    text: 'My dashboard is not working.',
    date: new Date('07/7/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-3.jpg',
    name: 'Jhonson lee',
    text: 'Fix stock issue',
    date: new Date('04/10/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-4.jpg',
    name: 'Mikie Jyni',
    text: 'Renew my subscription.',
    date: new Date('07/7/2017'),
    isOpen: false
  }]
  // users
  users = [
    {
      "name": "Snow Benton",
      "membership": "Paid Member",
      "phone": "+1 (956) 486-2327",
      "photo": "assets/images/face-4.jpg",
      "address": "329 Dictum Court, Minnesota",
      "registered": "2016-07-09"
    },
    {
      "name": "Kay Sellers",
      "membership": "Paid Member",
      "phone": "+1 (929) 406-3172",
      "photo": "assets/images/face-2.jpg",
      "address": "893 Garden Place, American Samoa",
      "registered": "2017-02-16"
    }
  ]

  projects = [{
    name: 'User Story',
    user: 'Watson Joyce',
    progress: 100,
    leader: 'Snow Benton'
  }, {
    name: 'Design Data Model',
    user: 'Morris Adams',
    progress: 30,
    leader: 'Watson Joyce'
  }, {
    name: 'Develop CR Algorithm',
    user: 'Jhone Doe',
    progress: 70,
    leader: 'Ada Kidd'
  }, {
    name: 'Payment Module',
    user: 'Ada Kidd',
    progress: 50,
    leader: 'Snow Benton'
  }, {
    name: 'Discount Module',
    user: 'Workman Floyd',
    progress: 50,
    leader: 'Robert Middleton'
  }]

  constructor(
    private themeService: ThemeService
  ) { 
    this.customerOptionsTwo = {
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        height: 150,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB"
     
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["John", "Doe"],
          ["Joe", "Smith"],
          ["Jake", "Williams"],
          "Amber",
          ["Peter", "Brown"],
          ["Mary", "Evans"],
          ["David", "Wilson"],
          ["Lily", "Roberts"]
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };
   
    this.customerOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 251, 49, 62, 69, 91, 248]
        }
      ],
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 3,
        dashArray: 0
      },
      fill: {
        colors: ['#F44336', '#E91E63', '#9C27B0']
      },
      chart: {
        height: 130,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },

      grid: {
        borderColor: "#fff",
        strokeDashArray: 0,
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0
        }
      },
      xaxis: {
        categories: {
          enabled: true
        },
        tooltip: {
          enabled: false
        }
      }
    };


    this.chartOptionsThree = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 380,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      fill: {
        colors: ['#e8f519', '#e8f519']
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };


    this.RadialChartOptions = {
      series: [76, 67, 61, 90],
      chart: {
        height: 290,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.setChartColor(activeTheme);
      this.setBarColor(activeTheme);
    });
    this.setChartColor(this.themeService.activatedTheme);  
    this.setBarColor(this.themeService.activatedTheme);  

      this.themeService.onThemeChange.subscribe(activeTheme => {
        this.initTrafficSourcesChart(activeTheme)
      });

      this.initTrafficSourcesChart(this.themeService.activatedTheme)
     

      

      
      this.contacts = [
        {
          name: "Dino Donel",
          avatar: "assets/images/faces/13.jpg",
          status: "online",
          message: "You did great with the last presentation, looking forward to working with you on the next project.",
          time: "11min ago",
          mood: ""
        },
        {
          name: "Jasmin Sugare",
          avatar: "assets/images/faces/16.jpg",
          status: "offline",
          message: "It was a trap, we don't beleve that",
          time: "2 hours ago",
          mood: ""
        },
        {
          name: "Elena Ravnjanski",
          avatar: "assets/images/faces/10.jpg",
          status: "online",
          message: "Looking forward to seeing you, We will have wanderful time together",
          time: "3 hours ago",
          mood: ""
        },
        {
          name: "Marko Apostolski",
          avatar: "assets/images/faces/9.jpg",
          status: "offline",
          message: "Marko is an awesome guy, he is really polite",
          time: "2 days ago",
          mood: ""
        },
        {
          name: "Laze Apostolski",
          avatar: "assets/images/faces/5.jpg",
          status: "offline",
          message: "What are your plans for tomorrow night? How about to go on a drink?",
          time: "2 days ago",
          mood: ""
        }
      ];
  }




  initTrafficSourcesChart(theme) {
    this.trafficSourcesChart = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: [
        tinyColor(theme.baseColor).setAlpha(.6).toString(),
        tinyColor(theme.baseColor).setAlpha(.7).toString(),
        tinyColor(theme.baseColor).setAlpha(.8).toString()
      ],
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["55%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "normal",
                color: "rgba(76, 175, 229, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 235,
              name: "Direct"
            },
            {
              value: 110,
              name: "Search Eng."
            },
            { value: 148, name: "Social" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(76, 175, 229, 1)"
            }
          }
        }
      ]
    };
  }
  setChartColor(theme) {
    console.log(theme);
    
    this.lineChartColors = [{
      backgroundColor: tinyColor(theme.baseColor).setAlpha(.6),
      borderColor: tinyColor(theme.baseColor).setAlpha(1),
      pointBackgroundColor: tinyColor(theme.baseColor).setAlpha(.4),
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointHoverBackgroundColor: theme.baseColor,
      pointHoverBorderColor: theme.baseColor
    }, {
      backgroundColor: 'rgba(219, 166, 166, .5)',
      borderColor: 'rgba(219, 166, 166, 1)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0.06)',
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.1)',
      pointHoverBorderColor: 'rgba(0, 0, 0, 0)'
    }]    
  }

   // Dummy notifications
   notifications = [{
    message: 'New orders received',
    icon: 'assignment_ind',
    route: '/inbox',
    color: 'primary'
  }, {
    message: 'New costumer has registered',
    icon: 'chat',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'Project has been appoved',
    icon: 'settings_backup_restore',
    route: '/charts',
    color: 'warn'
  }, {
    message: 'Task has been finished',
    icon: 'account_box',
    route: '/chat',
    color: 'accent'
  }]


}
