import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonComponent } from "../../../ui/button/button.component";
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-tree-table',
  imports: [ButtonComponent, TreeTableModule, CommonModule, ButtonModule, IconField, InputIcon],
  templateUrl: './tree-table.component.html',
  styleUrl: './tree-table.component.scss'
})
export class TreeTableComponent {
  globalFilter: string = '';

  getGlobalFields(): string[] {
    return this.columns
      .map(col => col.key)
      .filter(key => key !== 'actions');
  }

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
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}
 

  @Input() teamsDataSource: TreeNode[] = [];
  @Input() columns: any[] = [];
  @Input() globalFilterFields: string[] = [];
  @Output() openModal = new EventEmitter<boolean>();
  
  onViewAssignedJR(row: any) {
    this.openModal.emit(true);
    console.log('test');
  
 }

 onRemove(row:any){
    console.log('Remove action for:', row);
    // Implement your remove logic here
 }

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
 




}
