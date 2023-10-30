import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {

  public person: Person = new Person();

  @Output() personAdded: EventEmitter<void> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private service: ApiService){}

  formPerson = this.formBuilder.group({
    'name': ['', Validators.required],
    'lastname': ['', Validators.required],
    'dni': ['', [Validators.required, Validators.minLength(8)]],
    'city': ['', Validators.required]
  })
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
  public addPerson() {
    if (this.formPerson.valid) {
      this.person = new Person(this.formPerson.value);

      this.service.addPerson(this.person).subscribe({
        next: (resp) => {
          alert('Usuario registrado con éxito');
          this.personAdded.emit();
        },
        error: (error) => {
          alert('Error al registrar el usuario');
        }
      });

    }
  }
}
