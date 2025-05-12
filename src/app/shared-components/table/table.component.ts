import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-table',
  imports: [CommonModule,TableModule,InputTextModule,ButtonModule,PaginatorModule,IconField,InputIcon,ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  
  @Input() dataSource:string[]=[];
  @Input() columns:any=[];
  @Input() globalFilterFields: string[]=[];
  @Input() hover:boolean= true;
  @Input() rows:number = 5;
  @Input() showFilter: boolean = true;
  @Input() scale:number = 1;

  
  clear(table: Table): void {
    table.clear();
  }

}
