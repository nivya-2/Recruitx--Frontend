import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { NgClass, NgFor } from '@angular/common';
import { ButtonComponent } from "../../ui/button/button.component";
import { ProfileBoxComponent } from "../../ui/profile-box/profile-box.component";
import { IconComponent } from '../../ui/icon/icon.component';
import { ButtonIconComponent } from "../../ui/button-icon/button-icon.component";




@Component({
  selector: 'app-jr-card',
  imports: [CardModule, AvatarModule, DropdownModule, ButtonModule, NgFor, NgClass, ButtonComponent, ProfileBoxComponent, ButtonIconComponent, IconComponent],
  templateUrl: './jr-card.component.html',
  styleUrl: './jr-card.component.scss'
})
export class JrCardComponent {
  @Input() name: string = 'Arthur Pendragon';
  @Input() role: string = 'Tech Lead';
  jobDetails = {
    jobTag:'Urgent',
    requisitionId: 'REQ–2025–DSCV–006',
    jobTitle: 'Data Scientist – Computer Vision',
    deliveryUnit: 'DU6',
    team:'Advanced AI & ML Solutions',
    location: 'Kochi',
    openPositions: 6,
    raisedOn: 'April 2, 2025',
    hiringManager: 'Arjun Menon',
    recruiter: 'Not Assigned',
    qualifications: [
      "Bachelor’s/Master’s degree in Computer Science, Data Science, or related field.",
      "2+ years of hands-on experience in computer vision or a similar role.",
      "Strong portfolio or GitHub with previous CV projects preferred."
    ]
  };
  

}
