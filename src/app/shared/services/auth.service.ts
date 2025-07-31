import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {LocalStorageService} from "./local-storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private _localStorage: LocalStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAuthenticatedObs$ : Observable<boolean> = this.isAuthenticated$.asObservable();

  login(credentials: { username: string, password: string }): Observable<any> {
    const url = 'https://backend.wellnesslifeclubs.com/api/v1/auth/login';
    return this.http.put(url, credentials).pipe(
      tap((response: any) => {
        console.log('1',response)
        if (response.status === 200) {
          this.isAuthenticated$.next(true);
           // save token to storage
          this._localStorage.setItem('accessToken', response.token);
          this.router.navigate(['products']);
        }

      }),
    );
  }

  logout(): void {
    this.isAuthenticated$.next(false);
    // save token to storage
    this._localStorage.removeItem('accessToken');
    this.router.navigate(['home']);
  }

  getAuthToken():string {
    return this._localStorage.getItem('accessToken');
  }
}
