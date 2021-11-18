import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { UserResponse, UserEdit } from '../model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService,
    private userService:UserService, private alertifyService: AlertifyService, 
    private dialogRef: MatDialog, private datePipe: DatePipe){ }
  profileForm!: FormGroup;
  editModeState: boolean = true;
  currentUser!: UserResponse;
  user:UserEdit = new UserEdit();
  createprofileForm() {
    this.profileForm = this.formBuilder.group({
      username: [{ value: '', disabled: this.editModeState}, Validators.required],
      email: [{ value: '', disabled: this.editModeState}, Validators.required],
      phone: [{ value: '', disabled: this.editModeState}, Validators.required],
      dateofbirth: [{ value: '', disabled: this.editModeState}, Validators.required],
      adress: [{ value: '', disabled: this.editModeState}, Validators.required]
    });
  }
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.createprofileForm();
    this.profileForm.patchValue({ username: this.currentUser.username })
    this.profileForm.patchValue({ email: this.currentUser.email })
    this.profileForm.patchValue({ phone: this.currentUser.phone ? this.currentUser.phone : 'Not entered yet'})
    this.profileForm.patchValue({ dateofbirth: this.currentUser.dateofbirth })
    this.profileForm.patchValue({ adress:  this.currentUser.adress ? this.currentUser.adress : 'Not entered yet'})
  }
  editMode() {
    this.editModeState = false;
    this.profileForm.controls['username'].disable();
    this.profileForm.controls['email'].enable();
    this.profileForm.controls['phone'].enable();
    this.profileForm.controls['dateofbirth'].enable();
    this.profileForm.controls['adress'].enable();
  }
  updateProfile() {
    if (this.profileForm.valid)
    {
      this.user = Object.assign({}, this.profileForm.value)
    }
    this.userService.update(this.currentUser.id, this.user).subscribe(data => {
      this.alertifyService.success(this.currentUser.username + " Your profile is set !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Your profile could not be edited");
    });
  }
  
}
