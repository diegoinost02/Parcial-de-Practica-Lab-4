import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditPersonComponent } from '../edit-person/edit-person.component';

@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListPersonsComponent {

  @Input() inputPersons: Array<Person> = []
  @Output() personToDelete: EventEmitter<number> = new EventEmitter();
  @Output() personToEdit: EventEmitter<Person> = new EventEmitter();

  public deletePerson(id: number){
    this.personToDelete.emit(id);
  }

  public editPerson(person: Person){
    this.personToEdit.emit(person);
  }

}

/*
 persons: Array<Person> = [];

  constructor(private service : ApiService, private dialog: MatDialog){}

  ngOnInit(): void {
      this.loadPersons();
  }
  
  public loadPersons(){
    this.service.getPersons().subscribe
    ( resp => {
      this.persons = resp;
    });
  }

  public editPerson(person: Person) {

    const dialogRef = this.dialog.open(EditPersonComponent, { data: person, height: '400px', width: '350px' });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPersons();
      console.log('El cuadro de diálogo se cerró con resultado:', result);
    });
  }

  public async deletePerson(id: number){
    this.service.deletePerson(id).subscribe({
      next: ()=>{
        this.loadPersons();
        alert("Usuario eliminado con exito");
      },
      error: () => {
        alert("No se ha podido eliminar el usuario")
      }
    });
  }
*/