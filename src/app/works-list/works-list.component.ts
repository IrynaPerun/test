import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { AddWorkComponent } from "./modals/add-work/add-work.component";

export interface TableElement {
  name: string;
  points: number;
  repeat: number;
}

const ELEMENT_DATA: TableElement[] = [
  { name: "Kindergarten", points: 50, repeat: 0},
  { name: "Swimming", points: 30, repeat: 0},
  { name: "Football", points: 40, repeat: 0},
  { name: "Tennis", points: 10, repeat: 0},
];

@Component({
  selector: 'app-works-list',
  standalone: true,
  imports: [MatTableModule, MatButton, ReactiveFormsModule, MatMiniFabButton, MatIcon],
  templateUrl: './works-list.component.html',
  styleUrl: './works-list.component.scss'
})
export class WorksListComponent {
  displayedColumns: string[] = ['name', 'points', 'repeat','actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<TableElement>();

  form: FormGroup = new FormGroup({});
  private router = inject(Router);

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(AddWorkComponent);

    dialogRef.afterClosed().subscribe((result:TableElement) => {
      if (result) {
        console.log('Dialog result save to table: ',result, this.dataSource.data);
        const newData = [ ...this.dataSource.data ];
        newData.unshift(result);
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

  editRow() {
    console.log('editRow');
  }

  deleteRow() {
    console.log('deleteRow');
  }
}
