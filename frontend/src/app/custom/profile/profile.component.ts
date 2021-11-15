import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getUser } from 'src/app/login/model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder){ }
  profileForm!: FormGroup;
  editModeState: boolean = true;

  createprofileForm() {
    this.profileForm = this.formBuilder.group({
      name: [{ value: '', disabled: this.editModeState}, Validators.required],
      fname: [{ value: '', disabled: this.editModeState}, Validators.required],
      lname: [{ value: '', disabled: this.editModeState}, Validators.required],
      phone: [{ value: '', disabled: this.editModeState}, Validators.required],
      email: [{ value: '', disabled: this.editModeState}, Validators.required]
    });
  }
  ngOnInit(): void {
    this.createprofileForm();
    this.profileForm.patchValue({ name: this.data.name })
    this.profileForm.patchValue({ fname: this.data.fname })
    this.profileForm.patchValue({ lname: this.data.lname })
    this.profileForm.patchValue({ phone: this.data.phone })
    this.profileForm.patchValue({ email:  this.data.email })
  }
  editMode() {
    this.editModeState = false;
    this.profileForm.controls['name'].disable();
    this.profileForm.controls['fname'].enable();
    this.profileForm.controls['lname'].enable();
    this.profileForm.controls['phone'].enable();
    this.profileForm.controls['email'].disable();
  }
  updateProfile() {
  }

}
