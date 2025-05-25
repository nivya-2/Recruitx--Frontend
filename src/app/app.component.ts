import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { ButtonComponent } from './ui/button/button.component';
import { CardsComponent } from './ui/cards/cards.component';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { TableComponent } from './shared-components/table/table.component';
import { IconComponent } from './ui/icon/icon.component';
import { IconGroupComponent } from './layouts/icon-group/icon-group.component';
import { SidenavbarComponent } from './layouts/sidenavbar/sidenavbar.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { RecruiterHeadTrackJrComponent } from './pages/track-jr/track-jr.component';

import { RecruiterLeadDashboardComponent } from "./pages/recruiter-lead-dashboard/recruiter-lead-dashboard.component";
import { RecruiterDashboardComponent } from './pages/recruiter-track-jr/recruiter-dashboard.component';
import { BreadcrumbsComponent } from './ui/breadcrumbs/breadcrumbs.component';
import { ProgressbarComponent } from "./ui/progressbar/progressbar.component";
import { MyJdComponent } from "./pages/my-jd/my-jd.component";
import { TrackJrComponent } from "./subpages/track-jr/track-jr.component";
import { TeamComponent } from "./pages/recruiter-head-team/team.component";
import { MyTeamComponent } from "./subpages/my-team/my-team.component";
import { ViewassignedjrCardComponent } from "./shared-components/viewassignedjr-card/viewassignedjr-card.component";



@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, SharedComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'rec';
  teamList = [
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Jins K. Varghese', role: 'Associate Manager' },
  { fullName: 'Jins K. Varghese', role: 'Lead' },
  { fullName: 'Jins K. Varghese', role: 'Associate' },
];

onMemberSelect(member: any) {
  console.log('Selected:', member);
}
}
