import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { TabsComponent } from '../../shared-components/tabs/tabs.component';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "../../ui/button/button.component";
import { ModalComponent } from '../../ui/modal/modal.component';
import { ViewassignedjrCardComponent } from "../../shared-components/viewassignedjr-card/viewassignedjr-card.component";

@Component({
  selector: 'app-team',
  imports: [ModalComponent, CommonLayoutComponent, CardsComponent, TabsComponent, RouterOutlet, ButtonComponent, ViewassignedjrCardComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  tabs: { title: string; value: number; route: string }[] = [];
  selectedTabIndex = 0;

  ngOnInit() {
    this.tabs = [
      { title: 'My Team', value: 0, route: 'my-team' },
      { title: 'Track Job Requisitions', value: 1, route: 'track-jr' },
    ];
  }
  assignClick() {
   this.visible=!this.visible
  }
  visible : boolean =false


}
