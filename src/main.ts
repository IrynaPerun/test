import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from "@angular/router";

import { AppComponent } from './app/app.component';
import { LoginComponent } from "./app/features/login/login.component";
import { SignUpComponent } from "./app/features/sign-up/sign-up.component";
import { HomeComponent } from "./app/features/home/home.component";
import { ForgotPasswordComponent } from "./app/features/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./app/features/change-password/change-password.component";
import { CalendarComponent } from "./app/features/calendar/calendar.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {WorksListComponent} from "./app/features/works-list/works-list.component";
import {provideHttpClient} from "@angular/common/http";
import {ProductsComponent} from "./app/features/products/products.component";

bootstrapApplication(AppComponent, {
  providers: [provideRouter([
    {
      path: '',
      component: WorksListComponent,
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
    {
      path: 'works-list',
      component: WorksListComponent,
    },
    {
      path: 'products',
      component: ProductsComponent,
    },
  ]),
    provideAnimationsAsync(),
    provideHttpClient(),
  ]
}).catch((err) => console.error(err));
