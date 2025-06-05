import { Component, ElementRef,HostListener ,Input, Output, EventEmitter} from '@angular/core';
import { ProfileComponent } from '../../ui/profile/profile.component';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from "../../ui/modal/modal.component";
import { NotificationComponent } from "../../pages/notification/notification.component";

@Component({
  selector: 'app-notificationbox',
  imports: [ProfileComponent, NgFor, NgIf, ModalComponent, NotificationComponent],
  templateUrl: './notificationbox.component.html',
  styleUrl: './notificationbox.component.scss'
})
export class NotificationboxComponent {
  @Input() notifications: any[] = [];
  @Output() markRead = new EventEmitter<void>();
  visible: boolean = false;

  onMarkAllAsRead() {
    this.markRead.emit();
  }
  openModal(event?: MouseEvent) {
  if (event) {
    event.stopPropagation(); // Prevent the header's HostListener from firing
  }
  this.visible = !this.visible;
}
}
