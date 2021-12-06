import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from 'src/app/services/server-service.service';

import { ServerService } from 'src/app/services/server.service';
import { Server, ServerResponse } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private serverService : ServerService, private serverServiceService: ServerServiceService) { }
  servers!:ServerResponse[];
  
  ngOnInit(): void {
    this.getInfo();
  }
  getInfo() {
    this.serverServiceService.getInfo().subscribe(data => {
      this.servers = data;
      // console.log(this.servers)
    }, error => {
      console.log(error + "ServerService Error");
    });
  }
}
