import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output, OnInit, OnChanges, ViewChild } from '@angular/core';
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

    @ViewChild('table') table!: Table;

  
  @Input() dataSource:any[]=[];
  @Input() columns:any[]=[];
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
    dateFilters: { [key: string]: Date | null } = {};


  ngOnInit(): void {
    this.processDataForSorting();
    this.setupDateFilters();
  }

  ngOnChanges(): void {
    this.processDataForSorting();
    this.setupDateFilters();
  }

   private setupDateFilters(): void {
    this.columns.forEach(col => {
      if (col.type === 'date' && col.filterable) {
        this.dateFilters[col.key] = null;
        // Register custom filter constraint
        (this.table as any).filterConstraints[col.key] = this.createDateFilterConstraint();
      }
    });
  }

  private createDateFilterConstraint() {
    return {
      filter: (value: any, filter: any) => {
        if (!filter) return true;
        if (!value) return false;

        const valueDate = this.parseDate(value);
        const filterDate = this.parseDate(filter);
        
        if (!valueDate || !filterDate) return false;
        
        return valueDate.toDateString() === filterDate.toDateString();
      }
    };
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
    this.dateFilters = {};
    this.columns.forEach(col => {
      if (col.type === 'date' && col.filterable) {
        this.dateFilters[col.key] = null;
      }
    });
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
      // Check for dd/MM/yyyy format specifically
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (dateRegex.test(value)) {
        const parsedDate = this.parseDate(value);
        return parsedDate !== null && !isNaN(parsedDate.getTime());
      }
      
      // Fallback to general date parsing
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
 

  private processDataForSorting(): void {
    this.dataSource = this.dataSource.map(item => ({
      ...item,
      statusPercentage: item.status && item.status.total > 0 
        ? (item.status.current / item.status.total) * 100 
        : 0
    }));
  }




    getDateFilterValue(columnKey: string): Date | null {
    return this.dateFilters[columnKey] || null;
  }

  // Handle date filter changes
  onDateFilterChange(selectedDate: Date | null, columnKey: string): void {
    this.dateFilters[columnKey] = selectedDate;
    
    if (selectedDate) {
      // Format date to match your data format (dd/MM/yyyy)
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      
      this.table.filter(formattedDate, columnKey, 'equals');
    } else {
      this.table.filter(null, columnKey, 'equals');
    }
  }
  // Format date to dd/MM/yyyy to match your data format
  private formatDateForFilter(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Parse dd/MM/yyyy string to Date object
  
  private parseDate(value: any): Date | null {
    if (value instanceof Date) return value;
    if (!value) return null;

    // Handle dd/MM/yyyy format
    if (typeof value === 'string' && value.includes('/')) {
      const parts = value.split('/');
      if (parts.length === 3) {
        return new Date(+parts[2], +parts[1] - 1, +parts[0]);
      }
    }

    // Fallback to native date parsing
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }


  // Custom date filter method
  filterDate(value: any, filter: any): boolean {
    if (!filter) {
      return true;
    }
    
    if (!value) {
      return false;
    }

    try {
      // Handle string dates in dd/MM/yyyy format
      if (typeof value === 'string' && typeof filter === 'string') {
        return value === filter;
      }
      
      // Handle Date objects
      const valueDate = typeof value === 'string' ? this.parseDate(value) : new Date(value);
      const filterDate = typeof filter === 'string' ? this.parseDate(filter) : new Date(filter);
      
      if (!valueDate || !filterDate) {
        return false;
      }
      
      // Reset time to compare only dates
      valueDate.setHours(0, 0, 0, 0);
      filterDate.setHours(0, 0, 0, 0);
      
      return valueDate.getTime() === filterDate.getTime();
    } catch (error) {
      console.error('Date filtering error:', error);
      return false;
    }
  }

}