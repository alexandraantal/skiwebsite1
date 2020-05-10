import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolischiComponent } from './scolischi.component';

describe('ScolischiComponent', () => {
  let component: ScolischiComponent;
  let fixture: ComponentFixture<ScolischiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScolischiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScolischiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
