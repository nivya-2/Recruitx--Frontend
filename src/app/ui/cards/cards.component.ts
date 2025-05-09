import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-cards',
  imports: [CardModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() width:string='100%';
  @Input() height:string='auto';
}
