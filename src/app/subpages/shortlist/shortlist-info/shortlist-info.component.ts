import { Component } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';
interface PanelMember {
  name: string;
}

interface CandidateInfo {
  candidateId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  panelMembers: PanelMember[];
  deliveryUnit: string;
  interviewDate: string;
  interviewStartTime: string;
  interviewEndTime: string;
}
@Component({
  selector: 'app-shortlist-info',
  imports: [ButtonComponent],
  templateUrl: './shortlist-info.component.html',
  styleUrl: './shortlist-info.component.scss'
})
export class ShortlistInfoComponent {
candidateData: CandidateInfo = {
    candidateId: 'CAND006',
    firstName: 'Kevin',
    lastName: 'Joby',
    email: 'quinn.rivers@gmail.com',
    mobile: '8054623553',
    address: '1192 Mulberry Street, Texas, USA',
    panelMembers: [
      { name: 'Joby Jose' },
      { name: 'Lekshmi K' },
      { name: 'Shanmugha Das' }
    ],
    deliveryUnit: 'DU6',
    interviewDate: '16/04/2025',
    interviewStartTime: '10:00 A.M.',
    interviewEndTime: '11:00 A.M.'
  };
}
