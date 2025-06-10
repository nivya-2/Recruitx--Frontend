import { Component } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';

@Component({
  selector: 'app-closed-jd',
  imports: [HeaderTextComponent,TableComponent],
  templateUrl: './closed-jd.component.html',
  styleUrl: './closed-jd.component.scss'
})
export class ClosedJdComponent {
dataSource:any = [
    { id: 'JD001', roleTitle: 'Software Engineer', deliveryUnit: 'DU1', location: 'Bangalore', experience: '3 years', createdDate: '04/04/2025', associatedJr: 'JR2025-112' },
    { id: 'JD002', roleTitle: 'UX Designer', deliveryUnit: 'DU3', location: 'Trivandrum', experience: '4 years', createdDate: '12/02/2025', associatedJr: 'JR2025-113' },
    { id: 'JD003', roleTitle: 'Data Analyst', deliveryUnit: 'DU2', location: 'Kochi', experience: '6 years', createdDate: '20/03/2025', associatedJr: 'JR2025-114' },
    { id: 'JD004', roleTitle: 'Sales Manager', deliveryUnit: 'DU4', location: 'Kochi', experience: '5 years', createdDate: '17/01/2025', associatedJr: 'JR2025-115' },
    { id: 'JD005', roleTitle: 'Junior HR', deliveryUnit: 'DU6', location: 'Trivandrum', experience: '3 years', createdDate: '10/04/2025', associatedJr: 'JR2025-116' },
    { id: 'JD005', roleTitle: 'Junior HR', deliveryUnit: 'DU6', location: 'Trivandrum', experience: '3 years', createdDate: '10/04/2025', associatedJr: 'JR2025-116' },
    { id: 'JD005', roleTitle: 'Junior HR', deliveryUnit: 'DU6', location: 'Trivandrum', experience: '3 years', createdDate: '10/04/2025', associatedJr: 'JR2025-116' },
    { id: 'JD005', roleTitle: 'Junior HR', deliveryUnit: 'DU6', location: 'Trivandrum', experience: '3 years', createdDate: '10/04/2025', associatedJr: 'JR2025-116' },
    { id: 'JD005', roleTitle: 'Junior HR', deliveryUnit: 'DU6', location: 'Trivandrum', experience: '3 years', createdDate: '10/04/2025', associatedJr: 'JR2025-116' }
  ];

  columns = [
    { key: 'id', label: 'ID', filterable: false },
    { key: 'roleTitle', label: 'Role Title', filterable: true },
    { key: 'deliveryUnit', label: 'Delivery Unit', filterable: true },
    { key: 'location', label: 'Location', filterable: true },
    { key: 'experience', label: 'Experience', filterable: false },
    { key: 'createdDate', label: 'Created Date', filterable: false,type:'date' },
    { key: 'associatedJr', label: 'Associated JR', filterable: false }
  ];

  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'associatedJr');
}
