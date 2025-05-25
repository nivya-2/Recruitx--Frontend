import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'admin/add-jr',
    loadComponent: () =>
      import('./pages/admin-jr-upload/admin-jr-upload.component').then(
        (m) => m.AdminJrUploadComponent
      ),
    data: { breadcrumb: 'JRs' },
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
    path: 'recruiter/my-jd',
    loadComponent: () =>
      import('./pages/my-jd/my-jd.component').then(
        (m) => m.MyJdComponent
      ),
    data: { breadcrumb: 'My JDs' },
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
        path: 'trackjd',
        loadComponent: () =>
          import('./subpages/track-jd/track-jd.component').then(
            (m) => m.TrackJdComponent
          ),
        data: { breadcrumb: 'Track JD' },
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
  path: 'recruiter/interviews',
  loadComponent: () =>
    import('./pages/interviews/interviews.component')
      .then(m => m.InterviewsComponent),
  data: { breadcrumb: 'Interviews' },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'schedule'
    },
    {
      path: 'schedule',
      loadComponent: () =>
        import('./subpages/schedule/schedule.component')
          .then(m => m.ScheduleComponent),
      data: { breadcrumb: 'Schedule' }
    },
    {
      path: 'shortlist',
      loadComponent: () =>
        import('./subpages/shortlist/shortlist.component')
          .then(m => m.ShortlistComponent),
      data: { breadcrumb: 'Shortlist' }
    },
    {
      path: 'all-interviews',
      loadComponent: () =>
        import('./subpages/all-interviews/all-interviews.component')
          .then(m => m.AllInterviewsComponent),
      data: { breadcrumb: 'All Interviews' }
    }
  ]
},

  {
    path: 'recruiter-lead/jrs',
    loadComponent: () =>
      import(
        './pages/track-jr/track-jr.component'
      ).then((m) => m.RecruiterHeadTrackJrComponent),
    data: { breadcrumb: 'JRs' },
    children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'assign-jr'
    },
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
    path: 'recruiter-lead/analytics',
    loadComponent: () =>
      import(
        './pages/recruiter-lead-analytics/recruiter-lead-analytics.component'
      ).then((m) => m.RecruiterLeadAnalyticsComponent),
    data: { breadcrumb: 'Analytics' },
  },
  {
    path: 'recruiter-lead/my-jd',
    loadComponent: () =>
      import('./pages/my-jd/my-jd.component').then(
        (m) => m.MyJdComponent
      ),
    data: { breadcrumb: 'My JDs' },
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
        path: 'trackjd',
        loadComponent: () =>
          import('./subpages/track-jd/track-jd.component').then(
            (m) => m.TrackJdComponent
          ),
        data: { breadcrumb: 'Track JD' },
      },
    ],
  },
 {
  path: 'recruiter-lead/interviews',
  loadComponent: () =>
    import('./pages/interviews/interviews.component')
      .then(m => m.InterviewsComponent),
  data: { breadcrumb: 'Interviews' },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'schedule'
    },
    {
      path: 'schedule',
      loadComponent: () =>
        import('./subpages/schedule/schedule.component')
          .then(m => m.ScheduleComponent),
      data: { breadcrumb: 'Schedule' }
    },
    {
      path: 'shortlist',
      loadComponent: () =>
        import('./subpages/shortlist/shortlist.component')
          .then(m => m.ShortlistComponent),
      data: { breadcrumb: 'Shortlist' }
    },
    {
      path: 'all-interviews',
      loadComponent: () =>
        import('./subpages/all-interviews/all-interviews.component')
          .then(m => m.AllInterviewsComponent),
      data: { breadcrumb: 'All Interviews' }
    }
  ]
},

  {
    path: 'recruiter-lead/team',
    loadComponent: () =>
      import('./pages/recruiter-head-team/team.component').then((m) => m.TeamComponent),
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
  path: 'recruiter-head/jrs',
  loadComponent: () =>
    import('./pages/track-jr/track-jr.component')
      .then(m => m.RecruiterHeadTrackJrComponent),
  data: { breadcrumb: 'JRs' },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'assign-jr'
    },
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
      import('./pages/recruiter-head-team/team.component').then((m) => m.TeamComponent),
    data: { breadcrumb: 'My Team' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-team',
      },
      {
        path: 'my-team',
        loadComponent: () =>
          import('./subpages/my-team-rh/my-team-rh.component').then(
            (m) => m.MyTeamRhComponent
          ),
      },
    ],
  },
];
