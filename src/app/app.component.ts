import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ButtonComponent } from './ui/button/button.component';
import { CardsComponent } from './ui/cards/cards.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonDemoComponent, HeaderComponent, ButtonComponent,CardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rec';
}
