import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { users } from '../../shared/users';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass , ReactiveFormsModule , NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly  _FormBuilder =inject(FormBuilder)
  isPasswordVisible = false;

  togglePasswordVisibility() {

    this.isPasswordVisible = !this.isPasswordVisible;
  }


  loginForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]]
  })

  loginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      swal({
        title: "Error!",
        text: "the password or email is incorrect.",
        icon: "error",
      });
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    const user = users.find(user => user.email === email && user.password === password);
     if (user) {
      swal({
        title: "welcome back!",
        text: "logged in successfully!",
        icon: "success",
      });

     }else{
      swal({
        title: "failed!",
        text: "the password or email is incorrect",
        icon: "error",
      });

     }
  }


}
