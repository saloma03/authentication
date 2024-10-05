import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iuser } from '../../core/interfaces/iuser';
import { users } from '../../shared/users';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgClass ,ReactiveFormsModule , NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly  _FormBuilder =inject(FormBuilder)
  private readonly  _Router =inject(Router)
  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  registerForm:FormGroup = this._FormBuilder.group({
    name:[null,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],

    email: [null , [Validators.required , Validators.email]],

    password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],

    phone: [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  })

  registerSubmit():void{
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      swal({
        title: "Error!",
        text: "Please fix the errors in the form.",
        icon: "error",
      });
      return;
    }

    const user: Iuser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone,
    };

    users.push(user);

    swal({
      title: "Welcome!",
      text: "Registered successfully!",
      icon: "success",
    });

    this._Router.navigate(['./login'])
  }

}
