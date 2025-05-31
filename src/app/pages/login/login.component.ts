import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EvaluationFormComponent } from "../evaluation-form/evaluation-form.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, EvaluationFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor(private router: Router) {}
onclick(url: string) {
  this.router.navigate([url]);
}
}
