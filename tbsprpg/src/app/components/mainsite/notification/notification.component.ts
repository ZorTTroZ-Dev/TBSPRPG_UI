import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {Subscription} from 'rxjs';
import {Notification} from '../../../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  notifications: Notification[];
  private toastObserver: MutationObserver;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notifications = [];
    this.subscriptions.add(
      this.notificationService.getNotifications().subscribe(notification => {
        this.notifications.push(notification);
      })
    );

    this.toastObserver = new MutationObserver((mutationRecords, mutationObserver) => {
      console.log(mutationRecords);
      for (const mutation of mutationRecords) {
        if (mutation.type === 'childList') {
          console.log(mutation);
          mutation.addedNodes.forEach((value, key) => {
            console.log(value);
          });
        }
      }
    });
    this.toastObserver.observe(document.getElementById('toaster'), {
      attributes: true, childList: true, subtree: true});
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.toastObserver.disconnect();
  }
}
