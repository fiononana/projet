import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormspontaneesComponent } from './formspontanees.component';

describe('FormspontaneesComponent', () => {
  let component: FormspontaneesComponent;
  let fixture: ComponentFixture<FormspontaneesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormspontaneesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormspontaneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
