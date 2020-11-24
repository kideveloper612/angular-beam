import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { JwtAuthService } from './auth/jwt-auth.service';
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  public fcmToken: string = '';
  public notifications = [];
  constructor(private angularFireMessaging: AngularFireMessaging, private jwtAuthSvc: JwtAuthService) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.usePublicVapidKey('BG6OV-inOMFlsqXQU3dyW-pm6k96-c_d3ocRQ-uohIzo9Ilqfgs7FlqlthTylEI4pQnc48ruLcqyvBqReJc5ZEE');
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onBackgroundMessage = _messaging.onBackgroundMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.fcmToken = token;
        this.jwtAuthSvc.registerFcmToken(token).subscribe();
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        this.currentMessage.next(payload);
        let item: any = {
          title: payload.notification.title,
          body: payload.notification.body,
          createdAt: new Date()
        }
        if ('payload.notification.title') { }
        switch (payload.notification.title) {
          case 'New message received':
            item = {
              ...item,
              icon: 'chat',
              route: '/inbox',
              color: 'accent'
            }
            break;
          case 'New order received':
            item = {
              ...item,
              icon: 'attach_file',
              route: '/orders',
              color: 'primary'
            }
            break;
          case 'New customer registered':
            item = {
              ...item,
              icon: 'account_box',
              route: '/users',
              color: 'warn'
            }
            break;

          default:
            break;
        }
        this.notifications.unshift(item);
      })

    // navigator.serviceWorker.onmessage = function (e) {
    //   // messages from service worker.
    //   console.log('backgroundmessage: ', e);
    // };
  }

  public markAllAsRead() {
    this.notifications = [];
  }
}