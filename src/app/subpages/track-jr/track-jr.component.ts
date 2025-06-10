import { Component } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { TrackJobRequisitionDTO, TrackJrService } from '../../core/services/api/track-jr.service';

@Component({
  selector: 'app-track-jr',
  imports: [ TableComponent],
  templateUrl: './track-jr.component.html',
  styleUrl: './track-jr.component.scss'
})
export class TrackJrComponent {
  
isLoading:boolean=false;
dataSource:any=[]
constructor(
    private trackRequisitionService: TrackJrService,
  ) {}

  ngOnInit(): void {
    this.loadRequisitions();
  }

  loadRequisitions(): void {
    this.isLoading = true;
    this.trackRequisitionService.getTrackingDashboard().subscribe({
      next: (response) => {
        // Map the backend DTO to the format your table component expects
        this.dataSource = this.mapDataForTable(response.data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load job requisition data:', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * A helper function to map the API response data (PascalCase) to the
   * format expected by your table component's columns (camelCase).
   */
  private mapDataForTable(data: TrackJobRequisitionDTO[]): any[] {
    return data.map(dto => ({
      jobId: `EXP_${dto.id.toString().padStart(3, '0')}`, // Example formatting
      jobTitle: dto.role,
      du: dto.departmentName,
      location: dto.locationName,
      status: dto.status,
      jrProgress: { current: dto.filledPositions, total: dto.numPositions },
      hiringManager: dto.hiringManagerName,
      assignedTo: dto.assignedTo,
      assignedOn: dto.assignedOn, // The table component's date pipe will format this
      closeBy: dto.closeBy
    }));
  }

  columns = [
    { key: 'jobId', label: 'ID', filterable: true },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'du', label: 'Delivery Unit', filterable: true },
    { key: 'location', label: 'Location', filterable: true },
    { key: 'status', label: 'Status', filterable: true },
    { key: 'jrProgress', label: 'Progress', filterable: false,type:'progress' },
    { key: 'hiringManager', label: 'Hiring Manager', filterable: true },
    { key: 'assignedTo', label: 'Assigned To', filterable: true },
    { key: 'assignedOn', label: 'Assigned On', filterable: true, type: 'date' },
    { key: 'closeBy', label: 'Close By', filterable: true,  type: 'date' }
  ];

  // Global filter fields
  globalFilterFields = this.columns.map(col => col.key);
}
