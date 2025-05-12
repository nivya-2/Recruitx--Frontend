import { NgIf, NgStyle } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [NgStyle,NgIf],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  @Input() metric!: { title: string, value: number | string, percentage?: number, color?: string };

}
