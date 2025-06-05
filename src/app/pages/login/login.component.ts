import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EvaluationFormComponent } from "../evaluation-form/evaluation-form.component";
import { LoginPageComponent } from "../login-page/login-page.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, EvaluationFormComponent, LoginPageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor(private router: Router) {}
onclick(url: string) {
  this.router.navigate([url]);
}

}
