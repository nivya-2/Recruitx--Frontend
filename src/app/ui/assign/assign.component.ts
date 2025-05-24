import { NgFor } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { Popover, PopoverModule } from 'primeng/popover';
import { ProfileBoxComponent } from '../profile-box/profile-box.component';

@Component({
  selector: 'app-assign',
  templateUrl: 'assign.component.html',
  styleUrl: 'assign.component.scss',
  standalone: true,
  imports: [PopoverModule, NgFor, ProfileBoxComponent]
})
export class AssignComponent {
  @Input() teamList: any[] = [];

  @ViewChild('op') op!: Popover;

  open(event: Event) {
    this.op.toggle(event);
  }
}