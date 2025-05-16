import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonDemoComponent } from './button-demo/button-demo.component';
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
import { TrackJrComponent } from './subpages/track-jr/track-jr.component';


@Component({
  selector: 'app-root',
  imports: [TrackJrComponent,RecruiterHeadDashboardComponent, RecruiterDashboardComponent, RouterOutlet, SidenavbarComponent, IconGroupComponent, ButtonDemoComponent, IconComponent,
    HeaderComponent, ButtonComponent, CardsComponent, SharedComponentsModule, TableComponent, CommonLayoutComponent, RecruiterLeadDashboardComponent, BreadcrumbsComponent, ProgressbarComponent, TrackJdComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'rec';
  
  dataSource: any[] = [ 
    { id: 'JR2025-112', 
      roleTitle: 'Software Engineer',
      deliveryUnit: 'DU1',
      location: 'Bangalore', 
      openPositions: 5, 
      createdDate: '05-05-2025', 
      hiringManager: 'John Doe',
      actions:'Generate JD',
      },
      {  id: 'JR2025-113', 
        roleTitle: 'UX Designer',
        deliveryUnit: 'DU2',
        location: 'Bangalore', 
        openPositions: 7, 
        createdDate: '05-05-2025', 
        hiringManager: 'John James',
        actions:'Generate JD',

      },
      {  id: 'JR2025-114', 
          roleTitle: 'Sales Manager',
          deliveryUnit: 'DU4',
          location: 'Trivandrum', 
          openPositions: 9, 
          createdDate: '09-05-2025', 
          hiringManager: 'Alan Smith',
          actions:'Generate JD',

      },
      {  id: 'JR2025-115', 
            roleTitle: 'Junior HR',
            deliveryUnit: 'DU7',
            location: 'Bangalore', 
            openPositions: 9, 
            createdDate: '09-05-2025', 
            hiringManager: 'James Roy',
            actions:'Draft',

      },
      { id: 'JR2025-116', 
              roleTitle: 'AI Engineer',
              deliveryUnit: 'DU2',
              location: 'Bangalore', 
              openPositions: 7, 
              createdDate: '05-07-2025', 
              hiringManager: 'James Jacob',
              actions:'Generate JD',

            },
            {  id: 'JR2025-117', 
                roleTitle: 'UX Designer',
                deliveryUnit: 'DU2',
                location: 'Bangalore', 
                openPositions: 7, 
                createdDate: '05-08-2025', 
                hiringManager: 'John James',
                actions:'Draft',

            },
            {  id: 'JR2025-119', 
              roleTitle: 'UI Designer',
              deliveryUnit: 'DU2',
              location: 'Bangalore', 
              openPositions: 7, 
              createdDate: '15-05-2025', 
              hiringManager: 'John James',
              actions:'Draft',

              },
        {  id: 'JR2025-119', 
          roleTitle: 'Data Analyst',
          deliveryUnit: 'DU6',
          location: 'Kochi', 
          openPositions: 11, 
          createdDate: '25-06-2025', 
          hiringManager: 'John James',
          actions:'Generate JD',

          }

    ];


    recruiterLeadIcons=[
      {iconName:'dashboard',size:"28px",iconColour:"#B8AAFF",label:"Dasboard",route:"/recruiter-lead/dashboard"},
      {iconName:' bar_chart',size:"28px",iconColour:"#B8AAFF",label:"Anaytics",route:"/recruiter-lead/anaytics"},
      {iconName:'timeline',size:"28px",iconColour:"#B8AAFF",label:"Track JD",route:"/recruiter-lead/Track-jd"},
      {iconName:'group',size:"28px",iconColour:"#B8AAFF",label:"Teams",route:"/recruiter-lead/teams"},
      {iconName:'date_range',size:"28px",iconColour:"#B8AAFF",label:"Schedule",route:"/recruiter-lead/dashboard"}
    ]

    recruiterHeadIcons=[
      {iconName:'dashboard',size:"28px",iconColour:"#B8AAFF",label:"Dasboard",route:"/recruiter-head/dashboard"},
      {iconName:' bar_chart',size:"28px",iconColour:"#B8AAFF",label:"Anaytics",route:"/recruiter-head/anaytics"},
      {iconName:'timeline',size:"28px",iconColour:"#B8AAFF",label:"Track JD",route:"/recruiter-head/Track-jd"},
      {iconName:'date_range',size:"28px",iconColour:"#B8AAFF",label:"Schedule",route:"/recruiter-head/dashboard"}
    ]
    adminIcons=[
      {iconName:'dashboard',size:"28px",iconColour:"#B8AAFF",label:"Dasboard",route:"/admin/dashboard"},
      {iconName:'account_circle',size:"28px",iconColour:"#B8AAFF",label:"Add Users",route:"/admin/add-user"},
      {iconName:'mail_outline ',size:"28px",iconColour:"#B8AAFF",label:"Mail",route:"/admin/mail"},
    ]

    columns: Array<{key: string, label: string, filterable: boolean}> = [
      { key: 'id', label: 'ID',filterable: false },
      { key: 'roleTitle', label: 'Role Title',filterable: true},
      { key: 'deliveryUnit', label: 'Delivery Unit',filterable: true },
      { key: 'location', label: 'Location',filterable: true },
      { key: 'openPositions', label: 'No. Of Open Positions',filterable: false },
      { key: 'createdDate', label: 'Created Date',filterable: false },
      { key: 'hiringManager', label: 'Hiring Manager',filterable: false },
      { key: 'actions', label: 'Actions',filterable: false }
    ];

    globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions');  
    
    
    
}
