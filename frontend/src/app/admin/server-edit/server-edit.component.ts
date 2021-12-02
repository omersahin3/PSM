import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServerService } from 'src/app/services/server.service';
import { ServiceService } from 'src/app/services/service.service';
import { Server, ServiceResponse } from '../model';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.css']
})
export class ServerEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private serverService: ServerService, private dialogRef: MatDialog, private alertifyService: AlertifyService,
    private serviceService:ServiceService) { }
  serverEditForm!: FormGroup;
  server:Server = new Server();
  services!: ServiceResponse[];
  serviceId!: Array<any>;
  postServiceId!: Array<any>;
  createserverForm() {
    this.serverEditForm = this.formBuilder.group({
      dns_name: ["", Validators.required],
      ip_adress: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.retrieveServices();
    this.createserverForm();
    this.serverEditForm.patchValue({
      dns_name:this.data.dns_name,
      ip_adress:this.data.ip_adress,
      description: this.data.description,
    });
  }
  edit() {
    if (this.serverEditForm.valid)
    {
      this.server = Object.assign({}, this.serverEditForm.value)
    }
    const body = {
      dns_name: this.server.dns_name,
      ip_adress: this.server.ip_adress,
      description: this.server.description,
      service: this.postServiceId
    };
    console.log("bodyy");
    console.log(body);
    this.serverService.update(this.data.id, body).subscribe(data => {
      this.alertifyService.success(this.data.dns_name + " Successfully changed !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Could not edit server");
      this.alertifyService.error(" Could not edit server ")
    });
  }
  retrieveServices(): void {
    this.serviceService.getAll().subscribe(data => {
      this.services = data;
      this.getServicesSetCheckValues();
    }, error => {
      console.log(error + "Server Error");
    });
  }
  serviceSelected(item:any) {
    this.services.find((service) => {
      if (service.id === item.id) {
        service.isSelected = !service.isSelected;
      }
    })
    this.serviceId = [];
    this.postServiceId = [];
    let selectedItemId= {};
    this.services.find((service) => {
      if (service.isSelected == true) {
        selectedItemId = {
          service_id: service.id,
          check: true
        }
      }
      else{
        selectedItemId = {
          service_id: service.id,
          check: false
        }
      }
      this.serviceId.push(selectedItemId);
    })
    this.pushService();
    console.log(this.postServiceId)
  }
  getServicesSetCheckValues() {
    this.services.find((service) => {
      for(let i=0;i< this.data.services.length;i++)
      {
        if (service.id != this.data.services[i].id) {
          continue;
        }
        service.isSelected = !service.isSelected;
      }
    })
    this.serviceId = [];
    let selectedItemId= {};
    this.services.find((service) => {
      if (service.isSelected == true) {
        selectedItemId = {
          service_id: service.id,
          check: true
        }
      }
      else{
        selectedItemId = {
          service_id: service.id,
          check: false
        }
      }
      this.serviceId.push(selectedItemId);
    })
  }
  pushService(){
    let selectedItemId= {};
    for(let i=0;i< this.serviceId.length;i++) {
      if(this.serviceId[i].check == true) {
        selectedItemId = {
          service_id: this.serviceId[i].service_id
        }
        this.postServiceId.push(selectedItemId);
      }
    }
  }
}
