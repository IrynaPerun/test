import { Injectable } from "@angular/core";
import { IWorkItem } from "./interface/work-item.interface";

@Injectable({
  providedIn: 'root',
})
export class WorkListService {
  lastId: number = 0;

  getWorkList(): IWorkItem[] {
    console.log('get all work list');
    return [];
  }

  createItem(item: IWorkItem): IWorkItem {
    console.log('Create work item:',item);
    this.lastId = this.lastId + 1;
    item.id = this.lastId;
    // TODO save to local storage
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
}
