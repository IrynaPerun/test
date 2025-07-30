import { Component } from '@angular/core';
import {LoginComponent} from "./features/login/login.component";
import {SignUpComponent} from "./features/sign-up/sign-up.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginComponent,
    SignUpComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
