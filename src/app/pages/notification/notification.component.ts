import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { CardsComponent } from '../../ui/cards/cards.component';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ButtonComponent } from '../../ui/button/button.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';

@Component({
  selector: 'app-notification',
  imports: [DropdownModule,
    PaginatorModule,
    AvatarModule,
    FormsModule,
    CardModule, NgFor, CardsComponent, InputTextModule,IconComponent,HeaderTextComponent,
    CardModule, TabViewModule,
    AvatarModule, CommonModule, ButtonComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})

export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  groupedNotifications: any[] = [];
  searchTerm: string = '';
  activeTabIndex: number = 0;

  ngOnInit() {
    this.notifications = [
      {
        title: 'New JR!',
        message: 'A new JR is awaiting to be assigned.',
        avatar: 'assets/avatar.png',
        date: new Date(),
        read: false
      },
      {
        title: 'Reminder',
        message: 'Feedback pending from 3 candidates.',
        avatar: 'assets/avatar.png',
        date: new Date(Date.now() - 86400000),
        read: true
      },
      {
        title: 'Update',
        message: 'Job description updated.',
        avatar: 'assets/avatar.png',
        date: new Date(Date.now() - 3 * 86400000),
        read: false
      }
    ];

    this.filterNotifications();
  }

  onTabChange(index: number) {
    this.activeTabIndex = index;
    this.filterNotifications();
  }
  filteredNotifications: any[] = [];

filterNotifications() {
  let filtered = this.notifications;

  if (this.activeTabIndex === 1) {
    filtered = filtered.filter(n => !n.read);
  } else if (this.activeTabIndex === 2) {
    filtered = filtered.filter(n => n.read);
  }

  if (this.searchTerm) {
    const term = this.searchTerm.toLowerCase();
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(term) || n.message.toLowerCase().includes(term)
    );
  }

  this.filteredNotifications = filtered;
}

  groupNotifications(notifs: any[]) {
    const groups: { [key: string]: any } = {};

    for (let notif of notifs) {
      const label = this.getGroupLabel(notif.date);

      if (!groups[label]) {
        groups[label] = {
          label,
          collapsed: label !== 'Today', // Collapse older groups by default
          notifications: []
        };
      }

      groups[label].notifications.push(notif);
    }

    this.groupedNotifications = Object.values(groups);
  }

  getGroupLabel(date: Date): string {
    const today = new Date();
    const notifDate = new Date(date);
    const isToday = today.toDateString() === notifDate.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const isYesterday = yesterday.toDateString() === notifDate.toDateString();

    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';

    return notifDate.toLocaleDateString();
  }

  toggleGroupCollapse(group: any) {
    group.collapsed = !group.collapsed;
  }

  markAsRead(notif: any) {
    notif.read = true;
    this.filterNotifications();
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.filterNotifications();
  }
}
