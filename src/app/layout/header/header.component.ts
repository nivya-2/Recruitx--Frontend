import { NgIf } from '@angular/common';
import { Component,Input } from '@angular/core';
import { ProfileBoxComponent } from '../../ui/profile-box/profile-box.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';

@Component({
  selector: 'app-header',
  imports: [NgIf,HeaderTextComponent,ProfileBoxComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() name: string = 'Arthur Pendragon';
  @Input() role: string = 'Recruiter Head';
  @Input() search = true;
  constructor(){}
  ngOnInit() { }
}
