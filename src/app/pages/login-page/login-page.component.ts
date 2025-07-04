import { Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login-page',
  imports: [ButtonComponent, InputTextComponent, PasswordModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  login() {
    // Trigger backend redirect to Azure AD login
    window.location.href = 'https://recruitx20250704121717-fdb4cqaze6bsgcfr.canadacentral-01.azurewebsites.net/api/auth/login'; // adjust to your backend
  }

}
