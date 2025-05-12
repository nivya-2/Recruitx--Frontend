import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-view',
  imports: [ButtonComponent,NgFor],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
  @Input() jobs: { title: string; date: string; location: string; positions: number }[] = [];
}
