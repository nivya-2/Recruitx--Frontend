import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from 'primeng/breadcrumb';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, Breadcrumb, RouterModule, IconComponent],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent implements OnInit {
  @Input() items?: MenuItem[]; // Optional manual breadcrumb input
  @Input() home?: MenuItem = { label: '', route: '' };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Only auto-generate if not provided
    if (!this.items || this.items.length === 0) {
      this.generateBreadcrumbs();
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.generateBreadcrumbs());
    }
  }

  private generateBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [];
    let currentRoute = this.route.root;
    let url = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      const routeSnapshot = currentRoute.snapshot;

      const routeURL = routeSnapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const label = routeSnapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, route: url });
      }
    }

    this.items = breadcrumbs;
  }
}