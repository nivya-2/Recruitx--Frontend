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

@Component({
  selector: 'app-notification',
  imports: [DropdownModule,
    PaginatorModule,
    AvatarModule,
    FormsModule,
    CardModule, NgFor, CardsComponent, InputTextModule,
    CardModule, TabViewModule,
    AvatarModule, CommonModule, ButtonComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
// export class NotificationComponent implements OnInit {
//   notifications: any[] = [];
//   paginatedNotifications: any[] = [];
//   first: number = 0;

//   sortOptions = [
//     { label: 'Latest first', value: 'latest' },
//     { label: 'Oldest first', value: 'oldest' }
//   ];
//   selectedSort = 'latest';

//   ngOnInit() {
//     // Mock notifications
//     this.notifications = Array.from({ length: 25 }, (_, i) => ({
//       title: 'New JR!',
//       message: 'Hey Everyone, new JR alert! A new JR is awaiting to be assigned.',
//       avatar: 'assets/avatar.png'
//     }));
//     this.paginate(0);
//   }

//   onPageChange(event: any) {
//     this.first = event.first;
//     this.paginate(this.first);
//   }

//   paginate(startIndex: number) {
//     this.paginatedNotifications = this.notifications.slice(startIndex, startIndex + 6);
//   }
// }
// export class NotificationComponent implements OnInit {
//   notifications: any[] = [];
//   groupedNotifications: any[] = [];
//   searchTerm: string = '';
//   activeTabIndex: number = 0;

//   ngOnInit() {
//     this.notifications = [
//       { title: 'New JR!', message: 'A new JR is awaiting to be assigned.', avatar: 'assets/avatar.png', date: new Date(), read: false },
//       { title: 'Reminder', message: 'Feedback pending from 3 candidates.', avatar: 'assets/avatar.png', date: new Date(Date.now() - 86400000), read: true },
//       { title: 'Update', message: 'Job description updated.', avatar: 'assets/avatar.png', date: new Date(Date.now() - 3 * 86400000), read: false },
//     ];

//     this.filterNotifications();
//   }

//   onTabChange(index: number) {
//     this.activeTabIndex = index;
//     this.filterNotifications();
//   }

//   filterNotifications() {
//     let filtered = this.notifications;

//     if (this.activeTabIndex === 1) {
//       filtered = filtered.filter(n => !n.read); // Unread
//     } else if (this.activeTabIndex === 2) {
//       filtered = filtered.filter(n => n.read); // Read
//     }

//     if (this.searchTerm) {
//       const term = this.searchTerm.toLowerCase();
//       filtered = filtered.filter(n =>
//         n.title.toLowerCase().includes(term) || n.message.toLowerCase().includes(term)
//       );
//     }

//     this.groupedNotifications = this.groupByDate(filtered);
//   }

//   groupByDate(notifs: any[]) {
//     const groups: any = {};

//     for (let notif of notifs) {
//       const dateLabel = this.getDateLabel(notif.date);

//       if (!groups[dateLabel]) {
//         groups[dateLabel] = [];
//       }

//       groups[dateLabel].push(notif);
//     }

//     return Object.keys(groups).map(label => ({
//       label,
//       notifications: groups[label]
//     }));
//   }

//   getDateLabel(date: Date) {
//     const today = new Date();
//     const notifDate = new Date(date);
//     const diff = (today.setHours(0,0,0,0) - notifDate.setHours(0,0,0,0)) / 86400000;

//     if (diff === 0) return 'Today';
//     if (diff === 1) return 'Yesterday';
//     return notifDate.toLocaleDateString();
//   }
// }

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


  // filterNotifications() {
  //   let filtered = this.notifications;

  //   // Tab-based filter
  //   if (this.activeTabIndex === 1) {
  //     filtered = filtered.filter(n => !n.read); // Unread
  //   } else if (this.activeTabIndex === 2) {
  //     filtered = filtered.filter(n => n.read); // Read
  //   }

  //   // Search filter
  //   if (this.searchTerm) {
  //     const term = this.searchTerm.toLowerCase();
  //     filtered = filtered.filter(n =>
  //       n.title.toLowerCase().includes(term) || n.message.toLowerCase().includes(term)
  //     );
  //   }

  //   this.groupNotifications(filtered);
  // }

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
