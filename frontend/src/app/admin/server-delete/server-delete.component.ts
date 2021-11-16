import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-server-delete',
  templateUrl: './server-delete.component.html',
  styleUrls: ['./server-delete.component.css']
})
export class ServerDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private serverService: ServerService,
    private alertifyService: AlertifyService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }
  delete() {
    this.serverService.delete(this.data.id).subscribe(data => {
      this.alertifyService.success(this.data.dns_name + " Successfully deleted !")
      this.dialogRef.closeAll();
    }, error => {
      console.log(error + "Could not delete server");
      this.alertifyService.error(this.data.name + " Could not be deleted !")
    });
  }
}
