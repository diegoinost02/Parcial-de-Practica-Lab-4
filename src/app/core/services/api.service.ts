import { Injectable } from '@angular/core';
import { Person, User } from '../models';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private user: User = new User();

  setUser(user: User) {
    this.user = user;
  }

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:4000';

  public getToAuth(user: User): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/Users?dni=${user.email}&password=${user.password}`);
  }

  public getPersons():Observable<Person[]>{
    return this.http.get<Person[]>(`${this.baseUrl}/persons`);
  }

  public editPerson(id: number, updatePerson: Person): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/persons/${id}`, updatePerson);
  }

  public deletePerson(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/persons/${id}`)
    .pipe(map (resp => true),
    catchError (error => of(false))
    );
  }
  public addUser(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.baseUrl}/persons`, person);
  }
}
