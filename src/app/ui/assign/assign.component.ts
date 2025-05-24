import { NgFor } from '@angular/common';
import { Component, Input, ViewChild , Output, EventEmitter} from '@angular/core';
import { Popover, PopoverModule } from 'primeng/popover';
import { ProfileBoxComponent } from '../profile-box/profile-box.component';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';
import { IconField } from 'primeng/iconfield';
import { IconComponent } from "../icon/icon.component";
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-assign',
  templateUrl: 'assign.component.html',
  styleUrl: 'assign.component.scss',
  standalone: true,
  imports: [InputIcon,IconField, InputTextComponent, PopoverModule, NgFor, ProfileBoxComponent, FormsModule, IconComponent]
})
export class AssignComponent {
  @Input() teamList: any[] = [];
  
  @ViewChild('op') op!: Popover;
  
  open(event: Event) {
    this.op.toggle(event);
  }
  searchText: string = '';

filteredTeamList() {
  return this.teamList.filter(member =>
    member.fullName.toLowerCase().includes(this.searchText.toLowerCase())
  );
}
}