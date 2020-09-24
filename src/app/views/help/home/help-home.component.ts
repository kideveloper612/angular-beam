
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
@Component({
  selector: 'app-help-home',
  templateUrl: './help-home.component.html',
  styleUrls: ['./help-home.component.css']
})
export class HelpHomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;


  ngOnInit() {
  }

}
