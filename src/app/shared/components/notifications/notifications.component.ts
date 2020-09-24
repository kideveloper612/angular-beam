import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;

  // Dummy notifications
  notifications = [{
    title: 'Peter Monson',
    message: 'Lets have a lunch tomorrow at 5pm',
    image: 'assets/images/face-1.jpg',
    time: '3 min ago',
    route: '/inbox',
    color: 'primary'
  }, {
    title: 'Simon St Lagger',
    message: 'Dont forget to call me after you finish your call',
    image: 'assets/images/face-2.jpg',
    time: '55 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    title: 'Marko Apostolski',
    message: 'Max call me and told me about your exam.',
    image: 'assets/images/face-3.jpg',
    time: '12 min ago',
    route: '/charts',
    color: 'warn'
  }, {
    title: 'Simon St Lagger',
    message: 'Dont forget to call me after you finish your call',
    image: 'assets/images/face-4.jpg',
    time: '55 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    title: 'Simon St Lagger',
    message: 'Dont forget to call me after you finish your call',
    image: 'assets/images/face-5.jpg',
    time: '55 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    title: 'Simon St Lagger',
    message: 'Dont forget to call me after you finish your call',
    image: 'assets/images/face-6.jpg',
    time: '55 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    title: 'Simon St Lagger',
    message: 'Dont forget to call me after you finish your call',
    image: 'assets/images/face-7.jpg',
    time: '55 min ago',
    route: '/chat',
    color: 'accent'
  }]

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.notificPanel.close();
        }
    });
  }
  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
}
