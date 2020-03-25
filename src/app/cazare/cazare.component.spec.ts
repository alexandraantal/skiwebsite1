import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CazareComponent } from './cazare.component';

describe('CazareComponent', () => {
  let component: CazareComponent;
  let fixture: ComponentFixture<CazareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CazareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CazareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
