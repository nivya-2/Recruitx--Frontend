import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
@Component({
  selector: 'app-track-jd',
  imports: [CommonLayoutComponent,RouterOutlet,RouterLink,RouterLinkActive,TabsModule],
  templateUrl: './track-jd.component.html',
  styleUrl: './track-jd.component.scss'
})
export class TrackJdComponent {
rla3: any;
tabPanel: any;
rla1: any;
rla2: any;
 tabs: { title: string; value: number; content: string }[] = [];

    ngOnInit() {
        this.tabs = [
            { title: 'Tab 1', value: 0, content: 'Tab 1 Content' },
            { title: 'Tab 2', value: 1, content: 'Tab 2 Content' },
            { title: 'Tab 3', value: 2, content: 'Tab 3 Content' },
        ];
    }
}
