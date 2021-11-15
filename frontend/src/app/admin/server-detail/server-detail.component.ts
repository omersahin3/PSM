import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }
  serverForm!: FormGroup;

  createserverForm() {
    this.serverForm = this.formBuilder.group({
      name: [{ value: '', disabled: true}, Validators.required],
      description: [{ value: '', disabled: true}, Validators.required],
    });
  }
  ngOnInit(): void {
    this.createserverForm();
    this.serverForm.patchValue({
      name:this.data.name,
      description: this.data.weight
    });
  }

}
