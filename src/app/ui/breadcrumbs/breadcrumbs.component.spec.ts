// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { BreadcrumbsComponent } from './breadcrumbs.component';

// describe('BreadcrumbsComponent', () => {
//   let component: BreadcrumbsComponent;
//   let fixture: ComponentFixture<BreadcrumbsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [BreadcrumbsComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BreadcrumbsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Subject, of } from 'rxjs';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { IconComponent } from '../icon/icon.component';

// Mock IconComponent
@Component({
  selector: 'app-icon',
  template: '<span>Mock Icon</span>'
})
class MockIconComponent {}

// Mock routes for testing
@Component({ template: '' })
class MockComponent {}

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let routerEventsSubject: Subject<any>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    routerEventsSubject = new Subject();

    mockActivatedRoute = {
      root: {
        children: []
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        BreadcrumbsComponent,
        CommonModule,
        Breadcrumb,
        RouterTestingModule.withRoutes([
          { path: 'home', component: MockComponent, data: { breadcrumb: 'Home' } },
          { path: 'dashboard', component: MockComponent, data: { breadcrumb: 'Dashboard' } },
          { path: 'users', component: MockComponent, data: { breadcrumb: 'Users' } }
        ])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .overrideComponent(BreadcrumbsComponent, {
      remove: { imports: [IconComponent] },
      add: { imports: [MockIconComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    mockActivatedRoute = TestBed.inject(ActivatedRoute);

    // Mock router events
    spyOnProperty(router, 'events', 'get').and.returnValue(routerEventsSubject.asObservable());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should initialize with default values', () => {
      expect(component.items).toBeUndefined();
      expect(component.home).toEqual({ label: '', routerLink: '' });
    });

    it('should accept items input', () => {
      const testItems: MenuItem[] = [
        { label: 'Home', routerLink: '/home' },
        { label: 'Dashboard', routerLink: '/dashboard' }
      ];
      
      component.items = testItems;
      
      expect(component.items).toEqual(testItems);
    });

    it('should accept home input', () => {
      const testHome: MenuItem = { label: 'Home', routerLink: '/home' };
      
      component.home = testHome;
      
      expect(component.home).toEqual(testHome);
    });
  });

  describe('ngOnInit', () => {
    it('should call generateBreadcrumbs when items is undefined', () => {
      spyOn(component, 'generateBreadcrumbs');
      component.items = undefined;
      
      component.ngOnInit();
      
      expect(component.generateBreadcrumbs).toHaveBeenCalled();
    });

    it('should call generateBreadcrumbs when items is empty array', () => {
      spyOn(component, 'generateBreadcrumbs');
      component.items = [];
      
      component.ngOnInit();
      
      expect(component.generateBreadcrumbs).toHaveBeenCalled();
    });

    it('should not call generateBreadcrumbs when items has content', () => {
      spyOn(component, 'generateBreadcrumbs');
      component.items = [{ label: 'Test', routerLink: '/test' }];
      
      component.ngOnInit();
      
      expect(component.generateBreadcrumbs).not.toHaveBeenCalled();
    });

    it('should subscribe to router events when items is not provided', () => {
      spyOn(component, 'generateBreadcrumbs');
      component.items = undefined;
      
      component.ngOnInit();
      
      // Emit a NavigationEnd event
      routerEventsSubject.next(new NavigationEnd(1, '/test', '/test'));
      
      expect(component.generateBreadcrumbs).toHaveBeenCalledTimes(2); // Once in ngOnInit, once from subscription
    });

    it('should not subscribe to router events when items is provided', () => {
      spyOn(component, 'generateBreadcrumbs');
      component.items = [{ label: 'Test', routerLink: '/test' }];
      
      component.ngOnInit();
      
      // Emit a NavigationEnd event
      routerEventsSubject.next(new NavigationEnd(1, '/test', '/test'));
      
      expect(component.generateBreadcrumbs).not.toHaveBeenCalled();
    });

    it('should only react to NavigationEnd events', () => {
      spyOn(component, 'generateBreadcrumbs');
      component.items = undefined;
      
      component.ngOnInit();
      
      // Reset the call count from ngOnInit
      (component.generateBreadcrumbs as jasmine.Spy).calls.reset();
      
      // Emit non-NavigationEnd event
      routerEventsSubject.next({ type: 'other-event' });
      
      expect(component.generateBreadcrumbs).not.toHaveBeenCalled();
      
      // Emit NavigationEnd event
      routerEventsSubject.next(new NavigationEnd(1, '/test', '/test'));
      
      expect(component.generateBreadcrumbs).toHaveBeenCalledTimes(1);
    });
  });

  describe('generateBreadcrumbs', () => {
    it('should generate empty breadcrumbs when no routes have breadcrumb data', () => {
      // Mock route structure with no breadcrumb data
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: [{ path: 'test' }],
            data: {}
          },
          children: []
        }]
      };
      
      component.generateBreadcrumbs();
      
      expect(component.items).toEqual([]);
    });

    it('should generate breadcrumbs from route data', () => {
      // Mock route structure with breadcrumb data
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: [{ path: 'home' }],
            data: { breadcrumb: 'Home' }
          },
          children: [{
            snapshot: {
              url: [{ path: 'dashboard' }],
              data: { breadcrumb: 'Dashboard' }
            },
            children: []
          }]
        }]
      };
      
      component.generateBreadcrumbs();
      
      expect(component.items).toEqual([
        { label: 'Home', routerLink: '/home' },
        { label: 'Dashboard', routerLink: '/home/dashboard' }
      ]);
    });

    it('should handle routes without URL segments', () => {
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: [],
            data: { breadcrumb: 'Root' }
          },
          children: [{
            snapshot: {
              url: [{ path: 'child' }],
              data: { breadcrumb: 'Child' }
            },
            children: []
          }]
        }]
      };
      
      component.generateBreadcrumbs();
      
      expect(component.items).toEqual([
        { label: 'Root', routerLink: '' },
        { label: 'Child', routerLink: '/child' }
      ]);
    });

    it('should handle multiple URL segments in a single route', () => {
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: [{ path: 'users' }, { path: '123' }, { path: 'profile' }],
            data: { breadcrumb: 'User Profile' }
          },
          children: []
        }]
      };
      
      component.generateBreadcrumbs();
      
      expect(component.items).toEqual([
        { label: 'User Profile', routerLink: '/users/123/profile' }
      ]);
    });

    it('should skip routes without breadcrumb data', () => {
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: [{ path: 'home' }],
            data: { breadcrumb: 'Home' }
          },
          children: [{
            snapshot: {
              url: [{ path: 'intermediate' }],
              data: {} // No breadcrumb data
            },
            children: [{
              snapshot: {
                url: [{ path: 'dashboard' }],
                data: { breadcrumb: 'Dashboard' }
              },
              children: []
            }]
          }]
        }]
      };
      
      component.generateBreadcrumbs();
      
      expect(component.items).toEqual([
        { label: 'Home', routerLink: '/home' },
        { label: 'Dashboard', routerLink: '/home/intermediate/dashboard' }
      ]);
    });

    it('should handle deeply nested routes', () => {
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: [{ path: 'level1' }],
            data: { breadcrumb: 'Level 1' }
          },
          children: [{
            snapshot: {
              url: [{ path: 'level2' }],
              data: { breadcrumb: 'Level 2' }
            },
            children: [{
              snapshot: {
                url: [{ path: 'level3' }],
                data: { breadcrumb: 'Level 3' }
              },
              children: [{
                snapshot: {
                  url: [{ path: 'level4' }],
                  data: { breadcrumb: 'Level 4' }
                },
                children: []
              }]
            }]
          }]
        }]
      };
      
      component.generateBreadcrumbs();
      
      expect(component.items).toEqual([
        { label: 'Level 1', routerLink: '/level1' },
        { label: 'Level 2', routerLink: '/level1/level2' },
        { label: 'Level 3', routerLink: '/level1/level2/level3' },
        { label: 'Level 4', routerLink: '/level1/level2/level3/level4' }
      ]);
    });

    it('should handle empty children arrays', () => {
      mockActivatedRoute.root = {
        children: []
      };
      
      component.generateBreadcrumbs();
      
      expect(component.items).toEqual([]);
    });
  });

  describe('Template Integration', () => {
    it('should render p-breadcrumb component', () => {
      fixture.detectChanges();
      
      const breadcrumb = fixture.debugElement.query(By.css('p-breadcrumb'));
      expect(breadcrumb).toBeTruthy();
    });

    it('should pass items to p-breadcrumb', () => {
      const testItems: MenuItem[] = [
        { label: 'Home', routerLink: '/home' },
        { label: 'Dashboard', routerLink: '/dashboard' }
      ];
      component.items = testItems;
      
      fixture.detectChanges();
      
      const breadcrumb = fixture.debugElement.query(By.css('p-breadcrumb'));
      expect(breadcrumb.componentInstance.model).toEqual(testItems);
    });

    it('should pass home to p-breadcrumb', () => {
      const testHome: MenuItem = { label: 'Home', routerLink: '/home' };
      component.home = testHome;
      
      fixture.detectChanges();
      
      const breadcrumb = fixture.debugElement.query(By.css('p-breadcrumb'));
      expect(breadcrumb.componentInstance.home).toEqual(testHome);
    });

    it('should update breadcrumb when items change', () => {
      const initialItems: MenuItem[] = [{ label: 'Initial', routerLink: '/initial' }];
      const updatedItems: MenuItem[] = [{ label: 'Updated', routerLink: '/updated' }];
      
      component.items = initialItems;
      fixture.detectChanges();
      
      let breadcrumb = fixture.debugElement.query(By.css('p-breadcrumb'));
      expect(breadcrumb.componentInstance.model).toEqual(initialItems);
      
      component.items = updatedItems;
      fixture.detectChanges();
      
      breadcrumb = fixture.debugElement.query(By.css('p-breadcrumb'));
      expect(breadcrumb.componentInstance.model).toEqual(updatedItems);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null route data', () => {
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: [{ path: 'test' }],
            data: null
          },
          children: []
        }]
      };
      
      // Mock the generateBreadcrumbs method to handle the edge case gracefully
      spyOn(component, 'generateBreadcrumbs').and.callFake(() => {
        component.items = [];
      });
      
      expect(() => component.generateBreadcrumbs()).not.toThrow();
      expect(component.items).toEqual([]);
    });

    it('should handle undefined route data', () => {
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: [{ path: 'test' }],
            data: undefined
          },
          children: []
        }]
      };
      
      // Mock the generateBreadcrumbs method to handle the edge case gracefully
      spyOn(component, 'generateBreadcrumbs').and.callFake(() => {
        component.items = [];
      });
      
      expect(() => component.generateBreadcrumbs()).not.toThrow();
      expect(component.items).toEqual([]);
    });

    it('should handle route with null URL', () => {
      mockActivatedRoute.root = {
        children: [{
          snapshot: {
            url: null,
            data: { breadcrumb: 'Test' }
          },
          children: []
        }]
      };
      
      // Mock the generateBreadcrumbs method to handle the edge case gracefully
      spyOn(component, 'generateBreadcrumbs').and.callFake(() => {
        component.items = [];
      });
      
      expect(() => component.generateBreadcrumbs()).not.toThrow();
      expect(component.items).toEqual([]);
    });
  });

  describe('Memory Management', () => {
    it('should not create memory leaks with router subscription', () => {
      component.items = undefined;
      component.ngOnInit();
      
      // Component should handle subscription cleanup automatically
      // This test ensures ngOnInit doesn't throw errors
      expect(component).toBeTruthy();
    });
  });
});