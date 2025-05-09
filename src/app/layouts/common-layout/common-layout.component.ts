import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';

@Component({
  selector: 'app-common-layout',
  imports: [HeaderComponent,SidenavbarComponent],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.scss'
})
export class CommonLayoutComponent {

}
