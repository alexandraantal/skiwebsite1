import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiiComponent } from './partii.component';

describe('PartiiComponent', () => {
  let component: PartiiComponent;
  let fixture: ComponentFixture<PartiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
