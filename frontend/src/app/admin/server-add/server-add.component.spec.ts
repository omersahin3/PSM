import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerAddComponent } from './server-add.component';

describe('ServerAddComponent', () => {
  let component: ServerAddComponent;
  let fixture: ComponentFixture<ServerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
