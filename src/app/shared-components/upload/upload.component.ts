import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { FileTableComponent } from "./file-table/file-table.component";
import { ButtonComponent } from "../../ui/button/button.component";

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FileUploadModule, FileTableComponent, ButtonComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  @Input() title: string = 'Add Candidates';
  @Output() onClose = new EventEmitter<void>();
  @Output() onFileUploaded = new EventEmitter<File[]>();
  @Output() onUploadComplete = new EventEmitter<File[]>();
  

  visible = true;
  uploadedFiles: File[] = [];
  showFileTable = false;
  @Input() acceptTypes: string = '.docx'; // default

  closeModal(): void {
    this.uploadedFiles = [];
    this.showFileTable = false;

    this.onClose.emit();
  }

  onFileSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      // Add the new files to the uploadedFiles array
      this.uploadedFiles = [...this.uploadedFiles, ...event.files];
      this.onFileUploaded.emit(this.uploadedFiles);
    }
  }

    removeFile(file: File): void {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
  }
  
  showFilesTable(): void {
    this.showFileTable = true;

  }
  
  completeUpload(): void {
    this.onUploadComplete.emit(this.uploadedFiles);
    this.closeModal();

  }

}
