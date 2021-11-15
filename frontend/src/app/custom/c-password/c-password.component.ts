import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-c-password',
  templateUrl: './c-password.component.html',
  styleUrls: ['./c-password.component.css']
})
export class CPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  cpasswordForm!: FormGroup;

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
  }

}
