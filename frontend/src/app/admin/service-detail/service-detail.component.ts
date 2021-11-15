import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }
  serviceForm!: FormGroup;

  createserviceForm() {
    this.serviceForm = this.formBuilder.group({
      name: [{ value: '', disabled: true}, Validators.required],
      description: [{ value: '', disabled: true}, Validators.required],
    });
  }
  ngOnInit(): void {
    this.createserviceForm();
    this.serviceForm.patchValue({
      name:this.data.name,
      description: this.data.weight
    });
  }
}
