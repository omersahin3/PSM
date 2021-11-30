import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServerService } from 'src/app/services/server.service';
import { ServiceService } from 'src/app/services/service.service';
import { ServerResponse, Service } from '../model';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private serviceService:ServiceService, 
    private alertifyService: AlertifyService, private dialogRef: MatDialog, private serverService: ServerService) { }
  serviceAddForm!: FormGroup;
  service:Service = new Service();
  servers!: ServerResponse[];
  selectedServer= '';
  createserviceAddForm() {
    this.serviceAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      server: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.createserviceAddForm();
    this.retrieveServers();
  }
  
  add() {
    this.service = Object.assign({}, this.serviceAddForm.value) 
    this.serviceService.create(this.service).subscribe(data => {
      this.alertifyService.success(data.data.name + " Successfully added !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Could not add service");
      this.alertifyService.error(" Could not add service ")
    });
  }
  retrieveServers(): void {
    this.serverService.getAll().subscribe(data => {
      this.servers = data;
    }, error => {
      console.log(error + "Server Error");
    });
  }
}
