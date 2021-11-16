export class Notification {
  id: any;
  text: string;
  group: string;
  color: string = '#F4F4F4';
  data: any;
  icon: string = 'https://munatasks.com/assets/icon/favicon.png';
  smallIcon: string = 'res://notification-logo';
  led: string = 'FA962A';
  trigger: {
    at: Date;
  };
  sound: string = null;
  timeoutAfter: number = null;
  attachments: string[] = [];
  vibrate: boolean = true;
  foreground: boolean = true;
}
