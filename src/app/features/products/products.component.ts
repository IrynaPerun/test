import {Component, inject, OnInit, signal} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { IProduct } from "./interfaces/product.interface";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {IWorkItem} from "../works-list/interface/work-item.interface";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, FormsModule, MatButton, MatIcon, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private http = inject(HttpClient);
  public dataSource = signal<IProduct[]>([]);
  displayedColumns: (keyof IProduct)[] = ['id', 'name', 'description', 'content', 'user_id', 'price', 'status', 'logo_link'];

  ngOnInit() {
    console.log("i want to load products list")
    const url = 'https://backend.wellnesslifeclubs.com/api/v1/user/products';
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
