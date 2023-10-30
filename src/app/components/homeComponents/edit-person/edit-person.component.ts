import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  public person: Person = new Person();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private service: ApiService, private dialogRef: MatDialogRef<EditPersonComponent>) { }

  formPerson = this.formBuilder.group({
    'id': [0],
    'name': ['', Validators.required],
    'lastname': ['', Validators.required],
    'dni': ['', [Validators.required, Validators.minLength(8)]],
    'city': ['', Validators.required]
  })

  async ngOnInit() {
    this.person = this.data;
    await this.loadForm();
  }

  private loadForm() {
    if (this.person) {
      this.formPerson.patchValue({
        id: this.person.id,
        name: this.person.name,
        lastname: this.person.lastname,
        dni: this.person.dni,
        city: this.person.city
      });
    }
  }

  get getName() {
    return this.formPerson.get('name') as FormControl;
  }
  get getLastName() {
    return this.formPerson.get('lastname') as FormControl;
  }
  get getDni() {
    return this.formPerson.get('dni') as FormControl;
  }
  get getCity() {
    return this.formPerson.get('city') as FormControl;
  }

  public editPerson() {
    this.person = new Person(this.formPerson.value);
    this.service.editPerson(this.person.id!, this.person).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => alert(error)
    })
  }
  public closeDialog() {
    this.dialogRef.close(false);
  }
}
