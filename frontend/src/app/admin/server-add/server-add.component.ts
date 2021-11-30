import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServerService } from 'src/app/services/server.service';
import { Server } from '../model';

@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html',
  styleUrls: ['./server-add.component.css']
})
export class ServerAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private serverService : ServerService,
    private alertifyService: AlertifyService, private dialogRef: MatDialog) { }
  serverAddForm!: FormGroup;
  server:Server = new Server();

  createserverForm() {
    this.serverAddForm = this.formBuilder.group({
      dns_name: ["", Validators.required],
      ip_adress: ["", Validators.required],
      description: ["", Validators.required]
    });
  }
  ngOnInit(): void {
    this.createserverForm();
  }
  add() {
    if (this.serverAddForm.valid)
    {
      this.server = Object.assign({}, this.serverAddForm.value)
    }
    this.serverService.create(this.server).subscribe(data => {
      this.alertifyService.success(data.data.dns_name + " Successfully added !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Could not add server");
      this.alertifyService.error(" Could not add server ")
    });
  }
}
