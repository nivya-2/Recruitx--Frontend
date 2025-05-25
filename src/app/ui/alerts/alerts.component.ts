import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [ConfirmDialog, ToastModule, ButtonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class AlertsComponent {
  @Input() header: string = 'Confirmation';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() icon: string = 'pi pi-exclamation-triangle';
  @Input() acceptLabel: string = 'Save';
  @Input() rejectLabel: string = 'Cancel';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.message,
      header: this.header,
      closable: true,
      closeOnEscape: true,
      icon: this.icon,
      rejectButtonProps: {
        label: this.rejectLabel,
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: this.acceptLabel,
      },
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
