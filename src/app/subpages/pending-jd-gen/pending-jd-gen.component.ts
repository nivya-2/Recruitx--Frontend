import { Component, OnInit } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { DetailsComponent } from "../details/details.component";
import { ModalComponent } from '../../ui/modal/modal.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PendingJd, PendingJdService } from '../../core/services/api/pending-jd-gen.service';

@Component({
  selector: 'app-pending-jd-gen',
  imports: [TableComponent, DetailsComponent, ModalComponent,CommonModule],
  templateUrl: './pending-jd-gen.component.html',
  styleUrl: './pending-jd-gen.component.scss'
})

export class PendingJdGenComponent implements OnInit {
  dataSource: PendingJd[] = []
    isLoading: boolean = true;
    selectedAction: 'GenerateJD' | 'Draft' | null = null;

  
    constructor(private pendingJdService: PendingJdService) {}

  ngOnInit(): void {

        this.loadPendingJds();

  }

  loadPendingJds(): void {
    this.pendingJdService.getPendingJds().subscribe({
      next: (response) => {
        const data = response.data ;
        this.dataSource = data.map(jr => ({
          ...jr,
          id: `EXP_${jr.jobRequisitionId.toString().padStart(3, '0')}`,
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading pending JDs:', err);
        this.isLoading = false;
      }
    });
  }

 handleActionComplete(): void {
    this.visible = false; // Close the modal
    this.loadPendingJds(); // Refresh the table data
  }

  selectedJdId: number = 0;
  visible: boolean = false;


  onGenerateJD = (row: any) => {
    this.selectedJdId = row.jobRequisitionId;
    this.selectedAction = 'GenerateJD'; // Set action type
    this.visible = true; // Open modal
    console.log(`Generate JD for: ${this.selectedJdId}`);
  };

  onDraft = (row: any) => {
    this.selectedJdId = row.jobRequisitionId;
    this.selectedAction = 'Draft'; // Set action type
    this.visible = true; // Open modal
    console.log(`Open Draft for: ${this.selectedJdId}`);
  };


  actionMethods = {'GenerateJD': this.onGenerateJD,   'Draft': this.onDraft };

  columns: Array<{ key: string, label: string, filterable: boolean ,type?:string}> = [
    { key: 'id', label: 'ID', filterable: false },
    { key: 'roleTitle', label: 'Role Title', filterable: true },
    { key: 'businessUnit', label: 'Delivery Unit', filterable: true },
    { key: 'location', label: 'Location', filterable: true },
    { key: 'openPositions', label: 'No. of Open Positions', filterable: false },
    { key: 'createdDate', label: 'Created Date', filterable: true ,type: 'date'},
    { key: 'hiringManager', label: 'Hiring Manager', filterable: true },
    { key: 'actions', label: 'Actions', filterable: false ,type:"actions"}
  ];

  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions');

   
}
