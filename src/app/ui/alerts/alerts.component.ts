import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';

export interface ConfirmDialogOptions {
  message: string;
  header?: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptSeverity?: string;      // e.g., 'success'
  rejectSeverity?: string;      // e.g., 'info'
  acceptSummary?: string;
  rejectSummary?: string;
  acceptDetail?: string;
  rejectDetail?: string;
  acceptLife?: number;
  rejectLife?: number;
  onAccept?: () => void;
  onReject?: () => void;
  target?: EventTarget;         // Optional for targeting element on confirm
}

@Component({
  selector: 'app-alerts',
  imports: [Toast, Button, ConfirmDialog],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AlertsComponent {
  showToast(arg0: string) {
    throw new Error('Method not implemented.');
  }
  @Input() header = 'Confirmation';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() icon = 'pi pi-exclamation-triangle';
  @Input() acceptLabel = 'Save';
  @Input() rejectLabel = 'Cancel';
  @Output() confirmAccepted = new EventEmitter<void>();

  private dynamicMessage: string = '';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // Reusable generic confirm dialog method
  showConfirmDialog(options: ConfirmDialogOptions) {
    this.confirmationService.confirm({
      target: options.target,
      message: options.message,
      header: options.header || this.header,
      icon: options.icon || this.icon,
      closable: true,
      closeOnEscape: true,
      acceptButtonProps: {
        label: options.acceptLabel || 'Yes',
      },
      rejectButtonProps: {
        label: options.rejectLabel || 'No',
        severity: options.rejectSeverity || 'secondary',
        outlined: true,
      },
      accept: () => {
        if (options.onAccept) {
          options.onAccept();
        }
        this.messageService.add({
          severity: options.acceptSeverity || 'success',
          summary: options.acceptSummary || 'Confirmed',
          detail: options.acceptDetail || 'Action completed successfully.',
          life: options.acceptLife || 3000,
        });
        this.confirmAccepted.emit();
      },
      reject: () => {
        if (options.onReject) {
          options.onReject();
        }
        this.messageService.add({
          severity: options.rejectSeverity || 'info',
          summary: options.rejectSummary || 'Cancelled',
          detail: options.rejectDetail || 'No changes were made.',
          life: options.rejectLife || 3000,
        });
      },
    });
  }

  // Keep your old showConfirm for backward compatibility or static confirms
  showConfirm(event: MouseEvent) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.message,
      header: this.header,
      icon: this.icon,
      closable: true,
      closeOnEscape: true,
      acceptButtonProps: {
        label: this.acceptLabel,
      },
      rejectButtonProps: {
        label: this.rejectLabel,
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
          life: 3000,
        });
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