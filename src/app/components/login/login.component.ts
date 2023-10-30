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
 public user : User = new User();

  constructor(private router : Router, private formBuiler: FormBuilder, private service: ApiService){}

  // email = new FormControl('');
  // contraseña = new FormControl('');

  formUser = this.formBuiler.group({
    'email': ['', Validators.required],
    'password' : ['',Validators.required]
  })
  get getEmail() {
    return this.formUser.get('email') as FormControl;
  }
  get getPassword() {
    return this.formUser.get('password') as FormControl;
  }
  

  public logear(){
    if (this.formUser.valid){

      const email = this.formUser.value.email!;
      const password = this.formUser.value.password!;

      this.user.email = email;
      this.user.password = password;

      this.service.getToAuth(this.user).subscribe({
        next:(user:User) => {
          this.service.setUser(user);
          console.log("El dni se ha verificado correctamente");
          this.router.navigate(["/home"]);
        },
        error: (error:any) => {
          console.error("El dni no se encuentra registrado");
        }
      })

    }
  }
}
 