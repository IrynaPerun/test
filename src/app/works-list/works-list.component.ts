import { Component } from '@angular/core';
import { MatTableModule } from "@angular/material/table";

export interface PeriodicElement {
  name: string;
  points: number;
  repeat: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: "Kindergarten", points: 50, repeat: 0},
  { name: "Swimming", points: 30, repeat: 0},
  { name: "Football", points: 40, repeat: 0},
  { name: "Tennis", points: 10, repeat: 0},
];

@Component({
  selector: 'app-works-list',
  standalone: true,
  imports: [ MatTableModule ],
  templateUrl: './works-list.component.html',
  styleUrl: './works-list.component.scss'
})
export class WorksListComponent {
  displayedColumns: string[] = ['name', 'points', 'repeat','actions'];
  dataSource = ELEMENT_DATA;
}
