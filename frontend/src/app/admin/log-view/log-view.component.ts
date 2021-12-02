import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ServerServiceService } from 'src/app/services/server-service.service';
import { ServerService } from 'src/app/services/server.service';
import { Server, ServerResponse, Service } from '../model';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.css']
})
export class LogViewComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private serverService: ServerService,
    private serverServiceService: ServerServiceService, private alertifyService: AlertifyService) { }
  displayedColumns: string[] = ['id', 'createdAt' , 'status',];
  dataSource = new MatTableDataSource(Array<ServerResponse>());
  server:Server = new Server();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.serverService.get(params["serverId"]).subscribe(data => {
        this.server = data;
      }, error => {
        console.log(error + "Server Error");
      });
    })
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  retrieveServerServices(id:number): void {
    this.serverServiceService.getAll().subscribe(data => {
      console.log(data)
      for(let i=0; i< data.length;i++){
        if(data[i].serviceId==id){
          this.dataSource.data = data[i].logs;
        }
      }
      this.alertifyService.success(" Successfully viewed !")
    }, error => {
      console.log(error + "ServerService Error");
      this.alertifyService.error(" Could not be displayed !");
    });
  }
  onGroupsChange(id: number){
    if(id)
    {
      this.retrieveServerServices(id);
    }
  }
}
