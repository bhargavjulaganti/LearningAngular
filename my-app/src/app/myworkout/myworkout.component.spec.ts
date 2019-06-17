import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyworkoutComponent } from './myworkout.component';

describe('MyworkoutComponent', () => {
  let component: MyworkoutComponent;
  let fixture: ComponentFixture<MyworkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyworkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
