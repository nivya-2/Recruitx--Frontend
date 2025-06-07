import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { TabsModule } from 'primeng/tabs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsModule, RouterTestingModule, TabsComponent], // Import TabsModule and RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Provide some sample tabs
    component.tabs = [
      { title: 'Home', value: 0, route: '/home' },
      { title: 'Profile', value: 1, route: '/profile' },
      { title: 'Settings', value: 2, route: '/settings' },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tab titles', () => {
    const tabElements = fixture.debugElement.queryAll(By.css('p-tab'));
    expect(tabElements.length).toBe(3);
    expect(tabElements[0].nativeElement.textContent).toContain('Home');
    expect(tabElements[1].nativeElement.textContent).toContain('Profile');
    expect(tabElements[2].nativeElement.textContent).toContain('Settings');
  });

  it('should navigate to correct route on tab change', () => {
    spyOn(router, 'navigate');

    // Simulate a tab change event
    const event = { index: 1 }; // Simulate selecting second tab (Profile)
    component.onTabChange(event);

    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });
});
