import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from "@angular/router";

import { AppComponent } from './app/app.component';
import { LoginComponent } from "./app/login/login.component";
import { SignUpComponent } from "./app/sign-up/sign-up.component";
import { HomeComponent } from "./app/home/home.component";
import { ForgotPasswordComponent } from "./app/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./app/change-password/change-password.component";
import { CalendarComponent } from "./app/calendar/calendar.component";

bootstrapApplication(AppComponent, {
  providers: [provideRouter([
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'log-in',
      component: LoginComponent,
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
    {
      path: 'sign-up',
      component: SignUpComponent,
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent,
    },
    {
      path: 'calendar',
      component: CalendarComponent,
    },
  ])]
}).catch((err) => console.error(err));
