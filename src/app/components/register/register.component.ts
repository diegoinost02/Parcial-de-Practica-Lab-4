import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user: User = new User();

  constructor(private router: Router, private FormBuilder: FormBuilder, private service: ApiService) { }

  formUser = this.FormBuilder.group({
    'email': ['', Validators.required],
    'password': ['', Validators.required]
  })
  get getEmail() {
    return this.formUser.get('email') as FormControl;
  }
  get getPassword() {
    return this.formUser.get('password') as FormControl;
  }
  public checkAccount() {
    if (this.formUser.valid) {

      this.user.email = this.formUser.value.email!;
      this.user.password = this.formUser.value.password!;

      this.service.getToChek(this.user).subscribe({

        next: (users: User[]) => {

          console.log(users)
          
          if (users.length > 0) {
            alert("El mail ya esta registrado");
          }
          else {
            this.createAccount(users[0]);
          }
        },
        error: (error: any) => {
          console.error("Error");
        }
      })
    }
  }
  public createAccount(user: User) {
    this.service.addUser(this.user).subscribe({
      next: (user: User) => {
        this.service.setUser(user);
        alert("El user se ha creado correctamente");
        this.router.navigate(["/home"]);
      },
      error: (error: any) => {
        console.error("Error");
      }
    })
  }
  public goToLogin(){
    this.router.navigate(['/login'])
  }
}
