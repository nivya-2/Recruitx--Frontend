import { Component, OnInit } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { DetailsComponent } from "../details/details.component";
import { ModalComponent } from '../../ui/modal/modal.component';
import { PendingJd, PendingJdService } from '../../services/pending-jd-gen.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
      next: (data) => {
        this.dataSource = data.map(jr => ({
          ...jr,
          id: `JR${jr.jobRequisitionId.toString().padStart(3, '0')}`,
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading pending JDs:', err);
        this.isLoading = false;
      }
    });
  }



  // dataSource: any[] = [
  //   {
  //     id: 'JR2025-112',
  //     roleTitle: 'Software Engineer',
  //     deliveryUnit: 'DU1',
  //     location: 'Bangalore',
  //     openPositions: 6,
  //     createdDate: '04/04/2025',
  //     hiringManager: 'Dave John',
  //     actions: ['Generate JD']
  //   },
  //   {
  //     id: 'JR2025-112',
  //     roleTitle: 'UX Designer',
  //     deliveryUnit: 'DU3',
  //     location: 'Trivandrum',
  //     openPositions: 4,
  //     createdDate: '12/02/2025',
  //     hiringManager: 'John Doe',
  //     actions:[ 'Draft']
  //   },
  //   {
  //     id: 'JR2025-112',
  //     roleTitle: 'Data Analyst',
  //     deliveryUnit: 'DU2',
  //     location: 'Kochi',
  //     openPositions: 2,
  //     createdDate: '20/03/2025',
  //     hiringManager: 'Alice Smith',
  //     actions: ['Generate JD']
  //   },
  //   {
  //     id: 'JR2025-112',
  //     roleTitle: 'Sales Manager',
  //     deliveryUnit: 'DU4',
  //     location: 'Kochi',
  //     openPositions: 4,
  //     createdDate: '17/01/2025',
  //     hiringManager: 'Arjun Menon',
  //     actions:[ 'Draft']
  //   },
  //   {
  //     id: 'JR2025-112',
  //     roleTitle: 'Junior HR',
  //     deliveryUnit: 'DU6',
  //     location: 'Trivandrum',
  //     openPositions: 2,
  //     createdDate: '10/04/2025',
  //     hiringManager: 'Rajat Kumar',
  //     actions: ['Generate JD']
  //   },
  //   {
  //     id: 'JR2025-112',
  //     roleTitle: 'Junior HR',
  //     deliveryUnit: 'DU6',
  //     location: 'Trivandrum',
  //     openPositions: 2,
  //     createdDate: '10/04/2025',
  //     hiringManager: 'Rajat Kumar',
  //     actions: ['Generate JD']
  //   },
  //   {
  //     id: 'JR2025-112',
  //     roleTitle: 'Junior HR',
  //     deliveryUnit: 'DU6',
  //     location: 'Trivandrum',
  //     openPositions: 2,
  //     createdDate: '10/04/2025',
  //     hiringManager: 'Rajat Kumar',
  //     actions: ['Generate JD']
  //   },
  //   {
  //     id: 'JR2025-112',
  //     roleTitle: 'Junior HR',
  //     deliveryUnit: 'DU6',
  //     location: 'Trivandrum',
  //     openPositions: 2,
  //     createdDate: '10/04/2025',
  //     hiringManager: 'Rajat Kumar',
  //     actions: ['Generate JD']
  //   }
  // ];
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
    { key: 'actions', label: 'Actions', filterable: false }
  ];

  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions');

   
}
