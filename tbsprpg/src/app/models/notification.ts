export interface Notification {
  type: string;
  message: string;
}

export const NOTIFICATION_TYPE_ERROR = 'error';
export const NOTIFICATION_TYPE_SUCCESS = 'success';
export const NOTIFICATION_TYPE_INFO = 'info';
