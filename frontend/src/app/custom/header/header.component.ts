import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { CPasswordComponent } from '../c-password/c-password.component';
import { UserEdit } from '../model';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog, private tokenStorage: TokenStorageService,
    private userService: UserService) { }
  currentUser: UserEdit = new UserEdit();
  
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
  }
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  changeSidebar(){
    this.toggle.emit(null);
  }
  openProfile(){
    this.dialog.open(ProfileComponent).afterClosed().subscribe(() => { this.refreshUser(); });
  }
  changePassword(){
    this.dialog.open(CPasswordComponent);
  }
  logout(): void {
    this.tokenStorage.signOut();
    this.reloadLoginPage();
  }
  reloadLoginPage(): void {
    let path = window.location.pathname = '/login/';
    window.location.assign(path);
  }

  refreshUser() {
    this.userService.get(this.currentUser.id).subscribe(data => {
      this.tokenStorage.saveUser(data);
    }, error => {
      console.log(error + "USER could not be refreshed");
    });
  }
}
