import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {IWorkItem} from "../../interface/work-item.interface";

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
    MatOption
  ],
  templateUrl: './add-work.component.html',
  styleUrl: './add-work.component.css'
})
export class AddWorkComponent {
  dialog: MatDialogRef<AddWorkComponent> = inject(MatDialogRef);
  dialogData: IWorkItem | undefined = inject(MAT_DIALOG_DATA);
  form: FormGroup = new FormGroup({
    name: new FormControl(this.dialogData?.name || '', [Validators.required, Validators.minLength(6)]),
    points: new FormControl(this.dialogData?.points || '50', [Validators.required, Validators.min(10)]),
    repeat: new FormControl(this.dialogData?.repeat || '0', [Validators.required,]),
  });

  submit () {
    console.log(' invalid', this.form.value, this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.dialog.close(this.form.value);
  }
}
