import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user: User = new User();

  constructor(private router: Router, private formBuiler: FormBuilder, private service: ApiService) { }

  formUser = this.formBuiler.group({
    'email': ['', Validators.required],
    'password': ['', Validators.required]
  })
  get getEmail() {
    return this.formUser.get('email') as FormControl;
  }
  get getPassword() {
    return this.formUser.get('password') as FormControl;
  }

  public logear() {
    if (this.formUser.valid) {

      this.user.email = this.formUser.value.email!;
      this.user.password = this.formUser.value.password!;

      this.service.getToAuth(this.user).subscribe({

        next: (users: User[]) => {
          
          if (users.length > 0) {
            console.log("El user se ha verificado correctamente");
            this.router.navigate(["/home"]);
          }
          else {
            alert("El user no se encuentra registrado");
          }
        },
        error: (error: any) => {
          console.error("Error");
        }
      })
    }
  }
  public goToRegister() {
    this.router.navigate(['/register']);
  }
}

 //this.service.setUser(users[0]);
 //luego del console.log("El user se ha verificado correctamente"); en caso de luego agregar modificacion de usuario
