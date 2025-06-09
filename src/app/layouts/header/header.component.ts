import { NgIf } from '@angular/common';
import { Component,ElementRef,HostListener,Input, OnInit } from '@angular/core';
import { ProfileBoxComponent } from '../../ui/profile-box/profile-box.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { NotificationboxComponent } from '../../shared-components/notificationbox/notificationbox.component';
import { Popover } from 'primeng/popover';
import { LogoutApiService } from '../../core/services/api/logout-api.service';
import { UserApiService } from '../../core/services/api/user-api-service.service';

@Component({
  selector: 'app-header',
  imports: [NgIf,HeaderTextComponent,ProfileBoxComponent,IconComponent, NotificationboxComponent, Popover],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() name: string = 'Arthur Pendragon';
  @Input() role: string = 'Recruiter Head';
  @Input() search = true;
  showNotifications = false;

  notifications = [
    { id: 1, message: 'Hiring Manager Arjun Menon uploaded a new JR.', read: false, sender: 'Arjun Menon', role: 'Hiring Manager' },
    { id: 2, message: 'Recruiter Lead Deepak Sharma generated a new JD.', read: false, sender: 'Deepak Sharma', role: 'Recruiter Lead' },
    { id: 3, message: 'Hiring Manager John Roy uploaded a new JR.', read: true, sender: 'John Roy', role: 'Hiring Manager' },
  ];
  ngOnInit(): void {
    this.userapi.getLoggedInUserProfile().subscribe({
  next: (profile) => {console.log(profile)
    this.name = profile.name
  .split('.')
  .map(part => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ');;
    this.role = profile.role;
  },
  error: (err) => console.error(err.message)
});

  }
  constructor(private eRef: ElementRef , private logoutApiService: LogoutApiService,private userapi: UserApiService) {}

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


logout() {
  // Implement logout logic here
  this.logoutApiService.logout();
  console.log('Logging out...');
}

}
