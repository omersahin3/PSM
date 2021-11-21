import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceResponse } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private serviceService : ServiceService) { }
  services!:ServiceResponse[];
  ngOnInit(): void {
    this.retrieveServices();
  }

  retrieveServices(): void {
    this.serviceService.getAll().subscribe(data => {
      this.services = data;
    }, error => {
      console.log(error + "Service Error");
    });
  }
}
