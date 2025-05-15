import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    data: { breadcrumb: 'Login' }
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./pages/admin-users/admin-users.component').then(m => m.AdminUsersComponent),
    data: { breadcrumb: 'Users' }
  },
  {
    path: 'admin/email',
    loadComponent: () => import('./pages/admin-email/admin-email.component').then(m => m.AdminEmailComponent),
    data: { breadcrumb: 'Email' }
  },
  {
    path: 'recruiter/dashboard',
    loadComponent: () => import('./pages/recruiter-dashboard/recruiter-dashboard.component').then(m => m.RecruiterDashboardComponent),
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'recruiter/analytics',
    loadComponent: () => import('./pages/recruiter-analytics/recruiter-analytics.component').then(m => m.RecruiterAnalyticsComponent),
    data: { breadcrumb: 'Analytics' }
  },
  {
    path: 'recruiter/track-jd',
    loadComponent: () => import('./pages/track-jd/track-jd.component').then(m => m.TrackJdComponent),
    data: { breadcrumb: 'Track JD' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pendingjdgeneration'
      },
      {
        path: 'pendingjdgeneration',
        loadComponent: () => import('./subpages/pending-jd-gen/pending-jd-gen.component').then(m => m.PendingJdGenComponent),
        data: { breadcrumb: 'Pending JD Generation' }
      },
      {
        path: 'openjd',
        loadComponent: () => import('./subpages/open-jd/open-jd.component').then(m => m.OpenJdComponent),
        data: { breadcrumb: 'Open JD' }
      },
      {
        path: 'closedjd',
        loadComponent: () => import('./subpages/closed-jd/closed-jd.component').then(m => m.ClosedJdComponent),
        data: { breadcrumb: 'Closed JD' }
      }
    ]
  },
  {
    path: 'recruiter/schedule-interviews',
    loadComponent: () => import('./pages/schedule-interviews/schedule-interviews.component').then(m => m.ScheduleInterviewsComponent),
    data: { breadcrumb: 'Schedule Interviews' }
  },
  {
    path: 'recruiter-lead/dashboard',
    loadComponent: () => import('./pages/recruiter-lead-dashboard/recruiter-lead-dashboard.component').then(m => m.RecruiterLeadDashboardComponent),
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'recruiter-lead/analytics',
    loadComponent: () => import('./pages/recruiter-lead-analytics/recruiter-lead-analytics.component').then(m => m.RecruiterLeadAnalyticsComponent),
    data: { breadcrumb: 'Analytics' }
  },
  {
    path: 'recruiter-lead/track-jd',
    loadComponent: () => import('./pages/track-jd/track-jd.component').then(m => m.TrackJdComponent),
    data: { breadcrumb: 'Track JD' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pendingjdgeneration'
      },
      {
        path: 'pendingjdgeneration',
        loadComponent: () => import('./subpages/pending-jd-gen/pending-jd-gen.component').then(m => m.PendingJdGenComponent),
        data: { breadcrumb: 'Pending JD Generation' }
      },
      {
        path: 'openjd',
        loadComponent: () => import('./subpages/open-jd/open-jd.component').then(m => m.OpenJdComponent),
        data: { breadcrumb: 'Open JD' }
      },
      {
        path: 'closedjd',
        loadComponent: () => import('./subpages/closed-jd/closed-jd.component').then(m => m.ClosedJdComponent),
        data: { breadcrumb: 'Closed JD' }
      }
    ]
  },
  {
    path: 'recruiter-lead/schedule-interviews',
    loadComponent: () => import('./pages/schedule-interviews/schedule-interviews.component').then(m => m.ScheduleInterviewsComponent),
    data: { breadcrumb: 'Schedule Interviews' }
  },
  {
    path: 'recruiter-lead/team',
    loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent),
    data: { breadcrumb: 'Team' }
  },
  {
    path: 'recruiter-head/dashboard',
    loadComponent: () => import('./pages/recruiter-head-dashboard/recruiter-head-dashboard.component').then(m => m.RecruiterHeadDashboardComponent),
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'recruiter-head/analytics',
    loadComponent: () => import('./pages/recruiter-head-analytics/recruiter-head-analytics.component').then(m => m.RecruiterHeadAnalyticsComponent),
    data: { breadcrumb: 'Analytics' }
  },
  {
    path: 'recruiter-head/team',
    loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent),
    data: { breadcrumb: 'Team' }
  }
];
