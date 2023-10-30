import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Person } from 'src/app/core/models';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

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
    })
  }

  public deletePerson(id: number){
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
}
