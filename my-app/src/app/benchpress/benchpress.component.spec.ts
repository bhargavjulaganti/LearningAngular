import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchpressComponent } from './benchpress.component';

describe('BenchpressComponent', () => {
  let component: BenchpressComponent;
  let fixture: ComponentFixture<BenchpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
