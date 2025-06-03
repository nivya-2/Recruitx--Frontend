import { Component, ElementRef,HostListener ,Input, Output, EventEmitter} from '@angular/core';
import { ProfileComponent } from '../../ui/profile/profile.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-notificationbox',
  imports: [ProfileComponent, NgFor,NgIf],
  templateUrl: './notificationbox.component.html',
  styleUrl: './notificationbox.component.scss'
})
export class NotificationboxComponent {
  @Input() notifications: any[] = [];
  @Output() markRead = new EventEmitter<void>();

  onMarkAllAsRead() {
    this.markRead.emit();
  }
}
