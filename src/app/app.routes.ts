import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PanelFormComponent } from './pages/evaluation-form/panel-form/panel-form.component';
import { EvaluationFormComponent } from './pages/evaluation-form/evaluation-form.component';

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
    canActivate: [AuthGuard],
    data: { breadcrumb: 'JRs', roles: ['Admin'] },
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./pages/admin-users/admin-users.component').then(
        (m) => m.AdminUsersComponent
      ),
          canActivate: [AuthGuard],

    data: { breadcrumb: 'Users', roles: ['Admin'] },
  },
  {
    path: 'admin/email',
    loadComponent: () =>
      import('./pages/admin-email/admin-email.component').then(
        (m) => m.AdminEmailComponent
      ),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Email', roles: ['Admin'] },
  },
  {
    path: 'recruiter/track-jr',
    loadComponent: () =>
      import('./pages/recruiter-track-jr/recruiter-dashboard.component').then(
        (m) => m.RecruiterDashboardComponent
      ),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Track JR', roles: ['Recruiter'] },
  },
  {
    path: 'recruiter/analytics',
    loadComponent: () =>
      import('./pages/recruiter-analytics/recruiter-analytics.component').then(
        (m) => m.RecruiterAnalyticsComponent
      ),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Analytics', roles: ['Recruiter'] },
  },
  {
    path: 'recruiter/my-jd',
    loadComponent: () =>
      import('./pages/my-jd/my-jd.component').then(
        (m) => m.MyJdComponent
      ),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'My JDs' ,  roles: ['Recruiter']},
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
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Pending JD Generation' , roles: ['Recruiter']},
      },
      {
        path: 'trackjd',
        loadComponent: () =>
          import('./subpages/track-jd/track-jd.component').then(
            (m) => m.TrackJdComponent
          ),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Track JD' , roles: ['Recruiter']},
        children: [
          {
            path: 'job-description',
            loadComponent: () => import('./pages/job-description/job-description.component').then(m => m.JobDescriptionComponent),
            data: { breadcrumb: 'Job Description' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details/:id'
              },
              {
                path: 'details/:id',
                loadComponent: () => import('./subpages/details/details.component').then(m => m.DetailsComponent),
                canActivate: [AuthGuard],
                data: { breadcrumb: 'Details' , roles: ['Recruiter']}
              },
              {
                path: 'applicants/:id',
                loadComponent: () => import('./subpages/applicants/applicants.component').then(m => m.ApplicantsComponent),
                canActivate: [AuthGuard],
                data: { breadcrumb: 'Applicants', roles: ['Recruiter'] }
              }
              
            ]
          },
        ]
      },
      {
        path: 'closedjd',
        loadComponent: () =>
          import('./subpages/closed-jd/closed-jd.component').then(
            (m) => m.ClosedJdComponent
          ),
          canActivate: [AuthGuard],
        data: { breadcrumb: 'Closed JD', roles: ['Recruiter']},
      },
    ],
  },
  {
    path: 'recruiter/interviews',
    loadComponent: () =>
      import('./pages/interviews/interviews.component')
        .then(m => m.InterviewsComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Interviews' ,  roles: ['Recruiter']},
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
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Schedule', roles: ['Recruiter']}
      },
      {
        path: 'shortlist',
        loadComponent: () =>
          import('./subpages/shortlist/shortlist.component')
            .then(m => m.ShortlistComponent),
            canActivate: [AuthGuard],
        data: { breadcrumb: 'Shortlist' , roles: ['Recruiter']}
      },
      {
        path: 'all-interviews',
        loadComponent: () =>
          import('./subpages/all-interviews/all-interviews.component')
            .then(m => m.AllInterviewsComponent),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'All Interviews', roles: ['Recruiter'] }
      }
    ]
  },

  {
    path: 'recruiter-lead/jrs',
    loadComponent: () =>
      import(
        './pages/track-jr/track-jr.component'
      ).then((m) => m.RecruiterHeadTrackJrComponent),
    data: { breadcrumb: 'JRs' , roles: ['Recruiter Lead'] },
    canActivate: [AuthGuard],
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
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Assign JR', roles: ['Recruiter Lead']}
      },
      {
        path: 'track-jr',
        loadComponent: () =>
          import('./subpages/track-jr/track-jr.component')
            .then(m => m.TrackJrComponent),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Track JRs', roles: ['Recruiter Lead'] }
      }
    ]
  },
  {
    path: 'recruiter-lead/analytics',
    loadComponent: () =>
      import(
        './pages/recruiter-lead-analytics/recruiter-lead-analytics.component'
      ).then((m) => m.RecruiterLeadAnalyticsComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Analytics', roles: ['Recruiter Lead']},
  },
  {
    path: 'recruiter-lead/my-jd',
    loadComponent: () =>
      import('./pages/my-jd/my-jd.component').then(
        (m) => m.MyJdComponent
      ),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'My JDs', roles: ['Recruiter Lead'] },
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
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Pending JD Generation', roles: ['Recruiter Lead']},
      },
      {
        path: 'trackjd',
        loadComponent: () =>
          import('./subpages/track-jd/track-jd.component').then(
            (m) => m.TrackJdComponent
          ),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Track JD', roles: ['Recruiter Lead']},
        children: [
          {
            path: 'job-description',
            loadComponent: () => import('./pages/job-description/job-description.component').then(m => m.JobDescriptionComponent),
            canActivate: [AuthGuard],
            data: { breadcrumb: 'Job Description', roles: ['Recruiter Lead'] },
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details/:id'
              },
              {
                path: 'details/:id',
                loadComponent: () => import('./subpages/details/details.component').then(m => m.DetailsComponent),
                canActivate: [AuthGuard],
                data: { breadcrumb: 'Details', roles: ['Recruiter Lead']}
              },
              {
                path: 'applicants/:id',
                loadComponent: () => import('./subpages/applicants/applicants.component').then(m => m.ApplicantsComponent),
                canActivate: [AuthGuard],
                data: { breadcrumb: 'Applicants', roles: ['Recruiter Lead'] }
              }
            ]
          },
        ]
      },
    ],
  },
  {
    path: 'recruiter-lead/interviews',
    loadComponent: () =>
      import('./pages/interviews/interviews.component')
        .then(m => m.InterviewsComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Interviews', roles: ['Recruiter Lead'] },
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
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Schedule' , roles: ['Recruiter Lead']}
      },
      {
        path: 'shortlist',
        loadComponent: () =>
          import('./subpages/shortlist/shortlist.component')
            .then(m => m.ShortlistComponent),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Shortlist' , roles: ['Recruiter Lead']}
      },
      {
        path: 'all-interviews',
        loadComponent: () =>
          import('./subpages/all-interviews/all-interviews.component')
            .then(m => m.AllInterviewsComponent),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'All Interviews', roles: ['Recruiter Lead'] }
      }
    ]
  },

  {
    path: 'recruiter-lead/team',
    loadComponent: () =>
      import('./pages/recruiter-head-team/team.component').then((m) => m.TeamComponent),
    data: { breadcrumb: 'Team' , roles: ['Recruiter Lead'] },
    canActivate: [AuthGuard],
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
        canActivate: [AuthGuard],
        data: { breadcrumb: 'My Team', roles: ['Recruiter Lead']  },
      },
      {
        path: 'track-jr',
        loadComponent: () =>
          import('./subpages/track-jr/track-jr.component').then(
            (m) => m.TrackJrComponent
          ),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Track JR', roles: ['Recruiter Lead'] },
      },
    ],
  },
  {
    path: 'recruiter-head/jrs',
    loadComponent: () =>
      import('./pages/track-jr/track-jr.component')
        .then(m => m.RecruiterHeadTrackJrComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'JRs'  , roles: ['Recruiter Head'] },
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
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Assign JR', roles: ['Recruiter Head'] }
      },
      {
        path: 'track-jr',
        loadComponent: () =>
          import('./subpages/track-jr/track-jr.component')
            .then(m => m.TrackJrComponent),
            canActivate: [AuthGuard],
        data: { breadcrumb: 'Track JRs' , roles: ['Recruiter Head']}
      }
    ]
  },
  {
    path: 'recruiter-head/analytics',
    loadComponent: () =>
      import(
        './pages/recruiter-head-analytics/recruiter-head-analytics.component'
      ).then((m) => m.RecruiterHeadAnalyticsComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Analytics' , roles: ['Recruiter Head']},
  },
  {
    path: 'recruiter-lead/job-description',
    loadComponent: () => import('./pages/job-description/job-description.component').then(m => m.JobDescriptionComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Job-Description' , roles: ['Recruiter Lead'] },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'details/:id'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./subpages/details/details.component').then(m => m.DetailsComponent),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Details' , roles: ['Recruiter Lead'] }
      },
      {
        path: 'applicants/:id',
        loadComponent: () => import('./subpages/applicants/applicants.component').then(m => m.ApplicantsComponent),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Applicants', roles: ['Recruiter Lead'] }
      }
    ]
  }, 
  {
    path: 'recruiter/job-description',
    loadComponent: () => import('./pages/job-description/job-description.component').then(m => m.JobDescriptionComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Job-Description', roles: ['Recruiter'] },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'details/:id'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./subpages/details/details.component').then(m => m.DetailsComponent),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Details' , roles: ['Recruiter'] }
      },
      {
        path: 'applicants/:id',
        loadComponent: () => import('./subpages/applicants/applicants.component').then(m => m.ApplicantsComponent),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Applicants', roles: ['Recruiter'] }
      },

    ]
  },
  {
    path: 'recruiter-lead/job-description/applicant-details/:id',
    loadComponent: () =>
      import(
        './pages/applicant-details/applicant-details.component'
      ).then((m) => m.ApplicantDetailsComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Applicant Details', roles: ['Recruiter Lead']  },
  },

  {
    path: 'recruiter/job-description/applicant-details/:id',
    loadComponent: () =>
      import(
        './pages/applicant-details/applicant-details.component'
      ).then((m) => m.ApplicantDetailsComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Analytics', roles: ['Recruiter']  },
  },

  {
    path: 'recruiter-head/team',
    loadComponent: () =>
      import('./pages/recruiter-head-team/team.component').then((m) => m.TeamComponent),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'My Team', roles: ['Recruiter Head'] },
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
          canActivate: [AuthGuard],
        data: { breadcrumb: 'My Team', roles: ['Recruiter Head'] },
      },
    ],
  },
  {
  path: 'eval-form',
  // Use 'loadComponent' for consistency with the rest of your app.
  loadComponent: () =>
    import('./pages/evaluation-form//panel-form/panel-form.component').then((m) => m.PanelFormComponent),
  // NO canActivate guard. This is crucial.
},
{
  path: 'recruiter-lead/interviews/shortlist/:interviewId', // Cleaner, more descriptive path
  loadComponent: () =>
    import('./pages/evaluation-form/evaluation-form.component').then((m) => m.EvaluationFormComponent),
  canActivate: [AuthGuard],
  data: {
    roles: ['Recruiter Lead']
  },
},


