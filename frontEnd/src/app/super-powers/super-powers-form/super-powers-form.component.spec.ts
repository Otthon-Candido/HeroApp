import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPowersFormComponent } from './super-powers-form.component';

describe('SuperPowersFormComponent', () => {
  let component: SuperPowersFormComponent;
  let fixture: ComponentFixture<SuperPowersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperPowersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperPowersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
