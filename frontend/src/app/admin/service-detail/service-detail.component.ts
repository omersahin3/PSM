import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, 
    private datePipe: DatePipe) { }

  serviceDetailForm!: FormGroup;
  green = this.data.status;

  createserviceDetailForm() {
    this.serviceDetailForm = this.formBuilder.group({
      name: [{ value: '', disabled: true}, Validators.required],
      description: [{ value: '', disabled: true}, Validators.required],
      createdAt: [{ value: '', disabled: true}, Validators.required],
      updatedAt: [{ value: '', disabled: true}, Validators.required]
    });
  }
  ngOnInit(): void {
    this.createserviceDetailForm();
    this.serviceDetailForm.patchValue({
      name:this.data.name,
      description: this.data.description,
      createdAt: this.datePipe.transform(this.data.createdAt, 'dd/MM/yyyy hh:mm a'),
      updatedAt: this.datePipe.transform(this.data.updatedAt, 'dd/MM/yyyy hh:mm a')
    });
  }
}

