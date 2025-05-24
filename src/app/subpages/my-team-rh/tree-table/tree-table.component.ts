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

handleTreeTableAction(action: string, row: any): void {
  const methodName = 'on' + this.capitalize(action);
  const method = (this as any)[methodName];

  if (typeof method === 'function') {
    method.call(this, row);
  } else {
    console.warn(`No method defined for action: ${methodName}`);
  }
}

capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
 

  @Input() teamsDataSource: TreeNode[] = [];
  @Input() columns: any[] = [];
  @Input() globalFilterFields: string[] = [];

   @Input() showFilter = true;
   fontSize: any = '12px';



  isDate(value: any): boolean {
    return value instanceof Date;
  }

hasMultipleActionsInColumn(): boolean {
  // Find the actions column
  const actionsColumn = this.columns.find(col => col.key === 'actions');
  if (!actionsColumn) return false;

  // Check if any node (including children) has multiple actions
  return this.checkNodesForMultipleActions(this.teamsDataSource, actionsColumn.key);
}

private checkNodesForMultipleActions(nodes: TreeNode[], actionsKey: string): boolean {
  for (const node of nodes) {
    // Check current node
    if (node.data && 
        node.data[actionsKey] && 
        Array.isArray(node.data[actionsKey]) && 
        node.data[actionsKey].length > 1) {
      return true;
    }

    // Recursively check children
    if (node.children && this.checkNodesForMultipleActions(node.children, actionsKey)) {
      return true;
    }
  }
  return false;
}

  handleRemove(rowData: any) {
    console.log('Remove clicked:', rowData);
  }




}
