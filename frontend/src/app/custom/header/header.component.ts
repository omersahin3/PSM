import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { getUser } from 'src/app/login/model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CPasswordComponent } from '../c-password/c-password.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog, private token: TokenStorageService, private tokenStorageService: TokenStorageService) { }
  currentUser: getUser = new getUser();
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser)
  }
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  changeSidebar(){
    this.toggle.emit(null);
  }
  openProfile(){
    let dialogRef = this.dialog.open(ProfileComponent, {data: {name: 'Vishwas',lname: 'a',fname: 'b', email:'a@gmail.com',phone:'05555555555'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog Result: ${result}`);
    })
  }
  changePassword(){
    let dialogRef = this.dialog.open(CPasswordComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog Result: ${result}`);
    })
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.reloadLoginPage();
  }
  reloadLoginPage(): void {
    let path = window.location.pathname = '/login/';
    window.location.assign(path);
  }
}
