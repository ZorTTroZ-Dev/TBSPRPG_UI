import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Notification} from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationObservable: Subject<Notification>;

  constructor() {
    this.notificationObservable = new Subject<Notification>();
  }

  postNotification(notification: Notification): void {
    this.notificationObservable.next(notification);
  }

  getNotifications(): Observable<Notification> {
    return this.notificationObservable.asObservable();
  }
}
