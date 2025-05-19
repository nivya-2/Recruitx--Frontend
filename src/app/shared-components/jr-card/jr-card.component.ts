import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { ButtonComponent } from "../../ui/button/button.component";



@Component({
  selector: 'app-jr-card',
  imports: [CardModule, AvatarModule, DropdownModule, ButtonModule, NgClass, ButtonComponent],
  templateUrl: './jr-card.component.html',
  styleUrl: './jr-card.component.scss'
})
export class JrCardComponent {
  jobData = {
    priority: 'Urgent',
    raisedBy: {
      initials: 'JV',
      name: 'Jins K. Varghese',
      role: 'Tech Lead'
    },
    title: 'Data Scientist - Computer Vision',
    du: 'DU6 – Advanced AI & ML Solutions',
    openPositions: 6,
    raisedDate: 'April 2, 2025',
    location: 'Kochi',
    requisitionId: 'REQ–2025–DSCV–006',
    jobTitle: 'Data Scientist – Computer Vision',
    hiringManager: 'Arjun Menon',
    recruiterAssigned: 'Not Assigned',
    qualifications: [
      'Bachelor’s/Master’s degree in Computer Science, Data Science, or related field.',
      '2+ years of hands-on experience in computer vision or a similar role.',
      'Strong portfolio or GitHub with previous CV projects preferred.'
    ]
  };

}
