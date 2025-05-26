import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { FileTableComponent } from "./file-table/file-table.component";

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FileUploadModule, FileTableComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  @Output() onClose = new EventEmitter<void>();
  @Output() onFileUploaded = new EventEmitter<File[]>();
  @Output() onUploadComplete = new EventEmitter<File[]>();

  visible = true;
  uploadedFiles: File[] = [];
  showFileTable = false;
  
  closeModal(): void {
    this.visible = false;
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
