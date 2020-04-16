import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VremeaComponent } from './vremea.component';

describe('VremeaComponent', () => {
  let component: VremeaComponent;
  let fixture: ComponentFixture<VremeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VremeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VremeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
