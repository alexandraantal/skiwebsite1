import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiiListComponent } from './partii-list.component';

describe('PartiiListComponent', () => {
  let component: PartiiListComponent;
  let fixture: ComponentFixture<PartiiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
