import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimitiveControlsComponent } from './primitive-controls.component';

describe('PrimitiveControlsComponent', () => {
  let component: PrimitiveControlsComponent;
  let fixture: ComponentFixture<PrimitiveControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimitiveControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimitiveControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
