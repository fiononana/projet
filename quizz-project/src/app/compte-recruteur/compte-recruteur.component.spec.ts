import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteRecruteurComponent } from './compte-recruteur.component';

describe('CompteRecruteurComponent', () => {
  let component: CompteRecruteurComponent;
  let fixture: ComponentFixture<CompteRecruteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteRecruteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
