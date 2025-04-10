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

@Component({
  selector: 'app-works-list',
  standalone: true,
  imports: [MatTableModule, MatButton, ReactiveFormsModule, MatIcon],
  templateUrl: './works-list.component.html',
  styleUrl: './works-list.component.scss'
})
export class WorksListComponent {
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
        console.log('Dialog result save to table: ',result, this.dataSource.data);
        const newItem = this.workListService.createItem(result);
        const newData = [ ...this.dataSource.data ];
        newData.unshift(newItem);
        this.dataSource.data = newData;
      } else {
        console.log('Dialog was closed');
      }
      console.log('this.dataSource', this.dataSource);
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
      }
    }

  }
}
