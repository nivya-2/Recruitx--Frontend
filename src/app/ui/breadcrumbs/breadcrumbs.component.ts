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
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() items?: MenuItem[];
  @Input() home?: MenuItem = { label: '', routerLink: '' };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (!this.items || this.items.length === 0) {
      this.generateBreadcrumbs();
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.generateBreadcrumbs());
    }
  }

  private generateBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [];
    let url = '';

    const addBreadcrumbs = (route: ActivatedRoute) => {
      const children = route.children;

      for (const child of children) {
        const routeSnapshot = child.snapshot;
        const routeURL = routeSnapshot.url.map(segment => segment.path).join('/');

        if (routeURL) {
          url += `/${routeURL}`;
        }

        const label = routeSnapshot.data['breadcrumb'];
        if (label) {
          breadcrumbs.push({ label, routerLink: url });  // Changed from 'route' to 'routerLink'
        }

        addBreadcrumbs(child);
      }
    };

    addBreadcrumbs(this.route.root);
    this.items = breadcrumbs;
  }
}

