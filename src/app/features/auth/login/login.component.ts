import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  isError: boolean = false;
  showPassword: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

   login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password =  this.loginForm.value.password;


      this.authService.login(email, password).subscribe({
        next:(res:any) =>{
          this.authService.setToken(res.token)
          this.router.navigate(['/']);
        },
        error: (error:any) => {
          console.log('Error logging in', error)
          this.isError = true
        }
      })
    } else {
      this.isError = true;
   }
   }

   showPasswordToggle() {
    const password = (document.getElementById('password') as HTMLInputElement)

    if(this.showPassword) {
      this.showPassword = !this.showPassword
      password.type = 'password'
    }else{
      this.showPassword = !this.showPassword
      password.type = 'text'
    }
  }
}
