import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquatComponent } from './squat.component';

describe('SquatComponent', () => {
  let component: SquatComponent;
  let fixture: ComponentFixture<SquatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
