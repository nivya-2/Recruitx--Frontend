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
import { FilterService } from 'primeng/api';

interface TableColumn {
  key: string;
  label?: string;
  type?: 'string' | 'number' | 'date' | 'boolean';
  sortable?: boolean;
  filterable?: boolean;
}
   export const CustomFilterMatchMode = {
  DATE_IS: 'dateIs',
  DATE_BEFORE: 'dateBefore',
  DATE_AFTER: 'dateAfter'
};

@Component({
  selector: 'app-table',
  imports: [ProgressbarComponent, CommonModule, TableModule, InputTextModule, ButtonModule, PaginatorModule, IconField, InputIcon, ButtonComponent, CalendarModule, FormsModule],
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
   private originalDataSource: any[] = [];
  private originalOrder: number[] = [];


  @HostBinding('class.hover-enabled') get isHoverEnabled() {
    return this.hover;
  }

  private defaultMatchModes: { [key: string]: string } = {};
  getDefaultMatchMode(columnKey: string): string {
  return this.defaultMatchModes[columnKey] || CustomFilterMatchMode.DATE_IS;
}


    dateFilters: { [key: string]: Date | null } = {};
     dateMatchModeOptions = [
  { label: 'Date Equals', value: CustomFilterMatchMode.DATE_IS },
  { label: 'Date Before', value: CustomFilterMatchMode.DATE_BEFORE },
  { label: 'Date After', value: CustomFilterMatchMode.DATE_AFTER }
];

  hasMultipleActionsInColumn(): boolean {
    const actionsColumn = this.columns.find((col: { key: string; }) => col.key === 'actions');
    if (!actionsColumn) return false;
    
    return this.dataSource.some(row => 
      row[actionsColumn.key] && Array.isArray(row[actionsColumn.key]) && row[actionsColumn.key].length > 1
    );
  }

  // clear(table: Table): void {
  //   table.clear();
  // }
  clear(table: Table): void {
    // Reset global filter input using ViewChild
    // if (this.globalFilter) {
    //   this.globalFilter.nativeElement.value = '';
    // }
    
    // Restore original order
    this.restoreOriginalOrder();
    
    // Clear all filters
    table.clear();
    
    // Clear sorting
    table.sortOrder = 0;
    table.sortField = '';
    table.multiSortMeta = [];
    
    // Reset to first page
    table.first = 0;
    
    // Refresh the table
    table.reset();

   
  }

  private restoreOriginalOrder(): void {
    if (this.originalDataSource.length > 0) {
      // Restore original data with computed properties
      this.dataSource = this.originalDataSource.map((item, index) => ({
        ...item,
        statusPercentage: item.jrProgress && item.jrProgress.total > 0 
          ? (item.jrProgress.current / item.jrProgress.total) * 100 
          : 0,
        originalIndex: index
      }));
    }
  }

  handleRowClick(rowData: any): void {
    if (this.hover && this.rowClickFn) {
      this.rowClickFn(rowData);
    }
  }

 private parseCustomDate(value: string): Date | null {
  // Handle dd/MM/yyyy format
  const ddMMyyyyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = value.match(ddMMyyyyRegex);
  
  if (match) {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Month is 0-based in JS
    const year = parseInt(match[3], 10);

    // Validate ranges
    if (month < 0 || month > 11 || day < 1 || day > 31 || year < 1000) {
      return null;
    }

    const date = new Date(year, month, day);

    // Check if resulting date matches input values (to avoid JS auto-correction)
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  }

  // Handle ddMMyyyy format
  if (/^\d{8}$/.test(value)) {
    const day = parseInt(value.substring(0, 2), 10);
    const month = parseInt(value.substring(2, 4), 10) - 1;
    const year = parseInt(value.substring(4, 8), 10);

    const date = new Date(year, month, day);

    // Check if resulting date matches input values
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  }

  return null;
}

isDate(value: any): boolean {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return true;
  }

  if (typeof value === 'string') {
    // Try custom date formats first
    const customDate = this.parseCustomDate(value);
    if (customDate) {
      return true;
    }

    // For other strings, try parsing normally
    const timestamp = Date.parse(value);
    return !isNaN(timestamp);
  }

  return false;
}

convertToDate(value: any): Date | null {
    if (!value) return null;
    
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      const trimmedValue = value.trim();
      
      // Handle dd/MM/yyyy format
      const ddMMyyyyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      const match = trimmedValue.match(ddMMyyyyRegex);
      
      if (match) {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // Month is 0-based in JS
        const year = parseInt(match[3], 10);
        return new Date(year, month, day);
      }

      // Handle ddMMyyyy format
      if (/^\d{8}$/.test(trimmedValue)) {
        const day = parseInt(trimmedValue.substring(0, 2), 10);
        const month = parseInt(trimmedValue.substring(2, 4), 10) - 1;
        const year = parseInt(trimmedValue.substring(4, 8), 10);
        return new Date(year, month, day);
      }

      // Try parsing other formats
      const parsedDate = new Date(trimmedValue);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    return null;
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

constructor(private filterService: FilterService) {}

  // Add computed percentage property to data
  ngOnInit(): void {
    this.processDataForSorting();
      this.registerCustomDateFilters();

    this.columns.forEach((column:TableColumn
    ) => {
      if (this.isDateColumn(column.type?column.type:column.key)) {
        this.dateFilters[column.key] = null;
              this.defaultMatchModes[column.key] = CustomFilterMatchMode.DATE_IS;

      }
    });
  }

   registerCustomDateFilters(): void {
  this.filterService.register(CustomFilterMatchMode.DATE_IS, (value: any, filter: Date): boolean => {
    return this.filterDate(value, filter, CustomFilterMatchMode.DATE_IS);
  });

  this.filterService.register(CustomFilterMatchMode.DATE_BEFORE, (value: any, filter: Date): boolean => {
    return this.filterDate(value, filter, CustomFilterMatchMode.DATE_BEFORE);
  });

  this.filterService.register(CustomFilterMatchMode.DATE_AFTER, (value: any, filter: Date): boolean => {
    return this.filterDate(value, filter, CustomFilterMatchMode.DATE_AFTER);
  });}

   isDateColumn(columnType: string): boolean {
    return columnType === 'date' ;
  }

  // Handle date filter selection
  onDateFilterChange(selectedDate: Date, columnKey: string, filterCallback: Function): void {
    this.dateFilters[columnKey] = selectedDate;
    
    if (selectedDate) {
      // Use custom filter function
     filterCallback(selectedDate, CustomFilterMatchMode.DATE_IS);
    }
  }

  // Handle date filter clear
  onDateFilterClear(columnKey: string, filterCallback: Function): void {
    this.dateFilters[columnKey] = null;
    filterCallback(null);
  }

  // Custom date filter function
  filterDate(value: any, filter: Date, matchMode: string): boolean {
    if (!filter) return true;
    if (!value) return false;

    const rowDate = this.convertToDate(value);
    if (!rowDate) return false;

    // Normalize dates to ignore time
    const filterDate = new Date(filter.getFullYear(), filter.getMonth(), filter.getDate());
    const valueDate = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate());

    switch (matchMode) {
      case 'dateIs':
        return valueDate.getTime() === filterDate.getTime();
      case 'dateBefore':
        return valueDate.getTime() < filterDate.getTime();
      case 'dateAfter':
        return valueDate.getTime() > filterDate.getTime();
      default:
        return true;
    }
  }
  ngOnChanges(): void {
    this.processDataForSorting();
  }

  // private processDataForSorting(): void {
  //   this.dataSource = this.dataSource.map(item => ({
  //     ...item,
  //     statusPercentage: item.status && item.status.total > 0 
  //       ? (item.status.current / item.status.total) * 100 
  //       : 0
  //   }));
  // }
  private processDataForSorting(): void {
    // Store original data and order if not already stored
    if (this.originalDataSource.length === 0) {
      this.originalDataSource = [...this.dataSource];
      this.originalOrder = this.dataSource.map((_, index) => index);
    }
    
    this.dataSource = this.dataSource.map((item, index) => ({
      ...item,
      statusPercentage: item.jrProgress && item.jrProgress.total > 0 
        ? (item.jrProgress.current / item.jrProgress.total) * 100 
        : 0,
      originalIndex: this.originalOrder[index] !== undefined ? this.originalOrder[index] : index
    }));
  }

//    configureTableFilters(table: any): void {

//     if (!table.filters) {
//       table.filters = {};
//     }

//     // Set custom filter function for date columns
//     this.columns.forEach((column:TableColumn) => {
//       if (this.isDateColumn(column.type?column.type:column.key)) {
//         table.filters[column.key] = {
//           value: null,
// matchMode: CustomFilterMatchMode.DATE_IS
//         };
//       }
//     });
//   }


}