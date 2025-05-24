import { Component } from '@angular/core';
import { CardsComponent } from '../../ui/cards/cards.component';
import { TableComponent } from '../../shared-components/table/table.component';

@Component({
  selector: 'app-all-interviews',
  imports: [TableComponent],
  templateUrl: './all-interviews.component.html',
  styleUrl: './all-interviews.component.scss'
})
export class AllInterviewsComponent {


  completedInterviewsDataSource: any[] = [
    { id: 'CAN014', name: 'Tanvi Rao', interviewDate: '12/04/2025' },
    { id: 'CAN011', name: 'Rajat Verma', interviewDate: '11/04/2025' },
    { id: 'CAN015', name: 'Aditya Pillai', interviewDate: '16/04/2025' }
  ];

  completedColumns: Array<{ key: string, label: string, filterable: boolean }> = [
  { key: 'id', label: 'Candidate ID', filterable: false },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'interviewDate', label: 'Interview Date', filterable: false }
];

completedGlobalFilterFields = this.completedColumns.map(c => c.key);

}
