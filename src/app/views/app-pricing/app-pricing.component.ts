import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as hopscotch from 'hopscotch';

@Component({
  selector: 'app-app-pricing',
  templateUrl: './app-pricing.component.html',
  styleUrls: ['./app-pricing.component.css']
})
export class AppTourComponent implements OnInit {
  isAnnualSelected: boolean = false;
  constructor() { }

  ngOnInit() {}

}
