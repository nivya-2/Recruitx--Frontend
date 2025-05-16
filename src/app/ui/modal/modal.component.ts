import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input,Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  imports: [Dialog],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
   @Input() header: string = '';
   @Input() tagline: string = ''; // New input for tagline
   @Input() headerBgColor: string = '#6979F8';
   @Input() maximizable: boolean = false;
   /** Inline styles: e.g. { width: '30rem', height: '40rem' } */
   @Input() style: { [key: string]: any } = {};
   @Input() visible: boolean = false;
   @Output() visibleChange = new EventEmitter<boolean>();
 
   onHide() {
     this.visibleChange.emit(false);
   }
   ngOnChanges() {
    document.documentElement.style.setProperty('--custom-header-color', this.headerBgColor);
  }
  

}
