import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceResponse } from '../model';
import { ServiceAddComponent } from '../service-add/service-add.component';
import { ServiceDeleteComponent } from '../service-delete/service-delete.component';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { ServiceEditComponent } from '../service-edit/service-edit.component';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private dialog: MatDialog, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.retrieveServices();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'createdAt', 'updatedAt', 'edit'];
  dataSource = new MatTableDataSource(Array<ServiceResponse>());
  
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
  
  addService() {
    this.dialog.open(ServiceAddComponent).afterClosed().subscribe(() => {this.retrieveServices(); });
  }

  serviceEdit(service: ServiceResponse) {
    this.dialog.open(ServiceEditComponent, { data: service }).afterClosed().subscribe(() => {this.retrieveServices(); });
    // console.log(service)
  }
  serviceDetail(service: ServiceResponse){  
    this.dialog.open(ServiceDetailComponent, { data: service })
  }
  deleteService(server: ServiceResponse) {
    this.dialog.open(ServiceDeleteComponent, { data: server }).afterClosed().subscribe(() => {this.retrieveServices(); });
  }

  retrieveServices(): void {
    this.serviceService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.log(error + "Service Error");
    });
  }
}


