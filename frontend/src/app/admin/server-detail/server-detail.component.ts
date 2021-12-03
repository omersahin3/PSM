import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceResponse } from '../model';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private serviceService:ServiceService) { }
  serverDetailForm!: FormGroup;
  services!: ServiceResponse[];
  serviceId!: Array<any>;
  createserverForm() {
    this.serverDetailForm = this.formBuilder.group({
      name: [{ value: '', disabled: true}, Validators.required],
      ip_adress: [{ value: '', disabled: true}, Validators.required],
      description: [{ value: '', disabled: true}, Validators.required]
    });
  }
  ngOnInit(): void {
    this.retrieveServices();
    this.createserverForm();
    this.serverDetailForm.patchValue({
      name:this.data.dns_name,
      ip_adress: this.data.ip_adress,
      description: this.data.description
    });
  }
  retrieveServices(): void {
    this.serviceService.getAll().subscribe(data => {
      this.services = data;
      this.getServicesSetCheckValues();
    }, error => {
      console.log(error + "Service Error");
    });
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

}
