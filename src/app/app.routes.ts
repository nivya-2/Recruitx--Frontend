import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    data: { breadcrumb: 'Dashboard' },
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./pages/admin-users/admin-users.component').then(
        (m) => m.AdminUsersComponent
      ),
    data: { breadcrumb: 'Users' },
  },
  {
    path: 'admin/email',
    loadComponent: () =>
      import('./pages/admin-email/admin-email.component').then(
        (m) => m.AdminEmailComponent
      ),
    data: { breadcrumb: 'Email' },
  },
  {
    path: 'recruiter/track-jr',
    loadComponent: () =>
      import('./pages/recruiter-track-jr/recruiter-dashboard.component').then(
        (m) => m.RecruiterDashboardComponent
      ),
    data: { breadcrumb: 'Track JR' },
  },
  {
    path: 'recruiter/analytics',
    loadComponent: () =>
      import('./pages/recruiter-analytics/recruiter-analytics.component').then(
        (m) => m.RecruiterAnalyticsComponent
      ),
    data: { breadcrumb: 'Analytics' },
  },
  {
    path: 'recruiter/track-jd',
    loadComponent: () =>
      import('./pages/track-jd/track-jd.component').then(
        (m) => m.TrackJdComponent
      ),
    data: { breadcrumb: 'Track JD' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pendingjdgeneration',
      },
      {
        path: 'pendingjdgeneration',
        loadComponent: () =>
          import('./subpages/pending-jd-gen/pending-jd-gen.component').then(
            (m) => m.PendingJdGenComponent
          ),
        data: { breadcrumb: 'Pending JD Generation' },
      },
      {
        path: 'openjd',
        loadComponent: () =>
          import('./subpages/open-jd/open-jd.component').then(
            (m) => m.OpenJdComponent
          ),
        data: { breadcrumb: 'Open JD' },
      },
      {
        path: 'closedjd',
        loadComponent: () =>
          import('./subpages/closed-jd/closed-jd.component').then(
            (m) => m.ClosedJdComponent
          ),
        data: { breadcrumb: 'Closed JD' },
      },
    ],
  },
  {
    path: 'recruiter/schedule-interviews',
    loadComponent: () =>
      import('./pages/schedule-interviews/schedule-interviews.component').then(
        (m) => m.ScheduleInterviewsComponent
      ),
    data: { breadcrumb: 'Schedule Interviews' },
  },
  {
    path: 'recruiter-lead/track-jr',
    loadComponent: () =>
      import(
        './pages/recruiter-lead-dashboard/recruiter-lead-dashboard.component'
      ).then((m) => m.RecruiterLeadDashboardComponent),
    data: { breadcrumb: 'Track JR' },
  },
  {
    path: 'recruiter-lead/analytics',
    loadComponent: () =>
      import(
        './pages/recruiter-lead-analytics/recruiter-lead-analytics.component'
      ).then((m) => m.RecruiterLeadAnalyticsComponent),
    data: { breadcrumb: 'Analytics' },
  },
  {
    path: 'recruiter-lead/track-jd',
    loadComponent: () =>
      import('./pages/track-jd/track-jd.component').then(
        (m) => m.TrackJdComponent
      ),
    data: { breadcrumb: 'Track JD' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pendingjdgeneration',
      },
      {
        path: 'pendingjdgeneration',
        loadComponent: () =>
          import('./subpages/pending-jd-gen/pending-jd-gen.component').then(
            (m) => m.PendingJdGenComponent
          ),
        data: { breadcrumb: 'Pending JD Generation' },
      },
      {
        path: 'openjd',
        loadComponent: () =>
          import('./subpages/open-jd/open-jd.component').then(
            (m) => m.OpenJdComponent
          ),
        data: { breadcrumb: 'Open JD' },
      },
      {
        path: 'closedjd',
        loadComponent: () =>
          import('./subpages/closed-jd/closed-jd.component').then(
            (m) => m.ClosedJdComponent
          ),
        data: { breadcrumb: 'Closed JD' },
      },
    ],
  },
  {
    path: 'recruiter-lead/schedule-interviews',
    loadComponent: () =>
      import('./pages/schedule-interviews/schedule-interviews.component').then(
        (m) => m.ScheduleInterviewsComponent
      ),
    data: { breadcrumb: 'Schedule Interviews' },
  },
  {
    path: 'recruiter-lead/team',
    loadComponent: () =>
      import('./pages/team/team.component').then((m) => m.TeamComponent),
    data: { breadcrumb: 'Team' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-team',
      },
      {
        path: 'my-team',
        loadComponent: () =>
          import('./subpages/my-team/my-team.component').then(
            (m) => m.MyTeamComponent
          ),
        data: { breadcrumb: 'My Team' },
      },
      {
        path: 'track-jr',
        loadComponent: () =>
          import('./subpages/track-jr/track-jr.component').then(
            (m) => m.TrackJrComponent
          ),
        data: { breadcrumb: 'Track JR' },
      },
    ],
  },
  {
  path: 'recruiter-head/jrs/',
  loadComponent: () =>
    import('./pages/recruiter-head-track-jr/recruiter-head-track-jr.component')
      .then(m => m.RecruiterHeadTrackJrComponent),
  data: { breadcrumb: 'JRs' },
  children: [
    {
      path: 'assign-jr',
      loadComponent: () =>
        import('./subpages/assign-jr/assign-jr.component')
          .then(m => m.AssignJrComponent),
      data: { breadcrumb: 'Assign JR' }
    },
    {
      path: 'track-jr',
      loadComponent: () =>
        import('./subpages/track-jr/track-jr.component')
          .then(m => m.TrackJrComponent),
      data: { breadcrumb: 'Track JRs' }
    }
  ]
},
  {
    path: 'recruiter-head/analytics',
    loadComponent: () =>
      import(
        './pages/recruiter-head-analytics/recruiter-head-analytics.component'
      ).then((m) => m.RecruiterHeadAnalyticsComponent),
    data: { breadcrumb: 'Analytics' },
  },
  {
  path: 'recruiter-lead/job-description',
  loadComponent: () => import('./pages/job-description/job-description.component').then(m => m.JobDescriptionComponent),
  data: { breadcrumb: 'Job-Description' },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'details'
    },
    {
      path: 'details',
      loadComponent: () => import('./subpages/details/details.component').then(m => m.DetailsComponent),
      data: { breadcrumb: 'Details' }
    },
    {
      path: 'applicants',
      loadComponent: () => import('./subpages/applicants/applicants.component').then(m => m.ApplicantsComponent),
      data: { breadcrumb: 'Applicants' }
    }
  ]
},{
  path: 'recruiter/job-description',
  loadComponent: () => import('./pages/job-description/job-description.component').then(m => m.JobDescriptionComponent),
  data: { breadcrumb: 'Job-Description' },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'details'
    },
    {
      path: 'details',
      loadComponent: () => import('./subpages/details/details.component').then(m => m.DetailsComponent),
      data: { breadcrumb: 'Details' }
    },
    {
      path: 'applicants',
      loadComponent: () => import('./subpages/applicants/applicants.component').then(m => m.ApplicantsComponent),
      data: { breadcrumb: 'Applicants' }
    },
    
  ]
},
{
      path: 'recruiter-lead/job-description/applicant-details',
    loadComponent: () =>
      import(
        './pages/applicant-details/applicant-details.component'
      ).then((m) => m.ApplicantDetailsComponent),
    data: { breadcrumb: 'Applicant Details' },
    },
  
  {
    path: 'recruiter/job-description/applicant-details',
    loadComponent: () =>
      import(
        './pages/applicant-details/applicant-details.component'
      ).then((m) => m.ApplicantDetailsComponent),
    data: { breadcrumb: 'Analytics' },
  },

  {
    path: 'recruiter-head/team',
    loadComponent: () =>
      import('./pages/team/team.component').then((m) => m.TeamComponent),
    data: { breadcrumb: 'Team' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-team',
      },
      {
        path: 'my-team',
        loadComponent: () =>
          import('./subpages/my-team/my-team.component').then(
            (m) => m.MyTeamComponent
          ),
        data: { breadcrumb: 'My Team' },
      },
      {
        path: 'track-jr',
        loadComponent: () =>
          import('./subpages/track-jr/track-jr.component').then(
            (m) => m.TrackJrComponent
          ),
        data: { breadcrumb: 'Track JR' },
      },
    ],
  },
];
