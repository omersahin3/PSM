import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { UserpassEdit, UserResponse } from '../model';

@Component({
  selector: 'app-c-password',
  templateUrl: './c-password.component.html',
  styleUrls: ['./c-password.component.css']
})
export class CPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private tokenStorage: TokenStorageService,
    private alertifyService: AlertifyService, private dialogRef: MatDialog) { }
  cpasswordForm!: FormGroup;
  user:UserpassEdit = new UserpassEdit();
  currentUser!: UserResponse;
  
  createcpasswordForm() {
    this.cpasswordForm = this.formBuilder.group({
      current_password: ["", [Validators.required,Validators.minLength(6)]],
      new_password: ["", [Validators.required,Validators.minLength(6)]],
      confirm_new_password: ["", [Validators.required,Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    this.createcpasswordForm();
    this.cpasswordForm.patchValue({
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    });
    this.currentUser = this.tokenStorage.getUser();
  }
  
  changePassword() {
    if (this.cpasswordForm.valid)
    {
      this.user = Object.assign({}, this.cpasswordForm.value)
    }
    const current_password = this.user.current_password;
    const new_password = this.user.new_password;
    const confirm_new_password = this.user.confirm_new_password;
    if( current_password != new_password)
    {
      if (confirm_new_password === new_password) {
        this.userService.changepass(this.currentUser.id, this.user).subscribe(data => {
          this.alertifyService.success(this.currentUser.username + " Your password has been successfully changed !")
          this.dialogRef.closeAll();
        }, error => {
          console.log(error + "Could not change password");
          this.alertifyService.error(" Could not change password ");
        });
      }else{
        this.alertifyService.error("You entered two different passwords");
      }
    }else{
      this.alertifyService.warning(" you entered the same password ");
    }
  }
}
