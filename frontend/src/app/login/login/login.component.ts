import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { getUser } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formbuilder:FormBuilder,private authService: AuthService, private tokenStorage: TokenStorageService, 
     private snackbar: MatSnackBar) { }
  loginForm!:FormGroup;
  user:getUser = new getUser();
  roles: string[] = [];
  createUserLoginForm(){
    this.loginForm = this.formbuilder.group({
      username:["", [Validators.required,Validators.minLength(3)]],
      password:["", [Validators.required,Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.createUserLoginForm();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login(): void {
    if (this.loginForm.valid)
    {
      this.user = Object.assign({}, this.loginForm.value)
    }
    this.authService.login(this.user.username, this.user.password).subscribe(data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      this.roles = this.tokenStorage.getUser().roles;
      if (this.roles[0] === 'ROLE_ADMIN') {
        this.reloadAdminPage();
      }
    }, error => {
      console.log(error + "Login Failed!");
      this.snackbar.open(error.error.message, 'OK', {
        panelClass: ["custom-style-warn"], duration: 3000
      });
    });
  }
  
  reloadAdminPage(): void {
    let path = window.location.pathname = '/admin/';
    window.location.assign(path);
  }
}
