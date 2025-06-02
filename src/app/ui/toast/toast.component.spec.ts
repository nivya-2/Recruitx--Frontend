import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let messageService: MessageService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [MessageService]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call messageService.add() when showToast() is called', () => {
    const spy = spyOn(messageService, 'add');
    component.toastData = {
      severity: 'success',
      summary: 'Success',
      detail: 'Operation completed'
    };

    component.showToast();

    expect(spy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Operation completed'
    });
  });

  it('should use default toastData if none provided', () => {
    const spy = spyOn(messageService, 'add');
    // use the default value already set in the component
    component.showToast();

    expect(spy).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Info',
      detail: 'Default message'
    });
  });

  it('should update toastData and reflect in showToast()', () => {
    const spy = spyOn(messageService, 'add');

    // Change input values
    component.toastData = {
      severity: 'warn',
      summary: 'Warning',
      detail: 'Be careful!'
    };

    component.showToast();

    expect(spy).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Be careful!'
    });
  });
});
