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
import { RecruiterHeadDashboardComponent } from './pages/recruiter-head-dashboard/recruiter-head-dashboard.component';

import { RecruiterLeadDashboardComponent } from "./pages/recruiter-lead-dashboard/recruiter-lead-dashboard.component";
import { RecruiterDashboardComponent } from './pages/recruiter-dashboard/recruiter-dashboard.component';
import { BreadcrumbsComponent } from './ui/breadcrumbs/breadcrumbs.component';
import { ProgressbarComponent } from "./ui/progressbar/progressbar.component";
import { TrackJdComponent } from "./pages/track-jd/track-jd.component";
import { TeamComponent } from "./pages/team/team.component";
import { MyTeamComponent } from "./subpages/my-team/my-team.component";


@Component({
  selector: 'app-root',
  imports: [RecruiterHeadDashboardComponent, RecruiterDashboardComponent, RouterOutlet, SidenavbarComponent, IconGroupComponent, IconComponent,
    HeaderComponent, ButtonComponent, CardsComponent, SharedComponentsModule, TableComponent, CommonLayoutComponent, RecruiterLeadDashboardComponent, BreadcrumbsComponent, ProgressbarComponent, TrackJdComponent, TeamComponent, MyTeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'rec';
  
}
