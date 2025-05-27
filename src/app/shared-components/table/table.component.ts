import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output, OnInit, OnChanges } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonComponent } from '../../ui/button/button.component';
import { CalendarModule } from 'primeng/calendar'; // Add this import
import { ProgressbarComponent } from '../../ui/progressbar/progressbar.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-table',
  imports: [ProgressbarComponent, CommonModule, TableModule, InputTextModule, ButtonModule, PaginatorModule, IconField, InputIcon, ButtonComponent, CalendarModule,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges {

  
  @Input() dataSource:any[]=[];
  @Input() columns:any=[];
  @Input() globalFilterFields: string[]=[];
  @Input() hover:boolean= false;
  @Input() rows:number = 5;
  @Input() showFilter: boolean = true;
  @Input() fontSize: any = '12px';
  @Input() rowClickFn: (rowData: any) => void = () => {};
  @Output() openModal = new EventEmitter<boolean>();
  @Input() actionMethods: { [key: string]: (rowData: any) => any } = {};

  @HostBinding('class.hover-enabled') get isHoverEnabled() {
    return this.hover;
  }

  hasMultipleActionsInColumn(): boolean {
    const actionsColumn = this.columns.find((col: { key: string; }) => col.key === 'actions');
    if (!actionsColumn) return false;
    
    return this.dataSource.some(row => 
      row[actionsColumn.key] && Array.isArray(row[actionsColumn.key]) && row[actionsColumn.key].length > 1
    );
  }

  clear(table: Table): void {
    table.clear();
  }

  handleRowClick(rowData: any): void {
    if (this.hover && this.rowClickFn) {
      this.rowClickFn(rowData);
    }
  }

  isDate(value: any): boolean {
    if (value instanceof Date) {
      return true;
    }
    
    if (typeof value === 'string') {
      const timestamp = Date.parse(value);
      return !isNaN(timestamp);
    }
    
    return false;
  }

  handleActionClick(action: string, rowData: any): void {
    const method = this.actionMethods[action];
    
    if (method && typeof method === 'function') {
      method(rowData);
    } else {
      console.warn(`No method found for action: ${action} (looking for key: ${action})`);
    }
  }



isFileStatus(value: any): boolean {
  // Check if this is a file status string
  const fileStatuses = ['Ready to upload', 'Uploading', 'Completed', 'Error', 'Processing'];
  return typeof value === 'string' && fileStatuses.includes(value);
}

getStatusClass(fstatus: string): string {
  switch (fstatus) {
    case 'Ready to upload':
      return 'ready';
    case 'Uploading':
    case 'Processing':
      return 'processing';
    case 'Completed':
      return 'success';
    case 'Error':
      return 'error';
    default:
      return 'ready';
  }
}

  // Add computed percentage property to data
  ngOnInit(): void {
    this.processDataForSorting();
  }

  ngOnChanges(): void {
    this.processDataForSorting();
  }

  private processDataForSorting(): void {
    this.dataSource = this.dataSource.map(item => ({
      ...item,
      statusPercentage: item.status && item.status.total > 0 
        ? (item.status.current / item.status.total) * 100 
        : 0
    }));
  }



}