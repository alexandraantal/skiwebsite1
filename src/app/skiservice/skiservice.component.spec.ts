import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkiserviceComponent } from './skiservice.component';

describe('SkiserviceComponent', () => {
  let component: SkiserviceComponent;
  let fixture: ComponentFixture<SkiserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkiserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkiserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
