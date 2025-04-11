import {inject, Injectable} from "@angular/core";
import { IWorkItem } from "./interface/work-item.interface";
import { LocalStorageService } from "../../shared/services/local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class WorkListService {
  localStorage: LocalStorageService = inject(LocalStorageService);
  lastId: number = 0;

  getWorkList(): IWorkItem[] {
    console.log('get all work list');
    this.lastId = +(this.localStorage.getItem('lastWorkId') || 0);
    return this.localStorage.getItem('workList');
  }

  createItem(item: IWorkItem): IWorkItem {
    console.log('Create work item:',item);
    this.lastId = this.lastId + 1;
    item.id = this.lastId;
    this.localStorage.setItem('lastWorkId', this.lastId);
    return item;
  }

  editItem(item: IWorkItem): IWorkItem {
    console.log('Edit work item:',item);
    return item;
  }

  deleteItem(id: number): boolean {
    console.log('Delete work item with id:',id);
    return true;
  }

  saveData(data: IWorkItem[]) {
    this.localStorage.setItem('workList', data);
  }
}
