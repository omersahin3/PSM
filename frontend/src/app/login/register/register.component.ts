import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formbuilder:FormBuilder,private authService: AuthService, private snackbar: MatSnackBar) { }
  registerForm!:FormGroup;
  user:User = new User();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  createUserLoginForm(){
    this.registerForm = this.formbuilder.group({
      username:["", [Validators.required,Validators.minLength(3)]],
      email:["", [Validators.required,Validators.minLength(6)]],
      password:["", [Validators.required,Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.createUserLoginForm();
  }

  register(): void {
    if (this.registerForm.valid)
    {
      this.user = Object.assign({}, this.registerForm.value)
    }
    this.authService.register(this.user.username, this.user.email, this.user.password).subscribe(data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      this.snackbar.open('Succesfully Registered!', 'OK', {
        panelClass: ["custom-style"], duration: 1000
      });
      this.reloadLoginPage();
    }, error => {
      this.errorMessage = error.error.message;
      this.isSignUpFailed = true;
      console.log(error + "Failed to Register!");
    });
  }

  reloadLoginPage(): void {
    let path = window.location.pathname = '/login/';
    window.location.assign(path);
  }

}
