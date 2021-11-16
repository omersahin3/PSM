import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/services/server.service';
import { ServerResponse } from '../model';
import { ServerAddComponent } from '../server-add/server-add.component';
import { ServerDeleteComponent } from '../server-delete/server-delete.component';
import { ServerDetailComponent } from '../server-detail/server-detail.component';
import { ServerEditComponent } from '../server-edit/server-edit.component';


@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor(private dialog: MatDialog, private serverService: ServerService) { }

  ngOnInit(): void {
    this.retrieveServers();
  }
  displayedColumns: string[] = ['id', 'name', 'ip_adress', 'description', 'edit'];
  dataSource = new MatTableDataSource(Array<ServerResponse>());

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort; //sort
    this.dataSource.paginator = this.paginator;
  }
  addServer() {
    this.dialog.open(ServerAddComponent).afterClosed().subscribe(() => {this.retrieveServers(); });
  }

  serverEdit(server: ServerResponse) {
    this.dialog.open(ServerEditComponent, { data: server }).afterClosed().subscribe(() => {this.retrieveServers(); });
    // console.log(service)
  }
  serverDetail(server: ServerResponse){  
    this.dialog.open(ServerDetailComponent, { data: server })
  }
  deleteServer(server: ServerResponse) {
    this.dialog.open(ServerDeleteComponent, { data: server }).afterClosed().subscribe(() => {this.retrieveServers(); });
  }

  retrieveServers(): void {
    this.serverService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.log(error + "Server Error");
    });
  }
}

