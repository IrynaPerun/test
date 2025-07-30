import {Component, inject, OnInit, signal} from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../products/interfaces/product.interface";
import {tap} from "rxjs";
import {IClub} from "./interfaces/club.interface";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.css'
})
export class ClubsComponent  implements OnInit {
  private http = inject(HttpClient);
  public dataSource = signal<IClub[]>([]);
  displayedColumns: (keyof IClub)[] = ['id', 'name', 'description', 'content', 'user_id', 'status', 'logo_link'];

  ngOnInit() {
    console.log("i want to load clubs list")
    const url = 'https://backend.wellnesslifeclubs.com/api/v1/clubs';
    this.http.get(url, {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken') || '')
      }
    }).pipe(
      tap((response: any) => {
        console.log('1',response.data);
        this.dataSource.set(response.data);
        console.log('2', this.dataSource());
        // if (response.status === 200) {
        //   // save token to storage
        //   this._localStorage.setItem('jwtToken', `Bearer ${response.token}`);
        //   this.router.navigate(['works-list']);
        // }
      }),
    ).subscribe();
  }

}
