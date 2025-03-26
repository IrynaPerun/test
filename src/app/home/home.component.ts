import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form: FormGroup = new FormGroup({

  });
  private router = inject(Router);

  submit () {
    console.log(this.form.value);
    //if (this.form.invalid) {
     // return;
    //}
    this.router.navigate(['/calendar']);
  }
}
