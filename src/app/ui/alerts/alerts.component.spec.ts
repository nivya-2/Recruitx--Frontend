import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';
import { ConfirmationService, MessageService, Confirmation } from 'primeng/api';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsComponent],
      providers: [ConfirmationService, MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call confirmationService.confirm on showConfirm', () => {
    const confirmSpy = spyOn(component['confirmationService'], 'confirm').and.callThrough();

    component.showConfirm(new MouseEvent('click'));

    expect(confirmSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      message: 'Are you sure you want to proceed?',
    }));
  });

  it('should handle accept callback in showConfirmDialog', () => {
    const messageSpy = spyOn(component['messageService'], 'add');
    let capturedOptions: any;

    spyOn(component['confirmationService'], 'confirm')
      .and.callFake(((options: any) => {
        capturedOptions = options;
      }) as (confirmation: Confirmation) => ConfirmationService); // ✅ Correct cast

    const mockAccept = jasmine.createSpy('onAccept');

    component.showConfirmDialog({
      message: 'Test message',
      onAccept: mockAccept,
      acceptSummary: 'Accepted!',
      acceptDetail: 'Details here.'
    });

    expect(capturedOptions).toBeDefined();
    capturedOptions.accept();

    expect(mockAccept).toHaveBeenCalled();
    expect(messageSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      summary: 'Accepted!',
      detail: 'Details here.'
    }));
  });

  it('should handle reject callback in showConfirmDialog', () => {
    const messageSpy = spyOn(component['messageService'], 'add');
    let capturedOptions: any;

    spyOn(component['confirmationService'], 'confirm')
      .and.callFake(((options: any) => {
        capturedOptions = options;
      }) as (confirmation: Confirmation) => ConfirmationService); // ✅ Correct cast

    const mockReject = jasmine.createSpy('onReject');

    component.showConfirmDialog({
      message: 'Test message',
      onReject: mockReject,
      rejectSummary: 'Rejected!',
      rejectDetail: 'No action taken.'
    });

    expect(capturedOptions).toBeDefined();
    capturedOptions.reject();

    expect(mockReject).toHaveBeenCalled();
    expect(messageSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      summary: 'Rejected!',
      detail: 'No action taken.'
    }));
  });

});
