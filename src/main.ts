import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from "@angular/router";

import { AppComponent } from './app/app.component';
import { LoginComponent } from "./app/features/login/login.component";
import { SignUpComponent } from "./app/features/sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./app/features/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./app/features/change-password/change-password.component";
import { CalendarComponent } from "./app/features/calendar/calendar.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {WorksListComponent} from "./app/features/works-list/works-list.component";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ProductsComponent} from "./app/features/products/products.component";
import {ClubsComponent} from "./app/features/clubs/clubs.component";
import {AuthInterceptor} from "./app/shared/interceptors/auth.interceptor";
import {AuthService} from "./app/shared/services/auth.service";
import {HomeComponent} from "./app/features/home/home.component";
import { authGuard } from "./app/shared/guards/auth.guard";

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
      path: 'home',
      component: HomeComponent,
      // canActivate: [authGuard],
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
      canActivate: [authGuard],
    },
    {
      path: 'works-list',
      component: WorksListComponent,
    },
    {
      path: 'products',
      component: ProductsComponent,
      canActivate: [authGuard],
    },
    {
      path: 'clubs',
      component: ClubsComponent,
      canActivate: [authGuard],
    },
  ]),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Set multi to true to allow multiple interceptors
    },
    AuthService,
  ]
}).catch((err) => console.error(err));
