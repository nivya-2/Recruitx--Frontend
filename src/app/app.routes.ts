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
        loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
    },
    {
        path: 'recruiter/track-jd',
        loadComponent: () => import('./pages/track-jd/track-jd.component').then(m => m.TrackJdComponent)
    },
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
        loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
    },
    {
        path: 'recruiter-lead/track-jd',
        loadComponent: () => import('./pages/track-jd/track-jd.component').then(m => m.TrackJdComponent)
    },
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
        loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
    },
    {
        path: 'recruiter-head/team',
        loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent)
    },
        
];
