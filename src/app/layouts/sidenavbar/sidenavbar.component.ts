import { Component, Input,Output,EventEmitter } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconGroupComponent } from '../icon-group/icon-group.component';
@Component({
  selector: 'app-sidenavbar',
  imports: [ButtonModule,IconGroupComponent ,DrawerModule,CardModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss'
})
export class SidenavbarComponent {
  fadeTimeout:any;
  visible: boolean = false;
  drawerFadeOut = false;
  @Input() iconList: any[] = [];

  onMouseEnter(){
    this.drawerFadeOut = false;
    this.visible = true;
  }
  onMouseLeave(){
    this.drawerFadeOut = true;
    // Delay closing to allow animation
    setTimeout(() => {
      this.visible = false;
    }, 300); 
  }
  onDrawerHidden() {
  // Reset fade out flag once it's hidden
  this.drawerFadeOut = false;
  }
}
