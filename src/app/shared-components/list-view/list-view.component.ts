import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { NgFor } from '@angular/common';
import { ModalComponent } from "../../ui/modal/modal.component";
import { JrCardComponent } from "../jr-card/jr-card.component";

@Component({
  selector: 'app-list-view',
  imports: [ButtonComponent, NgFor, ModalComponent, JrCardComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
  visible : boolean =false;
  @Input() jobs: { title: string; date: string; location: string; positions: number }[] = [];
assignClick() {
   this.visible=!this.visible
  }
}
