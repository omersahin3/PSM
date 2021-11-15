import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  serviceForm!: FormGroup;

  createserviceForm() {
    this.serviceForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.createserviceForm();
  }

}
