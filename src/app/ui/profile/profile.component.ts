import { Component,Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-profile',
  imports: [AvatarModule,AvatarGroupModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
 @Input() fullName: string = '';
  get initials(): string {
    if (!this.fullName) return '';
    const words = this.fullName.trim().split(/\s+/);
    const first = words[0]?.[0] || '';
    const last = words.length > 1 ? words[words.length - 1]?.[0] : '';
    return (first + last).toUpperCase();
  }
}