// --- Route 3: The INTERNAL link for Recruiter to VIEW a submitted form ---
// Same pattern, different role.
{
  path: 'recruiter/interviews/shortlist/:interviewId', // Cleaner, more descriptive path
  loadComponent: () =>
    import('./pages/evaluation-form/evaluation-form.component').then((m) => m.EvaluationFormComponent),
  canActivate: [AuthGuard],
  data: {
    roles: ['Recruiter']
  },
},

  {
    path: 'recruiter-lead/interviews/shortlist/eval-form/:interviewId',
    loadComponent: () =>
      import('./pages/evaluation-form/evaluation-form.component').then((m) => m.EvaluationFormComponent),
    canActivate: [AuthGuard],
    data: {roles: ['Recruiter Lead']  },
  },
  {
    path: 'recruiter/interviews/shortlist/eval-form/:interviewId',
    loadComponent: () =>
      import('./pages/evaluation-form/evaluation-form.component').then((m) => m.EvaluationFormComponent),
    canActivate: [AuthGuard], 
    data: {roles: ['Recruiter']  },
  },

  {
    path: 'recruiter-lead/interviews/schedule/schedule-page',
    loadComponent: () =>
      import('./pages/schedule-page/schedule-page.component').then((m) => m.SchedulePageComponent),
     canActivate: [AuthGuard],
    data: { roles: ['Recruiter Lead']  },
  },
  {
    path: 'recruiter/interviews/schedule/schedule-page',
    loadComponent: () =>
      import('./pages/schedule-page/schedule-page.component').then((m) => m.SchedulePageComponent),
    canActivate: [AuthGuard], 
    data: { roles: ['Recruiter']  },
  },{
        path: 'eval-form', // This matches the URL we generate in the backend
        component: PanelFormComponent 
    },
];
