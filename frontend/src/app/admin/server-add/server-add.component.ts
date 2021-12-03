import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServerService } from 'src/app/services/server.service';
import { ServiceService } from 'src/app/services/service.service';
import { Server, ServiceResponse } from '../model';

@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html',
  styleUrls: ['./server-add.component.css']
})
export class ServerAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private serverService : ServerService,
    private alertifyService: AlertifyService, private dialogRef: MatDialog, private serviceService:ServiceService) { }
  serverAddForm!: FormGroup;
  server:Server = new Server();
  services!: ServiceResponse[];
  serviceId!: Array<any>;
  createserverForm() {
    this.serverAddForm = this.formBuilder.group({
      dns_name: ["", Validators.required],
      ip_adress: ["", Validators.required],
      description: ["", Validators.required],
      service: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.createserverForm();
    this.retrieveServices();
  }
  add() {
    this.server = Object.assign({}, this.serverAddForm.value)
    const body = {
      dns_name: this.server.dns_name,
      ip_adress: this.server.ip_adress,
      description: this.server.description,
      service: this.serviceId
    };
    console.log(body)
    this.serverService.create(body).subscribe(data => {
      this.alertifyService.success(data.data.dns_name + " Successfully added !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Could not add server");
      this.alertifyService.error(" Could not add server ")
    });
  }
  retrieveServices(): void {
    this.serviceService.getAll().subscribe(data => {
      this.services = data;
    }, error => {
      console.log(error + "Service Error");
    });
  }
  serviceSelected(item:any) {
    this.services.find((service) => {
      if (service.id === item.id) {
        service.isSelected = !service.isSelected;
      }
    })
    this.serviceId = [];
    this.services.find((service) => {
      if (service.isSelected) {
        const selecctedItemId = {
          service_id: service.id
        }
        this.serviceId.push(selecctedItemId);
      }
    })
    // console.log(this.serviceId)
  }
}
