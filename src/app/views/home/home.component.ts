import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
// import PerfectScrollbar from 'perfect-scrollbar';
import { LayoutService } from 'app/shared/services/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  public mainVersion;
  /****** Only for demo) **********/
  public versions: any[] = [
    {
      name: 'Dark sidebar',
      photo: 'assets/images/s1.jpg',
      dest: 'dashboard/default',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "sidebarColor": "slate",
        "topbarColor": "white",
        "footerColor": "slate",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "marco-teal"
      }`
    }, {
      name: 'Light Sidebar',
      photo: 'assets/images/s10.jpg',
      dest: 'dashboard/default',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "sidebarColor": "white",
        "topbarColor": "white",
        "footerColor":"slate",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "marco-blue"
      }`
    },
    {
      name: 'Dark Theme',
      photo: 'assets/images/s12.jpg',
      dest: 'dashboard/crypto',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "marco-dark"
      }`
    },
    {
      name: 'RTL (Top Nav)',
      photo: 'assets/images/s12.jpg',
      dest: 'profile/settings',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "full",
        "dir": "rtl",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple"
      }`
    },
    // {
    //   name: 'Dark Purple',
    //   photo: 'assets/images/screenshots/dark-purple-title.png',
    //   dest: 'dashboard',
    //   conf: `{
    //     "navigationPos": "side",
    //     "sidebarStyle": "full",
    //     "dir": "ltr",
    //     "useBreadcrumb": true,
    //     "topbarFixed": true,
    //     "breadcrumb": "simple"
    //   }`,
    //   theme: `{
    //     "name": "marco-dark"
    //   }`
    // },
    // {
    //   name: 'Dark Pink',
    //   photo: 'assets/images/screenshots/dark-pink-title.png',
    //   dest: 'dashboard',
    //   conf: `{
    //     "navigationPos": "side",
    //     "sidebarStyle": "full",
    //     "dir": "ltr",
    //     "useBreadcrumb": true,
    //     "topbarFixed": true,
    //     "breadcrumb": "simple"
    //   }`,
    //   theme: `{
    //     "name": "marco-dark-pink"
    //   }`
    // },
    // {
    //   name: 'Light Blue',
    //   photo: 'assets/images/screenshots/light-blue-title.png',
    //   dest: 'dashboard',
    //   conf: `{
    //     "navigationPos": "side",
    //     "sidebarStyle": "full",
    //     "dir": "ltr",
    //     "useBreadcrumb": true,
    //     "topbarFixed": true,
    //     "breadcrumb": "simple"
    //   }`,
    //   theme: `{
    //     "name": "marco-blue"
    //   }`
    // }
  ]

  // private homePS: PerfectScrollbar;
  constructor(
    private router: Router,
    private loader: AppLoaderService,
    public layout: LayoutService
  ) { }

  ngOnInit() {
    this.mainVersion = this.versions[0]
  }

  ngOnDestroy() {
    // if (this.homePS) this.homePS.destroy();
    this.loader.close();
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.homePS = new PerfectScrollbar('.scrollable')
    // });
  }

  /****** Remove this (Only for demo) **********/
  goToDashboard(v) {
    let origin = window.location.origin;
    
    window.location.href = `${origin}/${v.dest}/?layout=${v.conf}`;
  }
  goToMainDash() {
    this.loader.open();
    this.router.navigateByUrl('/dashboard/default')
  }
}
