import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'admin/dashboard',
        loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    {
        path: 'admin/users',
        loadComponent: () => import('./pages/admin-users/admin-users.component').then(m => m.AdminUsersComponent)
    },
    {
        path: 'admin/email',
        loadComponent: () => import('./pages/admin-email/admin-email.component').then(m => m.AdminEmailComponent)
    },
    {
        path: 'recruiter/dashboard',
        loadComponent: () => import('./pages/recruiter-dashboard/recruiter-dashboard.component').then(m => m.RecruiterDashboardComponent)
    },
    {
        path: 'recruiter/analytics',
        loadComponent: () => import('./pages/recruiter-analytics/recruiter-analytics.component').then(m => m.RecruiterAnalyticsComponent)
    },
    {
  path: 'recruiter/track-jd',
  loadComponent: () =>
    import('./pages/track-jd/track-jd.component').then(m => m.TrackJdComponent),
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'pendingjdgeneration'
    },
    {
      path: 'pendingjdgeneration',
      loadComponent: () =>
        import('./subpages/pending-jd-gen/pending-jd-gen.component').then(m => m.PendingJdGenComponent)
    },
    {
      path: 'openjd',
      loadComponent: () =>
        import('./subpages/open-jd/open-jd.component').then(m => m.OpenJdComponent)
    },
    {
      path: 'closedjd',
      loadComponent: () =>
        import('./subpages/closed-jd/closed-jd.component').then(m => m.ClosedJdComponent)
    }
  ]
}

,
    {
        path: 'recruiter/schedule-interviews',
        loadComponent: () => import('./pages/schedule-interviews/schedule-interviews.component').then(m => m.ScheduleInterviewsComponent)
    },
    {
        path: 'recruiter-lead/dashboard',
        loadComponent: () => import('./pages/recruiter-lead-dashboard/recruiter-lead-dashboard.component').then(m => m.RecruiterLeadDashboardComponent)
    },
    {
        path: 'recruiter-lead/analytics',
        loadComponent: () => import('./pages/recruiter-lead-analytics/recruiter-lead-analytics.component').then(m => m.RecruiterLeadAnalyticsComponent)
    },
  {
  path: 'recruiter-lead/track-jd',
  loadComponent: () =>
    import('./pages/track-jd/track-jd.component').then(m => m.TrackJdComponent),
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'pendingjdgeneration'
    },
    {
      path: 'pendingjdgeneration',
      loadComponent: () =>
        import('./subpages/pending-jd-gen/pending-jd-gen.component').then(m => m.PendingJdGenComponent)
    },
    {
      path: 'openjd',
      loadComponent: () =>
        import('./subpages/open-jd/open-jd.component').then(m => m.OpenJdComponent)
    },
    {
      path: 'closedjd',
      loadComponent: () =>
        import('./subpages/closed-jd/closed-jd.component').then(m => m.ClosedJdComponent)
    }
  ]
}
,
    {
        path: 'recruiter-lead/schedule-interviews',
        loadComponent: () => import('./pages/schedule-interviews/schedule-interviews.component').then(m => m.ScheduleInterviewsComponent)
    },
    {
        path: 'recruiter-lead/team',
        loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent)
    },
    {
        path: 'recruiter-head/dashboard',
        loadComponent: () => import('./pages/recruiter-head-dashboard/recruiter-head-dashboard.component').then(m => m.RecruiterHeadDashboardComponent)
    },
    {
        path: 'recruiter-head/analytics',
        loadComponent: () => import('./pages/recruiter-head-analytics/recruiter-head-analytics.component').then(m => m.RecruiterHeadAnalyticsComponent)
    },
    {
        path: 'recruiter-head/team',
        loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent)
    },
        
];
