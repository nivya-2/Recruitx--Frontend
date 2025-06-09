
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from "../../ui/modal/modal.component";
import { JrCardComponent } from "../jr-card/jr-card.component";
import { AlertsComponent } from "../../ui/alerts/alerts.component";
import { ToastComponent } from "../../ui/toast/toast.component";
import { JrApiService } from '../../core/services/api/jr-api.service';
import { ProgressSpinner } from 'primeng/progressspinner';
@Component({
  selector: 'app-list-view',
  imports: [NgIf,ProgressSpinner,ButtonComponent, NgFor, ModalComponent, JrCardComponent, AlertsComponent, ToastComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
   isLoading = false;

  constructor(private jrApi: JrApiService) {}
  selectedJob: any | null = null;
  visible : boolean =false;
@Input() jobs: { id: number; title: string; date: string; location: string; positions: number }[] = [];

 
@ViewChild('toastComp') toastComponent: any;

selectedJobId: number | null = null;

assignClick(jobId: number) {
  this.selectedJobId = jobId;
  this.visible = true;
     this.isLoading = true;

  // Replace this with actual API call
  this.fetchJobDetails(jobId);
  this.isLoading = false;

}
selectedJobDetails: any = {
    
  };

  

fetchJobDetails(jobId: number): void {

  this.jrApi.getJobDetailsById(jobId).subscribe({
    next: (response) => {
      const data = response.data;

      this.selectedJobDetails = {
        id: data.id,
        requisitionId: `REQ–2025–DSCV–${data.id.toString().padStart(3, '0')}`,
        jobTitle: data.jobTitle,
        deliveryUnit: data.department,
        team: data.department,
        location: data.location,
        openPositions: data.openPositions,
        raisedOn: new Date(data.requestedDate).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),
        hiringManager: data.hiringManager,
        recruiter: 'Not Assigned',
        qualifications: [data.qualification]
      };

      this.visible = true;
    },
    error: (err) => {
      console.error('Error fetching job details', err);
    }
  });
}



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