import { Component, Input, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { NgFor } from '@angular/common';
import { ModalComponent } from "../../ui/modal/modal.component";
import { JrCardComponent } from "../jr-card/jr-card.component";
import { AlertsComponent } from "../../ui/alerts/alerts.component";
import { ToastComponent } from "../../ui/toast/toast.component";

@Component({
  selector: 'app-list-view',
  imports: [ButtonComponent, NgFor, ModalComponent, JrCardComponent, AlertsComponent, ToastComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
  visible : boolean =false;
  @Input() jobs: { title: string; date: string; location: string; positions: number }[] = [];
assignClick() {
   this.visible=!this.visible
  }
 
@ViewChild('toastComp') toastComponent: any;


handleAssignCompleted(assignedMember: any) {
    this.visible = false;  // Close modal

    const selectedName = assignedMember?.fullName || 'No recruiter selected';

    this.toastComponent.toastData = {
        severity: 'success',
        summary: 'Assigned',
        detail: `${selectedName} has been assigned successfully!`
    };

    this.toastComponent.showToast();
}

}
