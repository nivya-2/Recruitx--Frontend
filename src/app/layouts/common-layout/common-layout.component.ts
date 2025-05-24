import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api'; 

interface IconItem {
  iconName: string;
  size: string;
  iconColour: string;
  label: string;
  route: string;
}
import { BreadcrumbsComponent } from '../../ui/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-common-layout',
  imports: [HeaderComponent, SidenavbarComponent,BreadcrumbsComponent],
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss']
})
export class CommonLayoutComponent {
    @Input() breadcrumbItems?: MenuItem[]; // ✅ Optional breadcrumbs input
  recruiterIcons: IconItem[] = [
    { iconName: 'bar_chart', size: '28px', iconColour: '#B8AAFF', label: 'Analytics', route: '/recruiter/analytics' },
    { iconName: 'assignment', size: '28px', iconColour: '#B8AAFF', label: 'Track JR', route: '/recruiter/dashboard' },
    { iconName: 'timeline', size: '28px', iconColour: '#B8AAFF', label: 'Track JD', route: '/recruiter/track-jd' },
    { iconName: 'date_range', size: '28px', iconColour: '#B8AAFF', label: 'Interview Details', route: '/recruiter/schedule-interviews' }
  ];

  recruiterLeadIcons: IconItem[] = [
    { iconName: 'bar_chart', size: '28px', iconColour: '#B8AAFF', label: 'Analytics', route: '/recruiter-lead/analytics' },
    { iconName: 'assignment', size: '28px', iconColour: '#B8AAFF', label: 'Track JR', route: '/recruiter-lead/dashboard' },
    { iconName: 'timeline', size: '28px', iconColour: '#B8AAFF', label: 'Track JD', route: '/recruiter-lead/track-jd' },
    { iconName: 'date_range', size: '28px', iconColour: '#B8AAFF', label: 'Interview Details', route: '/recruiter-lead/schedule-interviews' },
    { iconName: 'group', size: '28px', iconColour: '#B8AAFF', label: 'Teams', route: '/recruiter-lead/team' },
  ];

  recruiterHeadIcons: IconItem[] = [
    { iconName: 'bar_chart', size: '28px', iconColour: '#B8AAFF', label: 'Analytics', route: '/recruiter-head/analytics' },
    { iconName: 'assignment', size: '28px', iconColour: '#B8AAFF', label: 'Track JR', route: '/recruiter-head/jrs' },
    { iconName: 'group', size: '28px', iconColour: '#B8AAFF', label: 'Teams', route: '/recruiter-head/team' },
  ];

  adminIcons: IconItem[] = [
    { iconName: 'dashboard', size: '28px', iconColour: '#B8AAFF', label: 'Dashboard', route: '/admin/dashboard' },
    { iconName: 'account_circle', size: '28px', iconColour: '#B8AAFF', label: 'Add Users', route: '/admin/users' },
    { iconName: 'mail_outline', size: '28px', iconColour: '#B8AAFF', label: 'Mail', route: '/admin/email' }
  ];

  iconList: IconItem[] = [];
name: string = '';
role: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
  const currentUrl = this.router.url;
  console.log('Current URL:', currentUrl);

  if (currentUrl.startsWith('/recruiter-lead')) {
    this.iconList = this.recruiterLeadIcons;
    this.name = 'Abhinand K';
    this.role = 'Recruiter Lead';
  } else if (currentUrl.startsWith('/recruiter-head')) {
    this.iconList = this.recruiterHeadIcons;
    this.name = 'Nivya Vineeth';
    this.role = 'Recruiter head';
  } else if (currentUrl.startsWith('/admin')) {
    this.iconList = this.adminIcons;
    this.name = 'Anjali Krishna';
    this.role = 'Admin';
  } else {
    this.iconList = this.recruiterIcons;
    this.name = 'Kevin Joby';
    this.role = 'Recruiter';
  }
}

}
