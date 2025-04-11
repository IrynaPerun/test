import {inject, Injectable} from '@angular/core';
import { IUser } from "../interfaces/user.interface";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;
  _localStorage: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.user = this.getUser();
  }

  saveUser(user: IUser): IUser {
    this._localStorage.setItem('user', user);
    this.user = user;

    return user;
  }

  getUser(): IUser {
    return this._localStorage.getItem('user') ?? {};
  }
}
