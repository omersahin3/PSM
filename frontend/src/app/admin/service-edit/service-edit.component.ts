import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServerService } from 'src/app/services/server.service';
import { ServiceService } from 'src/app/services/service.service';
import { ServerResponse, Service } from '../model';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, 
    private serviceService: ServiceService, private dialogRef: MatDialog, private alertifyService: AlertifyService) { }
  serviceEditForm!: FormGroup;
  service:Service = new Service();
  createserviceEditForm() {
    this.serviceEditForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required]
    });
  }
  ngOnInit(): void {
    this.createserviceEditForm();
    this.serviceEditForm.patchValue({
      name:this.data.name,
      description: this.data.description
    });
  }
  edit() {
    this.service = Object.assign({}, this.serviceEditForm.value);
    this.serviceService.update(this.data.id, this.service).subscribe(data => {
      this.alertifyService.success(this.data.name + " Successfully changed !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Service could not be edited");
      this.alertifyService.error(this.data.name + " Could not edit service ")
    });
  }
}
