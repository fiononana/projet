import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormoffreComponent } from './formoffre.component';

describe('FormoffreComponent', () => {
  let component: FormoffreComponent;
  let fixture: ComponentFixture<FormoffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormoffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormoffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
