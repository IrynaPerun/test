import {Component, computed, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatOption, MatSelect } from "@angular/material/select";
import { IDaysOfTheWeek, IWorkItem } from "../../interface/work-item.interface";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-add-work',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatCheckbox
  ],
  templateUrl: './add-work.component.html',
  styleUrl: './add-work.component.css'
})
export class AddWorkComponent {
  dialog: MatDialogRef<AddWorkComponent> = inject(MatDialogRef);
  dialogData: IWorkItem | undefined = inject(MAT_DIALOG_DATA);
  form: FormGroup = new FormGroup({
    id: new FormControl(this.dialogData?.id || null),
    name: new FormControl(this.dialogData?.name || '', [Validators.required, Validators.minLength(6)]),
    points: new FormControl(this.dialogData?.points || '50', [Validators.required, Validators.min(10)]),
    monday: new FormControl(this.dialogData?.days?.[0]?.['completed'] || false),
    thursday: new FormControl(this.dialogData?.days?.[0]?.['completed'] || false),

  });

  submit () {
    console.log(' invalid', this.form.value, this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.dialog.close(this.form.value);
  }

  //daysOfTheWeek: IDaysOfTheWeek = inject(MAT_DIALOG_DATA);
  readonly daysOfTheWeek = signal<IDaysOfTheWeek>({
    name: 'Days of the Week',
    completed: false,
    days: [
      {name: 'Monday', completed: false},
      {name: 'Tuesday', completed: false},
      {name: 'Wednesday', completed: false},
      {name: 'Thursday', completed: false},
      {name: 'Friday', completed: false},
      {name: 'Saturday', completed: false},
      {name: 'Sunday', completed: false},
    ],
  });

  readonly partiallyComplete = computed(() => {
    const daysOfTheWeek = this.daysOfTheWeek();
    if (!daysOfTheWeek.days) {
      return false;
    }
    return daysOfTheWeek.days.some(d => d.completed) && !daysOfTheWeek.days.every(d => d.completed);
  });

  update(completed: boolean, index?: number) {
    this.daysOfTheWeek.update(daysOfTheWeek => {
      if (index === undefined) {
        daysOfTheWeek.completed = completed;
        daysOfTheWeek.days?.forEach(d => (d.completed = completed));
      } else {
        daysOfTheWeek.days![index].completed = completed;
        daysOfTheWeek.completed = daysOfTheWeek.days?.every(d => d.completed) ?? true;
      }
      return {...daysOfTheWeek};
    });
  }
}
