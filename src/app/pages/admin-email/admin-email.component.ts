import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';

@Component({
  selector: 'app-admin-email',
  imports: [CommonLayoutComponent,CardsComponent,HeaderTextComponent,TableComponent],
  templateUrl: './admin-email.component.html',
  styleUrl: './admin-email.component.scss'
})
export class AdminEmailComponent {

}
