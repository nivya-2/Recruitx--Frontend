import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedComponentsModule } from './shared-components/shared-components.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'rec';
  teamList = [
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Tom Philip', role: 'Associate Manager' },
  { fullName: 'Tom Philip', role: 'Lead' },
  { fullName: 'Tom Philip', role: 'Associate' },
];

onMemberSelect(member: any) {
  console.log('Selected:', member);
}
}
