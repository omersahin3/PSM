import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }
  serverDetailForm!: FormGroup;

  createserverForm() {
    this.serverDetailForm = this.formBuilder.group({
      name: [{ value: '', disabled: true}, Validators.required],
      ip_adress: [{ value: '', disabled: true}, Validators.required],
      description: [{ value: '', disabled: true}, Validators.required]
    });
  }
  ngOnInit(): void {
    this.createserverForm();
    this.serverDetailForm.patchValue({
      name:this.data.dns_name,
      ip_adress: this.data.ip_adress,
      description: this.data.description
    });
  }

}
