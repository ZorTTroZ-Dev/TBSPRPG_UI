import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.notificationService.getNotifications().subscribe(notification => {
        console.log(notification);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
