import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  private router = inject(Router);

  submit () {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);

    this.router.navigate(['/']);
  }
}
