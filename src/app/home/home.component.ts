import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
      MatButtonModule,
      MatFormFieldModule,
      MatChipsModule,
      MatIconModule,
      RouterLink,
      FormsModule,
      ReactiveFormsModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
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
  readonly reactiveKeywords = signal(['kindergarten', 'football', 'basketball', 'tennis']);
  readonly formControl = new FormControl(['kindergarten']);

  announcer = inject(LiveAnnouncer);

  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }

  addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.reactiveKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
}
