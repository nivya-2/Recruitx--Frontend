import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
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
export class TableComponent {

  
  @Input() dataSource:string[]=[];
  @Input() columns:any=[];
  @Input() globalFilterFields: string[]=[];
  @Input() hover:boolean= false;
  @Input() rows:number = 5;
  @Input() showFilter: boolean = true;
  @Input() fontSize: any ='12px';
  // @Input() scale:number = 1;
  @Input() rowClickFn: (rowData: any) => void = () => {};
  @Output() openModal = new EventEmitter<boolean>();
  @Input() actionMethods: { [key: string]: (rowData: any) => any } = {};



  @HostBinding('class.hover-enabled') get isHoverEnabled() {
    return this.hover;
  }

hasMultipleActionsInColumn(): boolean {
  // Find the actions column
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
  // Check if value is a Date object
  if (value instanceof Date) {
    return true;
  }
  
  // Check if it's a valid date string
  if (typeof value === 'string') {
    const timestamp = Date.parse(value);
    return !isNaN(timestamp);
  }
  
  return false;
}

  handleActionClick(action: string, rowData: any): void {
    // Convert action string to method key (e.g., "Send Email" -> "sendEmail")
    // const methodKey = 'on' + this.getMethodKey(action);
    const method = this.actionMethods[action];
    
    if (method && typeof method === 'function') {
      method(rowData);
    } else {
      console.warn(`No method found for action: ${action} (looking for key: ${action})`);
    }
  }

  // private getMethodKey(action: string): string {
  //   // Convert "Send Email" to "sendEmail", "Edit" to "edit", etc.
  //   return action.split(' ')
  //     .map((word, index) => 
  //       index === 0 
  //         ? word.toLowerCase() 
  //         : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //     )
  //     .join('');
  // }


}
