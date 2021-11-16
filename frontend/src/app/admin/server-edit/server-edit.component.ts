import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServerService } from 'src/app/services/server.service';
import { Server } from '../model';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.css']
})
export class ServerEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private serverService: ServerService, private dialogRef: MatDialog, private alertifyService: AlertifyService) { }
  serverEditForm!: FormGroup;
  server:Server = new Server();

  createserverForm() {
    this.serverEditForm = this.formBuilder.group({
      dns_name: ["", Validators.required],
      ip_adress: ["", Validators.required],
      description: ["", Validators.required]
    });
  }
  ngOnInit(): void {
    this.createserverForm();
    this.serverEditForm.patchValue({
      dns_name:this.data.dns_name,
      ip_adress:this.data.ip_adress,
      description: this.data.description
    });
  }
  edit() {
    if (this.serverEditForm.valid)
    {
      this.server = Object.assign({}, this.serverEditForm.value)
    }
    this.serverService.update(this.data.id, this.server).subscribe(data => {
      this.alertifyService.success(this.data.dns_name + " Successfully changed !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Could not edit server");
    });
  }
}
