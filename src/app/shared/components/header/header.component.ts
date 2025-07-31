import {Component, inject, signal} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  public isAuthenticated = toSignal<boolean>(this.authService.isAuthenticatedObs$);

  logout(): void {
    this.authService.logout();
  }
}
