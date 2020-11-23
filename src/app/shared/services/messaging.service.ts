import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {
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
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        // console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })

    navigator.serviceWorker.onmessage = function (e) {
      // messages from service worker.
      console.log('backgroundmessage: ', e);
    };
  }
}