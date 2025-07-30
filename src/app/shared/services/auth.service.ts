import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
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

  login(credentials: { username: string, password: string }): Observable<any> {
    const url = 'https://backend.wellnesslifeclubs.com/api/v1/auth/login';
    return this.http.put(url, credentials).pipe(
      tap((response: any) => {
        console.log('1',response)
        if (response.status === 200) {
           // save token to storage
          this._localStorage.setItem('accessToken', response.token);
          this.router.navigate(['works-list']);
        }

      }),
    );
  }
}
