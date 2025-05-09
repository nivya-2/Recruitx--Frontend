import { Component,Input } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { HeaderTextComponent } from '../header-text/header-text.component';

@Component({
  selector: 'app-profile-box',
  imports: [ProfileComponent,HeaderTextComponent],
  templateUrl: './profile-box.component.html',
  styleUrl: './profile-box.component.scss'
})
export class ProfileBoxComponent {
  @Input() fullName: string = '';
  @Input() role: string = '';
}
