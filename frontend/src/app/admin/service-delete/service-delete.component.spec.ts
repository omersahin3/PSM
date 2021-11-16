import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDeleteComponent } from './service-delete.component';

describe('ServiceDeleteComponent', () => {
  let component: ServiceDeleteComponent;
  let fixture: ComponentFixture<ServiceDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
