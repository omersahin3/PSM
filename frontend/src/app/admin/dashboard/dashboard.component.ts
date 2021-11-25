import { Component, OnInit } from '@angular/core';

import { ServerService } from 'src/app/services/server.service';
import { ServerResponse } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private serverService : ServerService) { }
  servers!:ServerResponse[];
  ngOnInit(): void {
    this.retrieveServices();
  }
  retrieveServices(): void {
    this.serverService.getAll().subscribe(data => {
      this.servers = data;
    }, error => {
      console.log(error + "Server Error");
    });
  }
}
