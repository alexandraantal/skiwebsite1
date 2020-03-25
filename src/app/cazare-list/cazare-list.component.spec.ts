import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CazareListComponent } from './cazare-list.component';

describe('CazareListComponent', () => {
  let component: CazareListComponent;
  let fixture: ComponentFixture<CazareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CazareListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CazareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
