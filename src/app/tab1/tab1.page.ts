import { Component, OnInit } from '@angular/core';

import { SystemNotification, SystemNotificationListener } from 'capacitor-notificationlistener';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log('starting...');
    const sn = new SystemNotificationListener();
    sn.requestPermission();
    sn.startListening();

    sn.addListener('notificationReceivedEvent', (info: SystemNotification) => {
      console.log('notificationReceivedEvent', info);
    });
    sn.addListener('notificationRemovedEvent', (info: SystemNotification) => {
      console.log('notificationRemovedEvent', info);
    });
  }
}
