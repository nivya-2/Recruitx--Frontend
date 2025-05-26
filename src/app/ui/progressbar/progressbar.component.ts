import { CommonModule } from '@angular/common';
import { Input,Component } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';
import { Tooltip } from 'primeng/tooltip';
@Component({
  selector: 'app-progressbar',
  imports: [ProgressBar, Tooltip , CommonModule],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.scss'
})
export class ProgressbarComponent {
  @Input() current: number = 0;
  @Input() total: number = 0;

  get percentage(): number {
    return this.total > 0 ? (this.current / this.total) * 100 : 0;
  }
}
