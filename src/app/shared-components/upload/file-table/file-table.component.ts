import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../table/table.component";
interface FileData {
  fileName: string;
  fileSize: string;
  fileType: string;
  fstatus: string;
  actions: string[];
  originalFile: File;
}
@Component({
  selector: 'app-file-table',
  imports: [CommonModule, TableModule, ButtonModule, TableComponent],
  templateUrl: './file-table.component.html',
  styleUrl: './file-table.component.scss'
})


export class FileTableComponent {
  @Input() uploadedFiles: File[] = [];
  @Output() onFileRemoved = new EventEmitter<File>();
  
  // formatFileSize(bytes: number): string {
  //   if (bytes === 0) return '0 Bytes';
    
  //   const k = 1024;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
    
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  // }
  
  // removeFile(file: File): void {
  //   this.onFileRemoved.emit(file);
  // }
  
  fileTableData: FileData[] = [];
  tableColumns = [
    { key: 'fileName', label: 'File Name', filterable: false },
    { key: 'fileSize', label: 'Size', filterable: false },
    { key: 'actions', label: 'Actions', filterable: false }
  ];
  
  globalFilterFields = ['fileName', 'fileSize', 'fileType', 'fstatus'];
  
  actionMethods = {
    'Remove': (rowData: FileData) => this.removeFile(rowData.originalFile)
  };
  
  ngOnInit(): void {
    this.updateTableData();
  }
  
  ngOnChanges(): void {
    this.updateTableData();
  }
  
  private updateTableData(): void {
    this.fileTableData = this.uploadedFiles.map(file => ({
      fileName: this.getFileNameWithIcon(file.name),
      fileSize: this.formatFileSize(file.size),
      fileType: file.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fstatus: 'Ready to upload',
      actions: ['Remove'],
      originalFile: file
    }));
  }
  
  private getFileNameWithIcon(fileName: string): string {
    // Since your table component handles string values, we'll return just the filename
    // The icon can be added via CSS or by modifying your table component to handle special formatting
    return fileName;
  }
  
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  private removeFile(file: File): void {
    this.onFileRemoved.emit(file);
  }

}
