import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadliftComponent } from './deadlift.component';

describe('DeadliftComponent', () => {
  let component: DeadliftComponent;
  let fixture: ComponentFixture<DeadliftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeadliftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadliftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
