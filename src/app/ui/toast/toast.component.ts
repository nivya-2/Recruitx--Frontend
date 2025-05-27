
import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Button, ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
@Component({
  selector: 'app-toast',
  imports: [Toast,Button],
  templateUrl: './toast.component.html',
  providers: [MessageService],
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
    constructor(private messageService: MessageService) {}
    @Input() toastData: { severity: string; summary: string; detail: string } = {
      severity: 'info',
      summary: 'Info',
      detail: 'Default message'
  };

  showToast() {
      this.messageService.add({
          severity: this.toastData.severity,
          summary: this.toastData.summary,
          detail: this.toastData.detail
      });
  }
}
