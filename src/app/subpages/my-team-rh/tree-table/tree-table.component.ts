import { Component, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonComponent } from "../../../ui/button/button.component";
import { HeaderTextComponent } from "../../../ui/header-text/header-text.component";
import { ButtonIconComponent } from "../../../ui/button-icon/button-icon.component";
import { TreeTable, TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
@Component({
  selector: 'app-tree-table',
  imports: [ButtonComponent, HeaderTextComponent, ButtonIconComponent,TreeTableModule, CommonModule,ButtonModule,IconField, InputIcon],
  templateUrl: './tree-table.component.html',
  styleUrl: './tree-table.component.scss'
})
export class TreeTableComponent {



  @Input() teamsDataSource: TreeNode[] = [];
  @Input() columns: any[] = [];
  @Input() globalFilterFields: string[] = [];

   @Input() showFilter = true;
   fontSize: any = '12px';



  isDate(value: any): boolean {
    return value instanceof Date;
  }

 

  handleRemove(rowData: any) {
    console.log('Remove clicked:', rowData);
  }




}
