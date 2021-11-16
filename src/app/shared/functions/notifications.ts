/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  constructor(public localNotifications: LocalNotifications) {}

  // Função para emitir uma simples notificação, utilizando o model Notification
  async notificationSchedule(notification: Notification) {
    this.localNotifications.schedule({
      id: notification.id ?? Date.now(),
      text: notification.text,
      group: notification.group,
      color: notification.color,
      data: notification.data,
      icon: notification.icon,
      smallIcon: notification.smallIcon,
      led: notification.led,
      vibrate: notification.vibrate,
      foreground: notification.foreground,
      trigger: {
        at: notification.trigger.at ?? new Date(new Date().getTime() + 1000),
      },
      sound: notification.sound,
    });
  }

  //Função que receber um array de notificações e as emite para o notificationSchedule
  async multipleNotificationsSchedule(notifications: Notification[]) {
    for (let notification of notifications) {
      await this.notificationSchedule(notification);
    }
  }

  //Função para atualizar uma notificação já agendada
  async updateNotificationSchedule(notification: Notification) {
    return this.localNotifications.update(notification);
  }

  //Função para atualizar várias notificações
  async updateMutipleNotificationsSchedule(notifications: Notification[]) {
    for (let notification of notifications) {
      await this.updateNotificationSchedule(notification);
    }
  }

  //Função retorna uma notificação específica.
  async getNotification(id: any) {
    return this.localNotifications.get(id);
  }

  //Função para retornar todas as notificações
  async getAllNotifications() {
    return this.localNotifications.getAll();
  }

  //Função para cancelamento de todas as notificações.
  async cancelNotification(notification: Notification) {
    return this.localNotifications
      .cancel(notification.id)
      .then((res) => true)
      .catch((err) => false);
  }

  //Função para cancelamento de todos as notificações
  async cancelAllNotifications() {
    return this.localNotifications
      .cancelAll()
      .then((res) => true)
      .catch((err) => false);
  }
}
