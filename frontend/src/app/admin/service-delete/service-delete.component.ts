import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-delete',
  templateUrl: './service-delete.component.html',
  styleUrls: ['./service-delete.component.css']
})
export class ServiceDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private serviceService: ServiceService,
    private alertifyService: AlertifyService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }
  delete() {
    this.serviceService.delete(this.data.id).subscribe(data => {
      this.alertifyService.success(this.data.name + " Successfully deleted !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Could not delete server");
      this.alertifyService.error(this.data.name + " Could not be deleted !")
    });
  }

}
