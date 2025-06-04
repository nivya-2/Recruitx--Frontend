import { NgIf } from '@angular/common';
import { Component,ElementRef,HostListener,Input } from '@angular/core';
import { ProfileBoxComponent } from '../../ui/profile-box/profile-box.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { NotificationboxComponent } from '../../shared-components/notificationbox/notificationbox.component';

@Component({
  selector: 'app-header',
  imports: [NgIf,HeaderTextComponent,ProfileBoxComponent,IconComponent, NotificationboxComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() name: string = 'Arthur Pendragon';
  @Input() role: string = 'Recruiter Head';
  @Input() search = true;
  showNotifications = false;

  notifications = [
    { id: 1, message: 'Hiring Manager Arjun Menon uploaded a new JR.', read: false, sender: 'Arjun Menon', role: 'Hiring Manager' },
    { id: 2, message: 'Recruiter Lead Deepak Sharma generated a new JD.', read: false, sender: 'Deepak Sharma', role: 'Recruiter Lead' },
    { id: 3, message: 'Hiring Manager John Roy uploaded a new JR.', read: true, sender: 'John Roy', role: 'Hiring Manager' },
  ];

  constructor(private eRef: ElementRef) {}

  toggleNotifications(event: MouseEvent): void {
    event.stopPropagation(); // Prevents closing immediately
    this.showNotifications = !this.showNotifications;
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
  }

  get hasUnread(): boolean {
    return this.notifications.some(n => !n.read);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showNotifications = false;
    }
  }


}
