import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output, OnInit, OnChanges } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonComponent } from '../../ui/button/button.component';
import { IconComponent } from "../../ui/icon/icon.component";
import { ProgressbarComponent } from '../../ui/progressbar/progressbar.component';

@Component({
  selector: 'app-table',
  imports: [ProgressbarComponent, CommonModule, TableModule, InputTextModule, ButtonModule, PaginatorModule, IconField, InputIcon, ButtonComponent, IconComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges {

  @Input() dataSource: any[] = [];
  @Input() columns: any = [];
  @Input() globalFilterFields: string[] = [];
  @Input() hover: boolean = false;
  @Input() rows: number = 5;
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
        statusPercentage: item.status && item.status.total > 0 
          ? (item.status.current / item.status.total) * 100 
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

  // Add computed percentage property to data
  ngOnInit(): void {
    this.processDataForSorting();
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
      statusPercentage: item.status && item.status.total > 0 
        ? (item.status.current / item.status.total) * 100 
        : 0,
      originalIndex: this.originalOrder[index] !== undefined ? this.originalOrder[index] : index
    }));
  }
}