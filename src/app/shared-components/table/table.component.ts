import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
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
  @Input() buttonActionFn: (rowData: any) => void = () => {};
  @Input() rowClickFn: (rowData: any) => void = () => {};

  @HostBinding('class.hover-enabled') get isHoverEnabled() {
    return this.hover;
  }

  buttonActionWrapper(rowData: any): Function {
    return () => {
      if (this.buttonActionFn) {
        this.buttonActionFn(rowData);
      }
    };
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

}
