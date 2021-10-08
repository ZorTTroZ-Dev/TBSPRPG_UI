import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  Notification,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_SUCCESS
} from '../models/notification';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationObservable: Subject<Notification>;

  constructor(private toastr: ToastrService) {
    this.notificationObservable = new Subject<Notification>();
  }

  postNotification(notification: Notification): void {
    this.notificationObservable.next(notification);
    if (notification.type === NOTIFICATION_TYPE_SUCCESS) {
      this.toastr.success(notification.message);
    } else if (notification.type === NOTIFICATION_TYPE_INFO) {
      this.toastr.info(notification.message);
    } else if (notification.type === NOTIFICATION_TYPE_ERROR) {
      this.toastr.error(notification.message);
    }
  }

  getNotifications(): Observable<Notification> {
    return this.notificationObservable.asObservable();
  }
}
