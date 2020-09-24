import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

import { User } from '../../shared/models/user.model';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  addFriend: boolean = false;
  activeView: string = "overview";
 

  countryTrafficStats: any[];
  user: any;
  // Doughnut
  doughnutChartColors: any[] = [
    {
      backgroundColor: ["#fff", "rgba(0, 0, 0, .24)"],
    },
  ];

  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, this.total1 - this.data1];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, this.total2 - this.data2];

  

  doughnutChartType = "doughnut";
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: "bottom",
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    tooltips: {
      enabled: false,
    },
  };

  constructor(private router: ActivatedRoute, public jwtAuth: JwtAuthService) {

  }

  ngOnInit() {
    this.activeView = this.router.snapshot.params["view"];
    this.user = this.jwtAuth.user$;
   

    this.countryTrafficStats = [
      {
        "id": 1,
        "name": "Marko Apostolski",
        "img": "assets/images/faces/2.jpg",
        "mutualFriends": "5 Mutual friends",
        "picked": false
        },
        {
            "id": 1,
            "name": "Sofija Apostolska",
            "img": "assets/images/faces/3.jpg",
            "mutualFriends": "5 Mutual friends",
            "picked": false
            },
            {
                "id": 1,
                "name": "Elena Ravnjanski",
                "img": "assets/images/faces/4.jpg",
                "mutualFriends": "7 Mutual friends",
                "picked": false
                },
                {
                  "id": 1,
                  "name": "Laze Apostolski",
                  "img": "assets/images/faces/5.jpg",
                  "mutualFriends": "5 Mutual friends",
                  "picked": false
                  },
                  {
                      "id": 1,
                      "name": "Pero Drakulevski",
                      "img": "assets/images/faces/9.jpg",
                      "mutualFriends": "3 Mutual friends",
                      "picked": false
                      },
                      {
                          "id": 1,
                          "name": "Robert Janakiesku ",
                          "img": "assets/images/faces/10.jpg",
                          "mutualFriends": "7 Mutual friends",
                          "picked": false
                          }
    ];
  }



}
