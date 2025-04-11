import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage = localStorage;
  // Set a value in local storage
  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  // Get a value from local storage
  getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key) ?? '[]');
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    this.storage.clear();
  }
}
