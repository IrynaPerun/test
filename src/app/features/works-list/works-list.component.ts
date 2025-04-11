import {Component, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {AddWorkComponent} from "./modals/add-work/add-work.component";
import {IWorkItem} from "./interface/work-item.interface";
import {WorkListService} from "./work-list.service";
import {UserService} from "../../shared/services/user.service";
import {IUser} from "../../shared/interfaces/user.interface";

@Component({
  selector: 'app-works-list',
  standalone: true,
  imports: [MatTableModule, MatButton, ReactiveFormsModule, MatIcon],
  templateUrl: './works-list.component.html',
  styleUrl: './works-list.component.scss'
})
export class WorksListComponent {
  userService: UserService = inject(UserService);
  user: IUser = this.userService.user;
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  workListService = inject(WorkListService);
  displayedColumns: string[] = ['id', 'name', 'points', 'repeat','actions'];
  dataSource = new MatTableDataSource<IWorkItem>(this.workListService.getWorkList());
  clickedRows = new Set<IWorkItem>();
  form: FormGroup = new FormGroup({});

  openDialog(item?: IWorkItem) {
    const dialogRef = this.dialog.open(AddWorkComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe((result:IWorkItem) => {
      if (result) {
        const isNew = !result.id;
        const newItem = isNew ? this.workListService.createItem(result) : this.workListService.editItem(result);
        let newData = [ ...this.dataSource.data ];
        // create flow
        if (isNew) newData.unshift(newItem);
        else {
          // edit flow
          newData = newData.map((row) => {
            if (row.id === newItem.id) {
              row = newItem;
            }

            return row;
          });
        }
        this.dataSource.data = newData;
        this.workListService.saveData(newData);
      }
    });
  }

  submit () {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.router.navigate(['calendar']);
  }

  addRow () {
    console.log('addRow');
    this.openDialog();
  }

  editRow(item: IWorkItem) {
    console.log('editRow',item);
    this.openDialog(item);
  }

  deleteRow(id: number) {
    console.log('deleteRow', id);
    if (confirm('Are you sure you want to delete?')) {
      if (this.workListService.deleteItem(id)) {
        this.dataSource.data = [...this.dataSource.data.filter((item) => {
          return item.id !== id;
        })];
        this.workListService.saveData(this.dataSource.data);
      }
    }

  }
}
