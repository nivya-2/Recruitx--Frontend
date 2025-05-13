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
        loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
        data: { breadcrumb: 'Analytics' }
    },
    {
        path: 'recruiter/track-jd',
        loadComponent: () => import('./pages/track-jd/track-jd.component').then(m => m.TrackJdComponent),
        data: { breadcrumb: 'Track JDs' }
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
        loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
        data: { breadcrumb: 'Analytics' }
    },
    {
        path: 'recruiter-lead/track-jd',
        loadComponent: () => import('./pages/track-jd/track-jd.component').then(m => m.TrackJdComponent),
        data: { breadcrumb: 'Track JDs' }
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
        loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
        data: { breadcrumb: 'Analytics' }
    },
    {
        path: 'recruiter-head/team',
        loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent),
        data: { breadcrumb: 'Team' }
    }
];
