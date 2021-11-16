import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from '../model';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private serviceService:ServiceService, 
    private alertifyService: AlertifyService, private dialogRef: MatDialog) { }
  serviceAddForm!: FormGroup;
  service:Service = new Service();

  createserviceAddForm() {
    this.serviceAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.createserviceAddForm();
  }
  
  add() {
    if (this.serviceAddForm.valid)
    {
      this.service = Object.assign({}, this.serviceAddForm.value)
    }
    this.serviceService.create(this.service).subscribe(data => {
      this.alertifyService.success(data.name + " Successfully added !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Could not add service");
    });
  }
}
